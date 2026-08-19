# 📘 TypeScript: Tipos de Utilidad (Utility Types)

TypeScript viene con un conjunto de "Tipos de Utilidad" (Utility Types) preconstruidos globalmente. Son funciones que transforman un Tipo o Interfaz existente en uno nuevo, evitando que dupliques código.

Todos estos utilitarios se construyen bajo el capó utilizando Genéricos.

---

## 🛠️ `Partial<T>` y `Required<T>`

A menudo tienes una interfaz completa, pero en ciertas operaciones (como un formulario de actualización o un endpoint `PATCH`), necesitas que todos esos campos sean opcionales.

```typescript
interface Tarea {
    id: number;
    titulo: string;
    completada: boolean;
}

// Partial vuelve TODO opcional
type ActualizacionTarea = Partial<Tarea>;
/* Equivalente a:
{ id?: number; titulo?: string; completada?: boolean; }
*/

const patch: ActualizacionTarea = { titulo: "Nuevo Título" }; // Válido
```
`Required<T>` hace exactamente lo opuesto: vuelve obligatorio todo lo que era opcional.

---

## ✂️ `Pick<T, Keys>` y `Omit<T, Keys>`

Si tienes un objeto muy grande y quieres crear un tipo nuevo usando solo algunas de sus propiedades, usas `Pick`. Si quieres agarrar todas *excepto* algunas, usas `Omit`.

```typescript
interface Usuario {
    id: string;
    nombre: string;
    email: string;
    passwordHash: string;
}

// Pick: Tomamos solo el id y el nombre
type UsuarioPublico = Pick<Usuario, "id" | "nombre">;

// Omit: Tomamos todo excepto el password (Ideal para devolver datos de la BD)
type UsuarioSeguro = Omit<Usuario, "passwordHash">;
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Queremos crear un diccionario (u objeto mapa) en TS donde las llaves sean SIEMPRE de tipo `string` y los valores sean SIEMPRE de tipo `number` (para mapear nombres de productos a sus precios). ¿Qué Utility Type usarías sin tener que definir una interfaz con llaves dinámicas?

**Respuesta y Justificación:**
La herramienta ideal para crear objetos con llaves dinámicas estrictas es **`Record<Keys, Type>`**.

```typescript
const catalogo: Record<string, number> = {
    "Laptop": 1000,
    "Mouse": 20
    // "Teclado": "Caro" -> Error, el valor debe ser number
};
```

---

## 💡 Cierre de Curso

¡Felicidades! Al dominar este paradigma estructural, Interfaces, Unions, y Genéricos, has superado la curva de aprendizaje de TypeScript. 

Ahora, al leer código de React, Angular o arquitecturas Node.js avanzadas, entenderás perfectamente por qué el código está blindado y cómo el compilador asegura su fiabilidad estructural antes de salir a producción.
