# 📘 TypeScript: Introducción y Tipado Básico

¡Bienvenido a TypeScript (TS)! Como ya conoces JavaScript y Python, seremos directos: TypeScript es JavaScript **con sintaxis de tipos estáticos**.

Todo código JS válido es TS válido. TS añade una capa de validación en tiempo de **compilación**, antes de que el código corra en el navegador o Node.js. Al final, TS se transpila a JS puro.

---

## ⚙️ Inferencia vs Anotación de Tipos

Al igual que Python tiene *type hints*, TS permite definir el tipo de una variable explícitamente (**Anotación**). Sin embargo, TS es inteligente y a menudo no necesitas decírselo (**Inferencia**).

```typescript
// Inferencia (TS deduce que es un number, igual que JS)
let edad = 25; 

// Anotación explícita
let nombre: string = "Dano";
let isDeveloper: boolean = true;
```

Si intentamos hacer `edad = "veinte"`, JS lo permitiría. TS nos arrojará un error antes de ejecutarlo.

---

## 🛠️ Ejercicio In-line

**Pregunta:** ¿Cuál de estas declaraciones arrojará un error en TypeScript y por qué?

```typescript
let precio = 100;
precio = 150;

let rol: string = "admin";
rol = 2;
```

**Respuesta y Justificación:**
La línea `rol = 2;` dará error. `rol` fue anotado explícitamente como `string`. 
La reasignación `precio = 150;` es válida porque TS infirió que `precio` era de tipo `number`, y se le está asignando otro `number`.

---

## 🕵️‍♂️ Los tipos `any` y `unknown`

Cuando no sabes qué tipo de dato tendrás, puedes usar `any` o `unknown`.

* **`any`**: Apaga el chequeo de tipos de TypeScript. Permite cualquier operación. (Evítalo, es como escribir en JS puro y pierdes las ventajas de TS).
* **`unknown`**: Significa "no lo sé, pero oblígame a validarlo antes de usarlo". Es mucho más seguro que `any`.

```typescript
let valorMisterioso: any = 5;
valorMisterioso.metodoInexistente(); // TS lo permite silenciosamente (¡Peligro en runtime!)

let valorSeguro: unknown = "Hola";
// valorSeguro.toUpperCase(); // Error! TS te obliga a comprobarlo primero
if (typeof valorSeguro === "string") {
    valorSeguro.toUpperCase(); // Ok! Ahora TS sabe que es string
}
```

---

## 📄 Compilación y Configuración: `tsc` y `tsconfig.json`

Para convertir (transpilar) código TS a JS, usamos el comando `tsc`. 

La forma en que TS evalúa tu código y lo convierte a JS se configura en un archivo central llamado `tsconfig.json`.

```json
{
  "compilerOptions": {
    "target": "ES2022",       // Qué versión de ECMAScript (JS) generar
    "module": "CommonJS",     // Sistema de módulos a usar
    "strict": true,           // Habilita todas las reglas estrictas (Recomendado)
    "outDir": "./dist"        // Carpeta donde se guardarán los archivos .js
  }
}
```
Si tu `tsconfig.json` tiene `"strict": true`, TS no permitirá que declares variables sin tipo explícito o implícito si no puede deducirlo.
