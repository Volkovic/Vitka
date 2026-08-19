# 🔀 Renderizado Condicional y Listas

Las aplicaciones dinámicas raramente muestran todos sus elementos estáticos. Casi siempre necesitas mostrar cosas diferentes dependiendo del estado (Ej. Ocultar el botón de Login si el usuario ya ingresó), o renderizar listas enteras traídas de una Base de Datos.

---

## 🤔 If/Else en JSX

En JSX no puedes escribir un bloque `if () {}` tradicional dentro del HTML. Para renderizar cosas dinámicamente, utilizamos características propias de JavaScript: **El operador ternario** y el **operador lógico AND (`&&`)**.

```tsx
export default function Perfil({ isLogged, nombre }) {
  return (
    <div>
      {/* 1. Ternario: Si isLogged es true muestra A, sino B */}
      {isLogged ? <h1>Bienvenido {nombre}</h1> : <h1>Inicia sesión</h1>}

      {/* 2. Operador AND (Cortocircuito): Si isLogged es true, renderiza el botón. Si es false, React ignora todo */}
      {isLogged && <button>Cerrar Sesión</button>}
    </div>
  );
}
```

---

## 📋 Renderizando Listas (`.map()`)

React brilla cuando tiene que pintar listas masivas de datos. En lugar de usar bucles `for`, en React utilizamos estrictamente la función `.map()` de los arreglos.

El `.map()` toma un Array de datos, y lo transforma en un Array de "JSX" (HTML).

```tsx
const frameworks = ["React", "Vue", "Angular"];

export default function ListaTech() {
  return (
    <ul>
      {frameworks.map((fw) => (
        <li key={fw}>{fw}</li>
      ))}
    </ul>
  );
}
```

---

## 🗝️ La Propiedad `key` (El DNI de los elementos)

Habrás notado un atributo `key={fw}` en el ejemplo anterior. 
Cada vez que renderices una lista con `.map()`, React **te obliga** a pasarle una prop especial llamada `key` al elemento de más arriba del mapeo.

Esta llave debe ser **única e irrepetible** (usualmente se usa el `id` de la base de datos).

**¿Por qué?**
Para ayudar al Virtual DOM. Si tienes una lista de 1000 elementos y el usuario elimina uno del medio, React usaría la `key` para saber exactamente cuál borrar sin tener que re-dibujar la lista entera.

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tienes una base de datos de usuarios donde a veces el usuario no tiene foto, por lo que el objeto viene sin `id`. Para renderizar tu lista rápida y sin errores de consola, decides usar el "índice" del bucle map como key:

```tsx
<ul>
  {usuarios.map((user, index) => (
    <li key={index}>{user.nombre}</li>
  ))}
</ul>
```
¿Es esta una buena práctica si la lista tiene botones para "Eliminar" elementos o si la lista se puede reordenar?

**Respuesta y Justificación:**
**No, es un antipatrón sumamente peligroso.**
Si utilizas el `index` (0, 1, 2) y el usuario elimina el elemento en la posición 0, todos los demás elementos "subirán" de índice. El que era 1 pasará a ser 0. Esto confundirá brutalmente al Virtual DOM de React, haciendo que cruce los datos y muestre información incorrecta o bugueada. El `index` solo debe usarse si la lista es 100% estática y de solo lectura.
