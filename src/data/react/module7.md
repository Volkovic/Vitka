# 🔌 Efectos Secundarios (`useEffect`)

React hace dos cosas de forma excelente: Renderizar UI y reaccionar a la interacción del usuario. Pero, ¿qué pasa si necesitas hacer algo que ocurre **fuera del control de React**?

Por ejemplo: 
- Conectarte a una base de datos o API.
- Escuchar los movimientos exactos del ratón.
- Arrancar un cronómetro (Timer).

Cualquier cosa que salga del flujo puro de renderizado de React se llama **Efecto Secundario**.

---

## 🪄 El Hook `useEffect`

Para manejar estos casos usamos `useEffect`. Este hook le dice a React: *"Renderiza la pantalla para que el usuario no se quede esperando, y justo después de eso, ejecuta esta lógica pesada o externa"*.

```tsx
import { useEffect, useState } from 'react';

export default function MiComponente() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Esto se ejecuta DESPUÉS de que el HTML se dibuja en pantalla
    fetch('https://api.ejemplo.com/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }); 

  return <div>{usuarios.length} usuarios cargados</div>;
}
```

¡Espera! Hay un problema grave en el código anterior.

---

## 💣 El Array de Dependencias `[]`

Si no le pones límites, `useEffect` se ejecutará **después de cada re-renderizado**. En el ejemplo anterior:
1. `useEffect` hace el fetch a la API.
2. Llama a `setUsuarios(data)`.
3. Eso cambia el estado, lo que causa un re-renderizado.
4. El componente se re-renderiza, y por tanto, ¡ejecuta de nuevo el `useEffect`!
5. **Bucle Infinito** (Tu app crashea y la API te bloquea).

Para evitar esto, le pasamos un segundo argumento: el **Array de Dependencias**.

```tsx
  useEffect(() => {
    // Fetch a la API
  }, []); // <--- Array Vacío
```
Un array vacío `[]` significa: *"React, ejecuta esto ÚNICAMENTE la primera vez que el componente aparezca en pantalla. Nunca más"*.

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tienes un chat, y quieres que cada vez que la prop `idSala` cambie (el usuario entró a otra sala), tu app haga un fetch a la base de datos para traer los mensajes nuevos. ¿Cómo configuras el `useEffect`?

```tsx
export default function Chat({ idSala }) {
  useEffect(() => {
    cargarMensajesDe(idSala);
  }, /* ¿Qué va aquí? */ );
}
```

**Respuesta y Justificación:**
La respuesta es `[idSala]`.
Al poner `idSala` dentro del array, le estás diciendo a React: "Por favor, vigila esta variable. Si el componente se re-renderiza pero `idSala` sigue valiendo lo mismo que antes, ignora el `useEffect`. Pero si detectas que el usuario cambió de sala (el valor mutó), vuelve a ejecutar el código del `useEffect` para traer los mensajes nuevos".
