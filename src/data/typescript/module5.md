# 📘 TypeScript: Arrays, Tuplas y Enums

JavaScript maneja arreglos y listas dinámicas sin control de tipo interno. TypeScript impone reglas sobre los elementos de un array y nos proporciona estructuras que JS no tiene nativamente, como Tuplas y Enums.

---

## 📚 Arrays Tipados

Existen dos formas de declarar un array tipado en TS. Ambas son equivalentes, pero la primera es la convención más popular.

```typescript
// 1. Añadiendo [] después del tipo
let edades: number[] = [20, 25, 30];
// edades.push("35"); // Error! Solo admite números

// 2. Usando Genéricos (lo veremos más adelante)
let nombres: Array<string> = ["Ana", "Juan"];
```

Si necesitas un array que contenga múltiples tipos de datos de forma impredecible, usas una Unión:
`let mixto: (number | string)[] = [1, "Dos", 3];`

---

## 🗄️ Tuplas (Tuples)

En JS, no hay diferencia entre una lista de longitud variable y una pareja de coordenadas `[x, y]`. En Python sí existen las Tuplas, y TS las trae al mundo JS.

Una **Tupla** es un Array de longitud y tipos **fijos y predefinidos**.

```typescript
// TS sabe que la posición 0 es string, y la 1 es number
let rgb: [string, number, number, number] = ["Red", 255, 0, 0];

let usuario: [number, string] = [1, "Dano"];
// usuario = ["Dano", 1]; // Error: El orden estricto importa
```

*Nota: Por diseño de JS transpìlado, TS no evita que uses `usuario.push("hack")`, pero sí restringe la inicialización y asignación directa.*

---

## 🏷️ Enums (Enumeraciones)

Un patrón muy común en Python o Java que no existe en JS. Los `enum` permiten definir un conjunto de constantes con nombre, haciendo el código más legible y evitando "Magic Strings" propensos a errores tipográficos.

```typescript
enum EstadoPedido {
    Pendiente, // Por defecto vale 0
    Enviado,   // Vale 1
    Entregado  // Vale 2
}

let estadoActual: EstadoPedido = EstadoPedido.Enviado;

// Si imprimimos estadoActual, veremos 1 en la consola.
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** ¿Cuál es la diferencia técnica entre usar un `enum` numérico (por defecto) y un `enum` de strings en TypeScript, como el que se muestra abajo?

```typescript
enum Roles {
    Admin = "ADMIN",
    User = "USER"
}
```

**Respuesta y Justificación:**
Los Enums numéricos se autoincrementan (0, 1, 2...) y TS crea un mapeo inverso (puedes acceder al nombre mediante el número). Los Enums de strings **no** se autoincrementan (debes darles un valor a todos explícitamente) y son más útiles para depuración, ya que si imprimes la variable, en la consola verás `"ADMIN"` en lugar de un misterioso `0`.
