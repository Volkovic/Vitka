# 📘 TypeScript: Genéricos (Generics)

Llegamos a uno de los conceptos más poderosos y avanzados de TypeScript. Los Genéricos permiten crear componentes (funciones, interfaces, clases) que pueden funcionar con **una variedad de tipos de datos en lugar de un solo tipo fijo**, manteniendo el chequeo estricto del compilador.

---

## 🧩 El Problema: Perder el Tipo

Imagina una función que devuelve lo mismo que le pasas.

```typescript
// Si usamos un tipo estricto, no es reutilizable
function identityNumber(arg: number): number { return arg; }

// Si usamos any para reutilizarla, perdemos el tipado de salida
function identityAny(arg: any): any { return arg; }
```

Si le pasamos un `string` a `identityAny`, TS creerá que la respuesta es `any` y el autocompletado del editor dejará de funcionar.

---

## 🚀 La Solución: Tipos como Variables (Generics)

Los genéricos son como parámetros, pero para *Tipos*. Se definen dentro de `< >` justo antes de los parámetros reales. Por convención se usa `<T>` (Type).

```typescript
// T captura el tipo que le pasemos cuando la invoquemos
function identity<T>(arg: T): T {
    return arg;
}

// Invocación explícita
let output1 = identity<string>("Hola"); // output1 es fuertemente tipado como string

// Inferencia inteligente (TS deduce T)
let output2 = identity(42); // TS infiere que T es number
```
Ahora, nuestra función es dinámica PERO el compilador sigue rastreando el tipo exacto.

---

## 🛠️ Ejercicio In-line

**Pregunta:** Queremos crear una función genérica que devuelva el tamaño (`.length`) del argumento. El siguiente código da un error de compilación. ¿Por qué, y cómo lo arreglarías usando Interfaces (Constraints)?

```typescript
function logLength<T>(arg: T): number {
    return arg.length; // Error: Property 'length' does not exist on type 'T'.
}
```

**Respuesta y Justificación:**
El error ocurre porque TS no sabe si el genérico `T` será un tipo que posea la propiedad `.length` (ej. podría ser un `number`). 
Para solucionarlo, usamos **Generic Constraints**. Creamos una interfaz y usamos la palabra clave `extends` dentro del genérico:

```typescript
interface HasLength { length: number; }

function logLength<T extends HasLength>(arg: T): number {
    return arg.length; // Ahora TS confía en que T tendrá ".length"
}
```

---

## 📦 Interfaces Genéricas

Puedes pasar tipos genéricos a una Interfaz. Esto se usa extensamente en React (para definir las Props de un componente) o en Axios/Fetch (para definir la estructura de la respuesta de una API).

```typescript
interface RespuestaAPI<Data> {
    status: number;
    error: boolean;
    data: Data;
}

// Le indicamos qué forma tendrá 'data' en esta petición en particular
const res: RespuestaAPI<{ nombre: string }> = {
    status: 200,
    error: false,
    data: { nombre: "Dano" }
};
```
