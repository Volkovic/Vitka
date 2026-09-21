# Módulo 2: Navegación y UI Core

## Rutas en la Web vs Rutas Móviles

Si vienes de ReactJS web y has usado React Router, estás acostumbrado al paradigma de las URLs. En la web, si el usuario hace clic en "Perfil", la URL cambia a `/perfil`, el navegador destruye la pantalla de "Inicio", y dibuja la pantalla de "Perfil" desde cero. Si el usuario presiona el botón "Atrás" del navegador, la pantalla de "Perfil" se destruye, y la de "Inicio" se vuelve a dibujar.

En el mundo de los teléfonos móviles, **no existen las URLs visibles ni la barra de búsqueda**. Y lo más importante: destruir y volver a crear pantallas completas constantemente causaría que la aplicación se sienta lenta y gaste mucha batería.

En su lugar, los móviles utilizan el paradigma de las **Pilas (Stacks)** o "Barajas de cartas".
Cuando haces clic en "Perfil", la pantalla de "Inicio" **NO se destruye**. Simplemente, el celular desliza una nueva carta (la pantalla de Perfil) *por encima* de la carta de Inicio. La carta de Inicio sigue viva en la memoria del celular, justo debajo, oscurecida.
Cuando deslizas tu dedo de izquierda a derecha (gesto nativo de iOS) o tocas la flecha de "Atrás", el celular retira la carta de arriba (hace un *Pop* a la pila) y la destruye, revelando instantáneamente la carta de Inicio que siempre estuvo ahí esperando.

Para lograr esto en React Native, la herramienta estándar indiscutible de la industria se llama **React Navigation**.

---

## Tipos de Navegadores en React Navigation

React Navigation es una librería masiva que te permite configurar flujos complejos de pantallas. Existen tres tipos principales de navegadores que puedes combinar como si fueran piezas de Lego:

1. **Stack Navigator (El de Pila):** Es el más común. Permite la transición de una pantalla a otra apilándolas, como explicamos antes. Si navegas de A -> B -> C, la pila crece. Si vas hacia atrás, la pila decrece.
2. **Bottom Tabs Navigator (Las Pestañas):** Son los clásicos botones (Íconos) en la parte inferior de la pantalla, que ves en Instagram, Twitter o WhatsApp. Te permiten saltar entre las ramas principales de la aplicación.
3. **Drawer Navigator (El Menú Lateral):** El menú "hamburguesa" que sale deslizado desde el lado izquierdo de la pantalla (muy popular en Android).

Usualmente, las aplicaciones reales anidan estos navegadores. Por ejemplo, tienes un *Bottom Tab* general, y la pestaña de "Inicio" de ese Tab, en realidad contiene un *Stack Navigator* por dentro para que puedas apilar pantallas sin perder de vista los botones de abajo.

---

## Implementando un Stack Navigator

Veamos cómo se configura una pila básica. Todo se hace mediante componentes. 
Necesitamos importar `NavigationContainer` (el gran envoltorio que maneja el estado) y `createNativeStackNavigator`.

```jsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pantalla de Inicio</Text>
      <Button
        title="Ir a Detalles"
        // Le ordenamos a la pila que ponga la pantalla 'Details' por encima
        onPress={() => navigation.navigate('Details')} 
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pantalla de Detalles</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

¡Con esto, ya tienes navegación! Y lo mejor: `createNativeStackNavigator` utiliza las animaciones nativas reales del sistema. En iOS verás el efecto de desplazamiento horizontal fluido de las pantallas de Apple, y en Android verás la animación de desvanecimiento hacia arriba nativa de Google.

---

## Pasando Parámetros (Params)

Es muy raro navegar a una pantalla sin llevar contexto. Si estás en una lista de usuarios y haces clic en Juan, quieres ir a la pantalla de Detalles y decirle *"Oye, carga los detalles del usuario Juan (id: 42)"*.

En la web pasarías esto por la URL (`/user/42`). En React Native, pasas un objeto como segundo argumento en la función `navigate`.

**Enviando el parámetro:**
```jsx
navigation.navigate('Details', {
  userId: 42,
  userName: 'Juan'
});
```

**Recibiendo el parámetro (en la pantalla destino):**
React Navigation inyecta un objeto llamado `route` en las propiedades (props) de la pantalla destino. Allí adentro viajan tus parámetros.

```jsx
function DetailsScreen({ route }) {
  // Extraemos los params del objeto route
  const { userId, userName } = route.params;

  return (
    <View>
      <Text>Viendo perfil de: {userName} (ID: {userId})</Text>
    </View>
  );
}
```

---

## Componentes UI Core: ScrollView vs FlatList

Ya sabemos navegar, pero ¿cómo mostramos información repetitiva? Digamos que tenemos un array con 1,000 tweets de Twitter.

Si estuvieras en la web, probablemente harías un `array.map()` y dibujarías 1,000 `<div>` dentro del contenedor principal.
Si intentas hacer ese mismo `map()` dentro de un `<ScrollView>` en el teléfono... **tu aplicación hará un crash por falta de memoria (Out of Memory) y el teléfono se congelará**.

Los teléfonos celulares tienen mucha menos memoria RAM y poder gráfico que una computadora de escritorio. Si obligas al celular a dibujar y recordar 1,000 bloques pesados al mismo tiempo, colapsará. 
El gran secreto del rendimiento en aplicaciones móviles es que **el celular solo debe dibujar lo que se ve en la pantalla de cristal físico en ese instante**.

Para las listas masivas, React Native creó un componente especializado llamado **`<FlatList>`**.

### El poder del FlatList
El `<FlatList>` es inteligente. Si tienes un array de 1,000 tweets, pero en la pantallita del celular solo caben 5 tweets, el FlatList dibujará solo 5 componentes. A medida que el usuario hace scroll rápido hacia abajo, el FlatList va "destruyendo" en tiempo real los tweets que salen de pantalla por arriba, y los reutiliza reciclándolos para dibujar los tweets que van entrando por abajo. Esto consume una cantidad fija diminuta de memoria RAM sin importar si tienes mil, diez mil o cien mil elementos.

```jsx
import { FlatList, Text, View } from 'react-native';

const milDatos = [{ id: '1', nombre: 'Juan' }, { id: '2', nombre: 'Pedro' }, ...];

function ListaOptimizada() {
  return (
    <FlatList
      data={milDatos} // Le pasamos el arreglo crudo
      keyExtractor={(item) => item.id} // Le decimos cuál es su llave única
      renderItem={({ item }) => (
        // Esta función dibuja una fila. Solo se ejecutará para las que estén visibles.
        <View style={{ padding: 20 }}>
          <Text>{item.nombre}</Text>
        </View>
      )}
    />
  );
}
```

Regla de oro:
- Si el contenido es estático, fijo, de tamaño predecible, y sabes que nunca serán muchos elementos (ej. Las reglas de un formulario o la biografía en un perfil): usa `<ScrollView>`.
- Si el contenido es dinámico, viene de una API, o puede crecer descontroladamente (Listas, Noticias, Mensajes, Comentarios): usa **OBLIGATORIAMENTE** un `<FlatList>`.
