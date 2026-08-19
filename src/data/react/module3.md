# 🔄 Estado Local (`useState`)

Acabamos de aprender que las Props son estáticas. Pero una aplicación web necesita cambiar (abrir menús, contar clicks, escribir en inputs). 

Para darle "memoria" a un componente, utilizamos los **Hooks**. Y el más importante de todos es `useState`.

---

## 🎣 El Hook `useState`

Cuando creas una variable normal en JS (`let contador = 0`), y la modificas, la variable cambia internamente, pero **React no actualiza la pantalla**. React no sabe que cambiaste la variable.

`useState` soluciona esto. Te devuelve un Array con dos cosas:
1. La variable que guarda el valor actual.
2. Una función **setter** que sirve para actualizar la variable *y avisarle a React que debe re-renderizar el componente*.

```tsx
import { useState } from 'react';

export default function Contador() {
  // Desestructuramos el array. 0 es el valor inicial.
  const [cuenta, setCuenta] = useState<number>(0);

  return (
    <div>
      <p>Has hecho clic {cuenta} veces</p>
      {/* Al llamar a setCuenta, React actualiza el número en pantalla */}
      <button onClick={() => setCuenta(cuenta + 1)}>
        Sumar +1
      </button>
    </div>
  );
}
```
*Tip TypeScript: Usamos genéricos `<number>` para asegurarnos de no guardar un string por error en ese estado.*

---

## 🔒 Inmutabilidad Estricta

Una regla de oro en React es que **nunca debes modificar el estado directamente**. El estado es Inmutable (Solo Lectura). Siempre debes usar la función `setter` para reemplazar el valor antiguo por uno completamente nuevo.

```tsx
const [usuario, setUsuario] = useState({ nombre: "Dano", edad: 20 });

// ❌ ESTO ESTÁ MAL (Mutación directa, React no se dará cuenta)
usuario.edad = 21;

// ✅ ESTO ESTÁ BIEN (Crear un objeto nuevo copiando el anterior)
setUsuario({ ...usuario, edad: 21 });
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tienes un botón que llama a esta función cuando haces clic:

```tsx
const [numero, setNumero] = useState(0);

function manejarClic() {
  setNumero(numero + 1);
  setNumero(numero + 1);
  setNumero(numero + 1);
}
```
Si el número inicial era 0 y haces un clic, ¿cuál será el valor del número que se renderiza en la pantalla? ¿1 o 3?

**Respuesta y Justificación:**
¡Será **1**! 
En React, las actualizaciones de estado son asíncronas y se ejecutan "por lotes" (Batching). Cuando llamas a `setNumero(numero + 1)`, React no cambia la variable `numero` inmediatamente en esa misma línea de código. Toma una "foto" del valor actual (que es 0), y planifica sumarle 1 en el futuro. Las tres líneas le están diciendo a React: "Oye, suma 0 + 1", por lo que termina sumando 1 de todas formas.
*(Si necesitas que dependa del estado anterior en el mismo ciclo, debes pasarle un callback: `setNumero(prev => prev + 1)`)*.
