# 📘 TypeScript: Union e Intersection Types

Una de las características más potentes de TS frente a lenguajes tipados clásicos es la flexibilidad de su sistema de tipos mediante *Uniones* e *Intersecciones*.

A diferencia de otros lenguajes donde una variable es de un solo tipo estricto, TS nos permite combinar tipos de forma declarativa.

---

## 🔗 Union Types (`|`)

El operador de unión (`|`) permite que una variable sea de uno de varios tipos posibles. Es decir, actúa como un "OR" lógico.

```typescript
let idCita: number | string;

idCita = 101;      // Válido
idCita = "C-101";  // Válido también
// idCita = true;  // Error! No es number ni string
```

Esto es muy común al recibir IDs de bases de datos que a veces son UUIDs (strings) y a veces secuenciales (numbers).

---

## 🛡️ Type Narrowing (Estrechamiento de Tipos)

Si tienes una Unión, TS te obligará a comprobar qué tipo estás usando antes de acceder a métodos específicos. A esto se le llama **Type Narrowing**.

```typescript
function procesarId(id: number | string) {
    // console.log(id.toUpperCase()); // Error! ¿Y si id es un número?

    if (typeof id === "string") {
        // En este bloque, TS sabe 100% que id es string
        console.log(id.toUpperCase()); 
    } else {
        // En este bloque, TS deduce automáticamente que id es number
        console.log(id.toFixed(2));
    }
}
```

Usamos `typeof` para primitivos (strings, numbers, booleans) y `instanceof` para clases u objetos más complejos.

---

## 🛠️ Ejercicio In-line

**Pregunta:** ¿Por qué la siguiente función da error en TypeScript?

```typescript
function imprimirLongitud(valor: string | string[]) {
    console.log(valor.length);
}
```

**Respuesta y Justificación:**
¡Es una pregunta trampa! **No da error.** 
Tanto `string` como `Array` (en este caso `string[]`) comparten la propiedad `length`. Cuando usas Union Types, TS permite acceder a las propiedades que son comunes a **todos** los tipos de la unión sin necesidad de hacer *Type Narrowing*.

---

## 🧩 Intersection Types (`&`)

Mientras que la unión es "uno u otro", la intersección (`&`) actúa como un "AND" lógico. Combina múltiples tipos en uno solo que tiene **todas** las propiedades.

```typescript
type Trabajador = { empresa: string };
type Persona = { nombre: string };

// Empleado debe tener obligatoriamente lo de Trabajador Y Persona
type Empleado = Trabajador & Persona;

const emp: Empleado = {
    empresa: "Google",
    nombre: "Dano"
};
```
Las intersecciones son muy útiles para crear "Mixins" o combinar múltiples comportamientos en la arquitectura de tu aplicación.
