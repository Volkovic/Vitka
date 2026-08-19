# 🚀 Elevación del Estado (Lifting State Up)

El flujo de datos en React es unidireccional (Top-Down / De arriba hacia abajo). Las Props viajan de un componente Padre a un componente Hijo.

¿Pero qué pasa cuando dos componentes "Hermanos" necesitan compartir o editar la misma información?

---

## 🏗️ El Problema Estructural

Imagina que tienes una aplicación de Tareas. Tienes un componente `<InputNuevaTarea />` y un componente hermano `<ListaTareas />`.

```tsx
function App() {
  return (
    <div>
      <InputNuevaTarea /> 
      <ListaTareas />
    </div>
  );
}
```

Si el `<InputNuevaTarea />` tiene su propio `useState` privado, ¿cómo hace para enviarle la nueva tarea a la `<ListaTareas />` si en React los componentes hermanos no pueden hablarse directamente?

---

## 🛗 Solución: Levantar el Estado

Para resolver esto, debemos "elevar" el estado (Lifting State Up). 
Movemos el `useState` desde los hijos hacia su **ancestro común más cercano** (en este caso, `App`).

```tsx
function App() {
  // El estado vive en el Padre
  const [tareas, setTareas] = useState(["Lavar", "Cocinar"]);

  return (
    <div>
      {/* Al Input le pasamos la función SETTER por Prop, para que pueda añadir tareas */}
      <InputNuevaTarea agregarTarea={setTareas} tareasActuales={tareas} /> 
      
      {/* A la Lista le pasamos el ARRAY por Prop, para que las dibuje */}
      <ListaTareas lista={tareas} />
    </div>
  );
}
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Elevaste el estado al padre y creaste la siguiente función para que el hijo (InputNuevaTarea) la ejecute al añadir una nueva string. ¿Cuál es el error crítico de React que hay dentro de la función?

```tsx
const [lista, setLista] = useState(["A", "B"]);

function manejarNuevaLetra(nuevaLetra) {
  lista.push(nuevaLetra); // Añade al final
  setLista(lista);
}
```

**Respuesta y Justificación:**
El error crítico es la **mutación directa del estado** (`lista.push()`).
En React, si pasas el mismo espacio de memoria al setter (`setLista(lista)`), React dirá "este array es el mismo de antes, no voy a repintar la pantalla". Debes crear un nuevo array y copiar los datos del anterior, usando el operador Spread (`...`):

`setLista([...lista, nuevaLetra]);`
