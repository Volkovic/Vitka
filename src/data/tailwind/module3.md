# ⚡ El Compilador JIT (Just-In-Time) y Estados

Para entender por qué Tailwind conquistó el mercado, hay que entender cómo funciona por debajo del capó. Las versiones iniciales de Tailwind tenían un defecto enorme: para proveer todas las utilidades (`m-1`, `m-2`, `bg-red-500`... en todos los Breakpoints posibles), el archivo CSS final compilado podía pesar **Megabytes**.

El navegador colapsaba intentando descargar un archivo CSS tan pesado.

---

## 🧠 La Revolución JIT (Just-In-Time)

A partir de su versión 3, Tailwind reconstruyó su motor desde cero e introdujo el compilador **Just-In-Time (JIT)**.

En lugar de generar un CSS con 100,000 clases posibles "por si acaso" las usas, el motor JIT actúa como un escáner.
1. Cuando ejecutas tu entorno de desarrollo (`npm run dev`), Vite y Tailwind "leen" tus archivos `.jsx` o `.tsx` en vivo.
2. Si Tailwind detecta que escribiste `bg-blue-500`, **crea** esa clase exacta en la memoria y la inyecta al navegador.
3. Las clases que NO usaste simplemente no existen.

El resultado es mágico: En lugar de un archivo global gigantesco, el CSS de producción de un proyecto gigante en Tailwind rara vez supera los **10 Kilobytes**.

---

## 📱 Modificadores de Estado y Media Queries en Línea

El paradigma "Utility-First" brilla gracias al JIT Compiler. En lugar de escribir Media Queries asfixiantes en un archivo CSS, Tailwind utiliza prefijos condicionales.

El motor de Tailwind compila "al vuelo" los pseudo-estados. En React puedes escribir un botón así:

```tsx
<button className="bg-red-500 hover:bg-red-700 md:bg-blue-500 dark:bg-black">
  Clic Aquí
</button>
```

**Lectura Arquitectónica del Botón:**
- Base: Fondo Rojo.
- Si el usuario pasa el ratón por encima (`hover:`), el fondo cambia a rojo oscuro.
- Si el usuario está en una pantalla de tablet o PC (`md:` = Breakpoint mediano), Tailwind ignora el rojo y lo pinta Azul.
- Si el Sistema Operativo del usuario está en Modo Oscuro (`dark:`), el fondo es Negro.

Todo en una sola línea de código, sin tocar archivos externos ni declarar selectores CSS.

---

## 🛠️ Ejercicio In-line

**Pregunta:** Construyes un componente de React genérico llamado `<DynamicBox />` que recibe un nombre de color como 'Prop' desde el servidor, para luego aplicarlo a una clase de Tailwind:

```tsx
export default function DynamicBox({ color }) {
  // Ej. Si color = "red", Tailwind intentará pintar bg-red-500
  return <div className={`bg-${color}-500`}>Contenido</div>;
}
```
Cuando corres el proyecto, el div aparece en blanco (sin color) a pesar de que la prop `color` sí contiene el string "red". ¿Por qué falló el motor de Tailwind?

**Respuesta y Justificación:**
¡Por culpa de cómo funciona el escáner Just-In-Time!
El motor de Tailwind escanea el código **estáticamente** usando expresiones regulares antes de que el JavaScript se ejecute en el navegador. Cuando Tailwind lee `bg-${color}-500`, no ve la palabra "red", solo ve una variable dinámica. Al no detectar un patrón estricto como "bg-red-500", el compilador JIT asume que nadie la usa y **no la inyecta** en el CSS final. 
En Tailwind NUNCA debes concatenar strings dinámicamente para construir nombres de clases parciales. Debes mapear la clase completa en un diccionario o enviarla entera desde el Padre.
