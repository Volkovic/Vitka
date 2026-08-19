# 📘 TypeScript: Tipado de Funciones

En JS y Python, las funciones pueden recibir cualquier número de argumentos y devolver cualquier cosa. En TypeScript, las funciones se convierten en contratos estrictos.

Debemos definir qué tipos de datos entran (parámetros) y qué tipo de dato sale (retorno).

---

## 🎯 Tipando Parámetros y Retorno

Añadimos tipos a los parámetros como si fuesen variables. El tipo de retorno se coloca después de los paréntesis.

```typescript
// function nombre(param1: tipo): tipoRetorno { ... }

function sumar(a: number, b: number): number {
    return a + b;
}

// Si la función no devuelve nada, usamos el tipo especial "void"
function saludar(nombre: string): void {
    console.log(`Hola, ${nombre}!`);
}
```

Si intentas hacer `return "Hola"` dentro de una función tipada como `: number`, el compilador lo rechazará inmediatamente.

---

## ❓ Parámetros Opcionales y por Defecto

En TS, invocar una función con menos argumentos de los definidos causa un error. Si un parámetro es opcional, debemos indicarlo con `?`.

```typescript
// b es opcional. Si no se envía, será undefined
function calcularTotal(a: number, b?: number): number {
    if (b) {
        return a + b;
    }
    return a;
}

// O usar valores por defecto (TS infiere que descuento es number y opcional)
function aplicarDescuento(precio: number, descuento = 0) {
    return precio - descuento;
}
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tenemos un Callback (una función pasada como argumento a otra). ¿Cómo tipamos el argumento `callback` en la función `procesar`?

```typescript
function procesar(callback: ???) {
    callback("Terminado");
}
```

**Respuesta y Justificación:**
Usamos sintaxis de función flecha para definir el tipo de la función. El `callback` recibe un `string` y no devuelve nada (`void`).
`callback: (msg: string) => void`

```typescript
function procesar(callback: (msg: string) => void) {
    callback("Terminado");
}
```

---

## 🎭 Function Overloading (Sobrecarga)

A veces, una función en JS puede comportarse de manera completamente distinta dependiendo de la cantidad o tipos de argumentos que reciba.

TypeScript permite la "Sobrecarga", donde declaras múltiples "firmas" (signatures) de la función antes de su implementación real.

```typescript
// Firmas permitidas
function buscar(id: number): string;
function buscar(nombre: string): string[];

// Implementación real (Debe usar Union Types para cubrir todas las firmas)
function buscar(query: number | string): any {
    if (typeof query === "number") {
        return "Usuario 1"; // Retorna string (cumple firma 1)
    } else {
        return ["Usuario 1", "Usuario 2"]; // Retorna array (cumple firma 2)
    }
}
```
Esto le dice a TS: "Si alguien llama a esta función con un número, el autocompletado debe mostrar que devolverá un string. Si llama con un string, devolverá un array".
