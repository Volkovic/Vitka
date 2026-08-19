# 🔌 Node: Sistemas de Módulos

En los viejos tiempos, todo el código JS de una página se escribía en un solo archivo gigante, o en múltiples archivos pegados con etiquetas `<script>` dependientes del orden. No existía la posibilidad nativa de "importar" un archivo dentro de otro (como el `import math` de Python).

Node.js tuvo que inventar una solución para el Backend, y luego JavaScript moderno adoptó un estándar oficial. Convivimos con ambos hoy en día.

---

## 📜 CommonJS (El legado de Node)

Antes del 2015, Node creó su propio sistema llamado **CommonJS**. Lo identificarás inmediatamente porque usa la función `require()`.

Si quieres exportar una función desde un archivo `math.js`:
```javascript
function sumar(a, b) { return a + b; }

// Sintaxis CommonJS para hacer pública la función
module.exports = sumar; 
```

Y en tu archivo principal (`index.js`), la importas así:
```javascript
const sumar = require('./math.js');
console.log(sumar(2, 3));
```

*(Nota: Gran parte del código backend viejo y configuraciones de Webpack todavía usan CommonJS).*

---

## ✨ ES Modules / ESM (El Estándar Moderno)

En 2015, JavaScript actualizó su núcleo (ECMAScript 6) e introdujo un sistema oficial y nativo: **ES Modules**. Este es el que usarás en React, TypeScript y en Node moderno.

En `math.js`:
```javascript
// Exportación nombrada directa
export function sumar(a, b) { return a + b; }

// O exportación por defecto
export default function restar(a, b) { return a - b; }
```

En tu `index.js`:
```javascript
// Sintaxis moderna
import restar, { sumar } from './math.js';
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tienes un archivo TS con la siguiente función:
```typescript
export function conectarDB() { ... }
```
Y en otro archivo intentas usar:
```typescript
import conectarDB from './database.ts';
```
Aparece un error en tu editor. ¿Por qué el import falla?

**Respuesta y Justificación:**
La función `conectarDB` fue exportada como **Named Export** (Exportación Nombrada). Para importarla, el nombre debe estar envuelto en llaves de desestructuración, ya que no es el export por `default`. 

La solución correcta es: `import { conectarDB } from './database.ts';`

---

## ⚠️ Node y los Módulos ES

Por defecto, los archivos `.js` en Node se tratan como CommonJS (`require`). Si intentas usar un `import` en un script simple de Node, te dará error.

Para indicarle a Node que usarás el sistema moderno, debes añadir `"type": "module"` en tu `package.json`. A partir de ahí, puedes decir adiós al viejo `require`.
