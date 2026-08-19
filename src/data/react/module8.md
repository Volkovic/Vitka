# 🌐 Estado Global (Context API)

En el Módulo 6 aprendimos a elevar el estado para compartir información. Pero en aplicaciones gigantes (como un E-Commerce), hay información que **todos** los componentes necesitan, sin importar dónde estén: por ejemplo, si el usuario está Logueado o el Tema Oscuro/Claro.

---

## 🏔️ El Problema del Prop Drilling

Si tienes un estado en tu archivo `App.jsx` y quieres pasárselo a un simple Botón que está oculto a 15 niveles de profundidad, tendrías que pasar esa prop por cada uno de los 14 componentes intermedios, aunque ellos no la necesiten. 

A esto se le llama **Prop Drilling** (Perforación de Props) y es un infierno de mantener.

---

## 📡 Context API: Teletransportando Datos

React creó la **Context API** para solucionar esto sin usar librerías externas. Funciona como una antena de radio: un componente en lo más alto emite la señal, y cualquier componente en lo más profundo puede sintonizarla directamente, saltándose a los intermediarios.

### 1. Crear el Contexto (La estación de radio)
```tsx
import { createContext } from 'react';

// Se crea afuera de los componentes
export const TemaContext = createContext("claro");
```

### 2. Proveer el Dato (Emitir la señal)
Se usa un "Provider" para envolver a toda tu aplicación y decirle cuál es el valor actual que vamos a transmitir.
```tsx
function App() {
  const [tema, setTema] = useState("oscuro");

  return (
    <TemaContext.Provider value={tema}>
      <LayoutPadre /> {/* Dentro hay muchos componentes anidados */}
    </TemaContext.Provider>
  );
}
```

### 3. Consumir el Dato (`useContext`) (Sintonizar la radio)
En un componente oculto súper profundo:
```tsx
import { useContext } from 'react';
import { TemaContext } from './App'; // Importamos el contexto

export default function BotonProfundo() {
  // Atrapamos el valor directamente
  const temaActual = useContext(TemaContext);

  return <button className={temaActual === 'oscuro' ? 'bg-black' : 'bg-white'}>Clic</button>;
}
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Si utilizas `useContext(MiContexto)` en un componente, pero **olvidaste** envolver al padre de ese componente en un `<MiContexto.Provider>`, ¿React arrojará un error de compilación? ¿Qué valor recibirás?

**Respuesta y Justificación:**
No dará error. Si React no encuentra ningún Proveedor (Provider) en la cadena de ancestros superiores, simplemente devolverá **el valor por defecto** que le asignaste al contexto cuando lo creaste con `createContext(valorPorDefecto)`.
