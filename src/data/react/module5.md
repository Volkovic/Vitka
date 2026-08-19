# 🖱️ Eventos y Formularios

Si el estado (`useState`) es la memoria de la aplicación, los Eventos son la forma en que el usuario se comunica con esa memoria.

React maneja los eventos de una manera muy similar a HTML nativo, pero con algunas diferencias clave impulsadas por su arquitectura sintética.

---

## ⚡ CamelCase vs minúsculas

En HTML puro escribes `onclick`, pero en JSX de React (como es JavaScript), todo evento se escribe en formato **camelCase**.

```tsx
// ❌ HTML puro (No funciona en React)
<button onclick="hacerAlgo()">Clic</button>

// ✅ React JSX
<button onClick={hacerAlgo}>Clic</button>
```

Observa que le pasamos la **función** `hacerAlgo` (sin los paréntesis `()`). Si le pusieras los paréntesis (`hacerAlgo()`), la función se ejecutaría inmediatamente al cargar la página, no al hacer clic.

---

## 📝 Componentes Controlados (Formularios)

En una web normal, los inputs (`<input>`, `<select>`) manejan su propio estado interno. Escribes y el navegador guarda ese valor en el DOM.

En React, queremos que la aplicación (nuestro `useState`) sea la única fuente de la verdad. A esto se le llama crear un **Componente Controlado**.

```tsx
import { useState } from 'react';

export default function Formulario() {
  const [texto, setTexto] = useState("");

  return (
    <form>
      <input 
        type="text" 
        value={texto} // El input muestra lo que diga el estado
        onChange={(e) => setTexto(e.target.value)} // El estado se actualiza en cada tecleo
      />
      <p>Estás escribiendo: {texto}</p>
    </form>
  );
}
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tienes un formulario con un botón de "Enviar". Añades un evento `onSubmit` a la etiqueta `<form>` para guardar los datos en una Base de Datos. Cuando haces clic, notas que la página se recarga entera (Flash blanco) y pierdes toda la consola y los datos antes de que se guarden. ¿Qué te faltó hacer dentro de la función manejadora del evento?

```tsx
function enviarFormulario(evento) {
  // ¿Qué falta aquí?
  console.log("Enviando...");
}
```

**Respuesta y Justificación:**
Falta hacer `evento.preventDefault()`. 
Por defecto, HTML tiene el comportamiento nativo de recargar toda la página web (o redirigir) cuando un `<form>` hace submit. En React (que es una Single Page Application), NUNCA queremos que la página se recargue. Debemos cancelar el comportamiento por defecto del navegador para que React maneje el envío por detrás usando JavaScript.
