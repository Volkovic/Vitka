# ⚛️ React: Filosofía y DOM Virtual

A lo largo de los años, interactuar con el DOM (las piezas de HTML que ves en pantalla) siempre fue lento y propenso a errores. En JavaScript puro tenías que hacer `document.getElementById()`, cambiar su texto, añadirle clases a mano, y volver a insertarlo en la pantalla. Un dolor de cabeza si tenías que actualizar 50 elementos a la vez.

React (creado por Facebook) cambió las reglas del juego introduciendo dos conceptos revolucionarios: El **DOM Virtual** y **JSX**.

---

## 👻 El Virtual DOM

React no toca el DOM real del navegador directamente. Crea una "copia fantasma" en la memoria de tu computadora llamada **Virtual DOM**.

Cuando algo cambia en tu aplicación (ej. el usuario hace clic o llega un mensaje), React actualiza primero este DOM Virtual a la velocidad de la luz. Luego, lo compara con el DOM real, busca las diferencias exactas, y envía un "parche" (Patch) con el cambio mínimo necesario al navegador. Esto hace que React sea increíblemente eficiente.

---

## ✨ JSX: HTML dentro de JavaScript

Antes, la regla de oro era separar el HTML (Vista) del JS (Lógica). React rompió esa regla argumentando que ambas cosas están íntimamente ligadas (un botón sin su lógica de clic no sirve de nada).

Así nació **JSX** (JavaScript XML). Es una extensión de sintaxis que te permite escribir etiquetas HTML idénticas dentro de tus funciones JavaScript.

```tsx
// Esto no es HTML, ¡es TypeScript!
const saludo = <h1>Hola Mundo</h1>;

// Incluso puedes inyectar variables usando llaves { }
const nombre = "Dano";
const saludoDinamico = <h1>Hola {nombre}</h1>;
```

Bajo el capó, Vite tomará ese JSX y lo compilará a código JavaScript puro (ej. `React.createElement('h1', null, 'Hola Mundo')`) para que el navegador lo entienda.

---

## 🛠️ Ejercicio In-line

**Pregunta:** Si estás usando JSX para crear un elemento HTML, y quieres añadirle la clase CSS "btn-primario", ¿cuál es la sintaxis correcta?

```tsx
// Opción A
<button class="btn-primario">Clic</button>

// Opción B
<button className="btn-primario">Clic</button>
```

**Respuesta y Justificación:**
La **Opción B** es la correcta (`className`).
Recuerda: JSX NO es HTML puro, es JavaScript disfrazado. En JavaScript, la palabra `class` es una palabra reservada del sistema (usada para crear Clases en OOP, como viste en el curso de TypeScript). Por lo tanto, el equipo de React inventó el atributo `className` para evitar choques con el lenguaje base.

---

## 🧠 Pensando en React

Con React, ya no das "instrucciones" paso a paso al navegador (Programación Imperativa). En su lugar, simplemente describes cómo debería verse la interfaz (Programación Declarativa). Tú te encargas de los datos, React se encarga del DOM.
