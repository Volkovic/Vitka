# Módulo 1: Clean Code y Refactorización

## El Código Limpio (Clean Code)

Aprender la sintaxis de un lenguaje (como los for-loops, ifs, o cómo crear una clase) es solo el 10% del trabajo de un desarrollador. El 90% restante consiste en comunicar ideas.

Robert C. Martin (conocido como Uncle Bob) popularizó el término **"Clean Code"** (Código Limpio) en su famoso libro homónimo. La filosofía central se resume en una realidad brutal de la industria:
> *"El código se lee 10 veces más de lo que se escribe."*

Cuando programas, no le estás hablando a la computadora (el compilador traducirá tu código a ceros y unos de todos modos). **Le estás hablando a otros seres humanos**: a tus compañeros de equipo o, muy probablemente, a ti mismo dentro de seis meses.

Un código sucio, desordenado y confuso se convierte rápidamente en lo que se conoce como **Deuda Técnica**. Con el tiempo, añadir una nueva funcionalidad tomará semanas en lugar de días, porque los programadores tendrán miedo de tocar el código por temor a romper algo. El Clean Code es la disciplina de escribir código que sea obvio para cualquier desarrollador que lo lea.

---

## Nombres Significativos

La forma más rápida de limpiar tu código es nombrando las cosas correctamente. Nombrar variables, funciones y clases es una de las tareas más difíciles en programación, y merece que te tomes tu tiempo.

**1. Revela tus intenciones:**
Evita la pereza mental de usar variables de una sola letra (salvo en iteradores pequeños).
- Malo: `const d = 10; // dias transcurridos`
- Bueno: `const diasTranscurridos = 10;`

**2. Evita los "Números Mágicos":**
Un número mágico es un número suelto en el código sin contexto.
- Malo: `if (password.length > 8) { ... }`
- Bueno: 
```javascript
const MIN_PASSWORD_LENGTH = 8;
if (password.length > MIN_PASSWORD_LENGTH) { ... }
```

**3. Pronunciables y Buscables:**
No inventes abreviaturas raras. Si tu compañero no puede pronunciarlo, no lo uses.
- Malo: `const genYmdhms = new Date();`
- Bueno: `const fechaDeGeneracion = new Date();`

**4. Booleanos con preguntas:**
Los booleanos deben responder a una pregunta de "Sí o No". Utiliza prefijos como `is`, `has`, `can`.
- Malo: `const admin = true;`
- Bueno: `const isAdmin = true;` o `const hasAdminPrivileges = true;`

---

## Funciones: El Corazón del Código

Las funciones son la primera línea de organización en cualquier programa. Las reglas para las funciones en Clean Code son estrictas pero transformadoras.

**1. Regla #1: Deben ser pequeñas.**
Las funciones deben ser pequeñas. Y la segunda regla de las funciones es que deben ser *aún más pequeñas*. Si tu función ocupa más de lo que cabe en tu pantalla (unas 20-30 líneas), probablemente esté haciendo demasiadas cosas.

**2. Regla #2: Haz UNA sola cosa (Single Responsibility).**
Una función debería hacer solo una cosa, hacerla bien y hacerla únicamente. 
Si tienes una función llamada `validarYGuardarUsuario()`, ya estás violando la regla. La palabra "Y" en el nombre es una alerta roja. Deberías tener una función `validarUsuario()` y otra función `guardarUsuario()`.

**3. Nivel de Abstracción:**
Todas las líneas dentro de una función deben estar en el mismo nivel de abstracción. Mezclar lógica de alto nivel (como "Calcular Impuestos") con lógica de muy bajo nivel (como manipular un array o concatenar un string largo) dificulta la lectura. Extrae la lógica de bajo nivel a su propia función con un nombre descriptivo.

**4. Argumentos (Parámetros):**
La cantidad ideal de parámetros de una función es cero (0). Un parámetro (1) está bien, y dos (2) se toleran. Tres (3) deberían evitarse en lo posible. Si tu función necesita cuatro (4) o más argumentos, deberías envolver esos valores en un único objeto de configuración.

---

## Comentarios: El Fracaso de la Expresión

Uno de los mantras más polémicos (pero ciertos) de Uncle Bob es:
> *"Un comentario es un síntoma de que fallaste en expresarte con tu código".*

En general, **el código bueno se documenta a sí mismo**. Si necesitas escribir un comentario para explicar qué hace un bloque de código confuso, no escribas el comentario; en su lugar, reescribe el bloque de código para que sea tan limpio que no necesite explicación.

Los comentarios son peligrosos porque el código cambia constantemente (se actualiza, se mueve), pero los programadores suelen olvidarse de actualizar los comentarios. Eventualmente, tendrás un comentario que dice "Esta función suma A y B", pero el código debajo en realidad está multiplicando. Un comentario que miente es peor que no tener ningún comentario.

**¿Cuándo SÍ son buenos los comentarios?**
- **Comentarios legales:** Copyrights en la cabecera del archivo.
- **Advertencias:** Explicar el "Por Qué" de una decisión extraña. (Ej. `// NOTA: Usamos un timeout aquí por un bug conocido en la API de Google`).
- **JSDoc / Tipado:** En lenguajes dinámicos como JS, usar documentación formal (JSDoc) para definir tipos de retorno o parámetros públicos de una librería es una excelente práctica.

---

## Manejo de Errores Limpio

El manejo de errores es algo que solemos dejar para el final, pero en código profesional, es una parte central del diseño.

**1. Usa Excepciones (Try/Catch) en lugar de códigos de retorno:**
En lenguajes antiguos como C, las funciones devolvían `-1` o `0` si algo salía mal, obligando al programador a llenar su código de sentencias `if (resultado === -1)`. 
Hoy en día, debes `lanzar` (throw) errores reales y atraparlos de forma centralizada con bloques `try/catch`. Esto separa tu código principal feliz (Happy Path) de tu código de manejo de errores, haciendo todo más limpio.

**2. No devuelvas `null` si puedes evitarlo:**
Devolver `null` desde una función te obliga a llenar todo tu programa con revisiones preventivas (`if (usuario !== null)`). En su lugar, lanza una excepción (`throw new Error('Usuario no encontrado')`) o devuelve un "Objeto Especial Nulo" o un arreglo vacío.

---

## Code Smells (Malos Olores) y Refactorización

Un "Code Smell" es un indicador superficial que sugiere que podría haber un problema de diseño más profundo en el sistema. No son errores (el código funciona), pero son advertencias de que estás acumulando deuda técnica.

Algunos "olores" clásicos:
- **Código Duplicado (Copy-Paste):** Si ves la misma estructura de 10 líneas repetida en tres lugares diferentes, debes extraerla a una función reutilizable.
- **Funciones y Clases Gigantes (God Object):** Un archivo con 2000 líneas de código es inmanejable. Hay que romperlo.
- **Envidiando Datos (Feature Envy):** Cuando una función de la Clase A pasa todo su tiempo usando datos y métodos de la Clase B en lugar de los suyos propios. Esa función probablemente debería pertenecer a la Clase B.

### Refactorización Continua (La Regla del Boy Scout)
El **Refactoring** es el proceso de reestructurar el código existente sin cambiar su comportamiento externo. No es algo que se hace "una vez al mes" o "cuando haya tiempo". 

La regla de oro del Clean Code es la Regla del Boy Scout:
> *"Deja el campamento (el código) siempre un poco más limpio de lo que lo encontraste."*

Cada vez que vayas a tocar un archivo para añadir una función, si ves una variable mal nombrada, corrígela. Si ves código duplicado de hace meses, abstráelo. Esos pequeños empujones diarios mantendrán el proyecto reluciente y saludable durante años.
