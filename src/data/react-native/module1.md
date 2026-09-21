# Módulo 1: Fundamentos Nativos y Expo

## ¿Qué es React Native?

Cuando Facebook inventó React, revolucionó el desarrollo web. Pero los desarrolladores querían llevar ese mismo poder a las aplicaciones móviles de iOS y Android. Tradicionalmente, para crear una app móvil tenías que aprender Swift/Objective-C para Apple, y Java/Kotlin para Android. Eso significaba tener dos equipos de programadores distintos haciendo exactamente el mismo producto dos veces.

Existían alternativas como Cordova o Ionic, pero estas hacían "trampa": creaban un navegador web oculto (WebView) y dibujaban una página web tradicional dentro. Eran lentas, consumían mucha batería y no se sentían "naturales".

En 2015, Facebook lanzó **React Native**. Su eslogan era: *"Learn once, write anywhere"* (Aprende una vez, escribe donde sea).
React Native no dibuja HTML en un navegador oculto. Tú escribes código en JavaScript y React, pero por debajo, React Native traduce (a través de algo llamado "El Puente" o *The Bridge*) tus componentes a **elementos nativos puros** del sistema operativo.
Un `<button>` escrito en React Native se convierte literalmente en un `UIButton` real en iOS y en un `android.widget.Button` real en Android. El resultado es una aplicación indistinguible de una escrita en Swift o Java, con 60 fotogramas por segundo (fps) de pura fluidez.

---

## El Puente (The Bridge) y la Nueva Arquitectura

Para ser un profesional, debes entender cómo funciona la magia negra de React Native.

Tu aplicación tiene dos mundos que corren en paralelo:
1. **El Mundo de JavaScript (El Hilo JS):** Aquí es donde vive tu código, tus reglas de negocio y los Hooks de React.
2. **El Mundo Nativo (El Hilo Nativo):** Aquí es donde vive el código de C++/Java/Objective-C que dibuja los pixeles en la pantalla del celular o enciende la cámara.

Históricamente, estos dos mundos no podían hablar directamente entre sí. Para comunicarse, usaban **El Puente (The Bridge)**. El Puente serializaba los mensajes en formato JSON y los enviaba de un lado a otro. Era como si un mundo hablara español, el otro chino, y usaran un traductor lento y asíncrono en medio. Si intentabas animar una lista gigantesca, el puente se saturaba de mensajes JSON y la app se trababa.

A partir de 2024, React Native activó su **Nueva Arquitectura (JSI)**. El Puente fue destruido. Ahora, el mundo de JavaScript puede invocar funciones del mundo Nativo de manera síncrona y directa (como si llamaras a cualquier otra función de JS), eliminando el cuello de botella del JSON. Esto ha hecho que React Native sea tan rápido como el código nativo puro.

---

## Vistas Nativas vs Vistas Web

Si sabes React para web, ya sabes React Native. Usas los mismos `useState`, `useEffect`, y el mismo flujo de datos unidireccional. La única y gran diferencia es que **ya no puedes usar etiquetas HTML**.

En la web usas `<div>`, `<span>`, `<p>`, `<button>`. Los teléfonos celulares no entienden qué es un `<div>`. En React Native, debes importar los componentes nativos fundamentales (Core Components).

**Traducción de Web a Móvil:**
- En lugar de `<div>`, usas `<View>`. Es tu contenedor principal.
- En lugar de `<p>` o `<span>`, usas `<Text>`. En los celulares, NO PUEDES tener texto suelto dentro de un contenedor; TODO texto debe estar obligatoriamente envuelto en una etiqueta `<Text>`, de lo contrario la app hará crash.
- En lugar de `<img>`, usas `<Image>`.
- En lugar de un `<input type="text">`, usas `<TextInput>`.
- En lugar de hacer barras espaciadoras de la web (Scroll), los celulares son estáticos por defecto. Si quieres que algo haga "scroll", debes envolverlo explícitamente en un `<ScrollView>`.

Ejemplo:
```jsx
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>¡Hola Celular!</Text>
    </View>
  );
}
```

---

## ¿Qué es Expo y por qué lo usamos?

Instalar React Native "puro" (React Native CLI) es una pesadilla de configuración. Tienes que descargar e instalar Android Studio (Gigabytes de peso), configurar variables de entorno de Java (JDK), instalar XCode (si tienes Mac), descargar emuladores, y rezar para que las versiones de Gradle o Cocoapods no estén rotas ese día. Toma horas solo hacer el "Hola Mundo".

Para solucionar esto, surgió **Expo**.
Expo es a React Native lo que Next.js es a React, o lo que Ruby on Rails es a Ruby. Es un framework y una plataforma de herramientas que te quita de encima toda la asquerosa configuración de código nativo.

Con Expo, puedes crear una aplicación de React Native en segundos sin instalar ni Android Studio ni XCode. Todo se compila y configura en la nube. Hoy en día, la propia documentación oficial de React Native te dice: **"Por favor, no uses React Native puro, usa Expo".**

---

## La Magia de Expo Go

El flujo de trabajo con Expo es ciencia ficción. Al crear un proyecto (`npx create-expo-app mi-app`) y correrlo (`npm start`), la terminal imprimirá un enorme **código QR**.

En tu propio teléfono personal (iOS o Android), vas a la tienda de aplicaciones y descargas la app gratuita llamada **Expo Go**.
Abres la app, escaneas el código QR de tu pantalla, y en tres segundos, ¡tu aplicación está corriendo nativamente en tu teléfono físico!

No necesitas cables, no necesitas compilar nada pesado. Y lo mejor: cuenta con **Hot Reloading**. Si cambias el color de un botón en VSCode en tu computadora y presionas "Guardar", tu teléfono se actualizará instantáneamente en tus manos. Esto hace que el desarrollo móvil sea igual de rápido y placentero que el desarrollo web.

---

## Estilos en Celulares: Flexbox Nativo

En React Native no usas archivos `.css`. No existe el concepto de clases de CSS o hojas de estilo en cascada.
Los estilos se aplican usando JavaScript puro mediante el objeto `StyleSheet.create`.

React Native utiliza un motor interno (Yoga) que implementa el algoritmo de **Flexbox**, muy similar al de CSS, pero con tres diferencias críticas que confunden a los desarrolladores web:

1. **Todo es Flex por defecto.** No necesitas escribir `display: flex`. Todos los `<View>` ya son flexboxes.
2. **La dirección es en Columna.** En la web, flexbox alinea las cosas en fila (`row`) por defecto. En los celulares, la pantalla es vertical, por lo que React Native alinea las cosas en columna (`column`) de arriba hacia abajo por defecto.
3. **Cero abreviaturas.** En CSS web puedes escribir `padding: 10px 20px`. En React Native, eso dará error. Debes ser explícito y separar las propiedades: `paddingVertical: 10`, `paddingHorizontal: 20`. Además, en los celulares no existen los pixeles "px", usas números enteros (Densidad Independiente).

```jsx
import { StyleSheet, View, Text } from 'react-native';

export default function MiPantalla() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>Hola Mundo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1, // Toma todo el espacio disponible de la pantalla
    justifyContent: 'center', // Centra verticalmente (porque es column)
    alignItems: 'center', // Centra horizontalmente
    backgroundColor: '#1E1E1E'
  },
  texto: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  }
});
```

En el siguiente módulo, aprenderemos a navegar entre diferentes pantallas, dejando atrás el concepto de URLs web para entrar al mundo de las "Pilas" nativas.
