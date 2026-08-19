# 🟢 Node.js: Entendiendo el Entorno

Históricamente, JavaScript estaba "atrapado" dentro del navegador web (Chrome, Firefox, Safari). Su única función era manipular el DOM (botones, colores, alertas). No podía leer archivos de tu computadora, no podía conectarse a bases de datos ni funcionar como un servidor.

Hasta que llegó **Node.js**.

---

## 🚀 ¿Qué es exactamente Node.js?

Node no es un lenguaje nuevo, ni un framework. **Es un Entorno de Ejecución (Runtime).**

Los creadores de Node tomaron el **Motor V8** (el cerebro súper rápido de Google Chrome que interpreta y compila JavaScript) y lo sacaron del navegador, instalándolo directamente en el sistema operativo (Windows, Mac, Linux).

* **En Python:** Tienes el intérprete de Python instalado en tu PC, lo que te permite ejecutar `python script.py` en la terminal.
* **Con Node:** Ahora puedes ejecutar `node script.js` en tu terminal.

---

## 💻 El Poder Fuera del Navegador

Al estar en el sistema operativo, Node le dio a JavaScript "superpoderes" a través de sus módulos nativos (escritos en C++ por debajo):

1. **`fs` (File System):** Leer, crear y borrar archivos físicos en el disco duro.
2. **`http`:** Crear servidores web completos (Backend).
3. **`path` / `os`:** Interactuar con rutas de carpetas y saber cuánta memoria RAM tiene el servidor.

---

## 🛠️ Ejercicio In-line

**Pregunta:** Teniendo en cuenta la diferencia entre JS en el navegador y JS en Node, ¿cuál de las siguientes líneas de código fallará si la ejecutas con Node.js en la terminal?

```javascript
// A
console.log("Hola Mundo");

// B
const btn = document.getElementById("miBoton");

// C
const suma = 2 + 2;
```

**Respuesta y Justificación:**
La línea **B** fallará estrepitosamente (`ReferenceError: document is not defined`).
Node.js corre en la consola de tu computadora. Allí no existe el "DOM", no hay "botones" ni "ventanas" (no hay objeto `window` ni `document`). Solo hay lógica, datos y red.

---

## ⚡ Concurrencia y el Event Loop

A diferencia de Python o Java, donde un servidor web típico levanta un "hilo" (Thread) distinto de procesador por cada cliente que se conecta, Node.js es **Single-Threaded** (tiene un solo hilo principal).

Sin embargo, usa un modelo asíncrono basado en eventos (Event Loop). Cuando Node hace una consulta pesada a la base de datos, no se "congela" esperando. Delega esa tarea al sistema operativo y sigue atendiendo a miles de otros clientes. Cuando la base de datos responde, Node dispara un *Callback* (o resuelve una Promesa).

Esto hace que Node sea hiper-escalable para aplicaciones de tiempo real (Chats, Streaming), pero malo para procesar matemáticas pesadas (renderizado 3D o IA), terreno donde Python es el rey.
