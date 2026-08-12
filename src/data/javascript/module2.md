## Tipos de Datos

En la sección anterior, mencionamos un poco sobre los tipos de datos. Los datos o valores tienen tipos de datos. Los tipos de datos describen las características de los datos. Los tipos de datos se pueden dividir en dos:

1. Tipos de datos primitivos
2. Tipos de datos que no son primitivos (referencias de objetos)

### Tipos de datos primitivos

Los tipos de datos primitivos en JavaScript incluyen:

1.  Números: enteros, flotantes
2.  Cadenas: cualquier dato entre comillas simples, comillas dobles o comillas invertidas
3.  Booleanos: valor verdadero o falso
4.  Nulo - valor vacío o sin valor
5.  Indefinido - una variable declarada sin un valor

Los tipos de datos que no son primitivos en JavaScript incluyen:

1. Objetos
2. Funciones
3. Matrices

Ahora, veamos qué significan exactamente los tipos de datos primitivos y no primitivos.
Los tipos de datos _primitivos_ son tipos de datos inmutables (no modificables). Una vez que se crea un tipo de datos primitivo, no podemos modificarlo.

---


**Ejemplo:**

```js
let word = "JavaScript";
```

Si intentamos modificar la cadena almacenada en la variable _word_, JavaScript debería generar un error. Cualquier tipo de datos bajo comillas simples, comillas dobles o comillas invertidas son un tipo de datos de cadena.

```js
word[0] = "Y";
```

Esta expresión no cambia la cadena almacenada en la variable _word_. Entonces, podemos decir que las cadenas no son modificables o, en otras palabras, inmutables. Los tipos de datos primitivos se comparan por sus valores. Comparemos diferentes valores de datos. Vea el ejemplo a continuación:

```js
let numOne = 3;
let numTwo = 3;

console.log(numOne == numTwo); // Verdadero

let js = "JavaScript";
let py = "Python";

console.log(js == py); // Falso

let lightOn = true;
let lightOff = false;

console.log(lightOn == lightOff); // Falso
```

Además de compararse por valor, los tipos primitivos se **asignan por valor**. Esto significa que si asignamos una variable primitiva a otra, se crea una copia independiente. Por ejemplo, si hacemos `let a = 1; let b = a; a = 2;`, la variable `b` seguirá valiendo `1` porque recibió una copia del valor, no una referencia.

---


### Tipos de datos no primitivos

Los tipos de datos _no primitivos_ son modificables o mutables. Podemos modificar el valor de los tipos de datos no primitivos después de su creación.
Veamos creando una matriz. Una matriz es una lista de valores de datos entre corchetes. Las matrices pueden contener tipos de datos iguales o diferentes. Los valores de matriz están referenciados por su índice. En el índice de matriz de JavaScript comienza en cero. Es decir, el primer elemento de una matriz se encuentra en el índice cero, el segundo elemento en el índice uno y el tercer elemento en el índice dos, etc.

```js
let nums = [1, 2, 3];
nums[0] = 10;

console.log(nums); // [10, 2, 3]
```

Como puede ver, una matriz, que es un tipo de datos no primitivo, es mutable. Los tipos de datos no primitivos no se pueden comparar por valor. Incluso si dos tipos de datos no primitivos tienen las mismas propiedades y valores, no son estrictamente iguales.

```js
let nums = [1, 2, 3];
let numberos = [1, 2, 3];

console.log(nums == numbers); // Falso

let usuarioUno = {
  nombre: "Asabeneh",
  papel: "teaching",
  pais: "Finland",
};

let usuarioDos = {
  nombre: "Asabeneh",
  papel: "teaching",
  pais: "Finland",
};

console.log(usuarioUno == usuarioDos); // Falso
```

---


Como regla general, no comparamos tipos de datos no primitivos. No compare matrices, funciones u objetos.
Los valores no primitivos se conocen como tipos de referencia, porque se comparan por referencia en lugar de por valor. Dos objetos solo son estrictamente iguales si se refieren al mismo objeto subyacente.

```js
let nums = [1, 2, 3];
let numberos = nums;

console.log(nums == numbers); // Verdadero

let usuarioUno = {
  nombre: "Asabeneh",
  papel: "teaching",
  pais: "Finland",
};

let userTwo = userOne;

console.log(usuarioUno == usuarioDos); // Verdadero
```

Si tiene dificultades comprendiendo la diferencia entre los tipos de datos primitivos y los tipos de datos no primitivos, no es el único. Cálmate y ve a la siguiente sección e intenta volver después de un tiempo. Ahora comencemos los tipos de datos por tipo de número.


---

## Números

Los números son números enteros y valores decimales que pueden hacer todas las operaciones aritméticas.
Veamos algunos ejemplos de Números.

### Declaración de tipos de datos numéricos

```js
let edad = 35;
const gravedad = 9.81; // usamos const para valores que no cambian, constante gravitacional en m/s2
let masa = 72; // masa en Kilogramo
const PI = 3.14; // pi una constante geométrica

// Más ejemplos
const boilingPoint = 100; // temperatura en oC, punto de ebullición del agua que es una constante
const bodyTemp = 37; // oC la temperatura corporal promedio del ser humano, que es una constante

console.log(edad, gravedad, masa, PI, boilingPoint, bodyTemp);
```

En JavaScript, los números utilizan un formato de coma flotante de doble precisión. El valor máximo seguro para un número entero antes de perder precisión es `Number.MAX_SAFE_INTEGER` (aproximadamente 9 mil billones); para sobrepasar eso, se usa el tipo `BigInt`.
Además, a diferencia de otros lenguajes que arrojan una excepción fatal, dividir un número positivo entre cero (por ejemplo, `let z = 5 / 0;`) devolverá el valor especial numérico `Infinity`.
Para realizar operaciones de potenciación, además del objeto Math, desde ES7 podemos usar el operador de exponenciación `**`. Por ejemplo, 2 elevado al cubo se escribe como `2 ** 3`, lo cual da 8.

---

### Objeto matemático

En JavaScript, el objeto matemático proporciona muchos métodos para trabajar con números.

```js
const PI = Math.PI;

console.log(PI); // 3.141592653589793

// Redondeo al número más cercano
// si es superior a 0,5 hacia arriba si es inferior a 0,5 redondeo hacia abajo

console.log(Math.round(PI)); // 3 para redondear valores al número más cercano

console.log(Math.round(9.81)); // 10

console.log(Math.floor(PI)); // 3 redondeando hacia abajo

console.log(Math.ceil(PI)); // 4 redondeando hacia arriba

console.log(Math.min(-5, 3, 20, 4, 5, 10)); // -5, devuelve el valor mínimo

console.log(Math.max(-5, 3, 20, 4, 5, 10)); // 20, devuelve el valor máximo

const randNum = Math.random(); // crea un número aleatorio entre 0 y 0,999999
console.log(randNum);

// Vamos a crear un número aleatorio entre 0 y 10

const num = Math.floor(Math.random() * 11); // crea un número aleatorio entre 0 y 10
console.log(num);

//Valor absoluto
console.log(Math.abs(-10)); // 10

//Raíz cuadrada
console.log(Math.sqrt(100)); // 10

console.log(Math.sqrt(2)); // 1.4142135623730951

// Poder
console.log(Math.pow(3, 2)); // 9

console.log(Math.E); // 2.718

// Logaritmo
// Devuelve el logaritmo natural con base E de x, Math.log(x)
console.log(Math.log(2)); // 0.6931471805599453
console.log(Math.log(10)); // 2.302585092994046

// Devuelve el logaritmo natural de 2 y 10 respectivamente
console.log(Math.LN2); // 0.6931471805599453
console.log(Math.LN10); // 2.302585092994046

// Trigonometría
Math.sin(0);
Math.sin(60);

Math.cos(0);
Math.cos(60);
```

---


#### Generador de números aleatorios

El objeto matemático de JavaScript tiene un generador de números de método random() que genera un número de 0 a 0.999999999...

```js
let randomNum = Math.random(); // genera 0 a 0.999...
```

Ahora, veamos cómo podemos usar el método random() para generar un número aleatorio entre 0 y 10:

```js
let randomNum = Math.random(); //  0 a 0.999
let numBtnZeroAndTen = randomNum * 11;

console.log(numBtnZeroAndTen); // esto da: min 0 y max 10.99

let randomNumRoundToFloor = Math.floor(numBtnZeroAndTen);
console.log(randomNumRoundToFloor); // esto da entre 0 y 10
```


---

## Cadenas

Las cadenas son textos, que están debajo de **_single_** , **_double_**, **_back-tick_** comillas. Para declarar una cadena, necesitamos un nombre de variable, un operador de asignación, un valor entre comillas simples, comillas dobles o comillas invertidas.
Veamos algunos ejemplos de cadenas:

```js
let espacio = " "; // una cadena de espacio vacío
let primerNombre = "Asabeneh";
let apellido = "Yetayeh";
let pais = "Finland";
let ciudad = "Helsinki";
let idioma = "JavaScript";
let trabajo = "teacher";
let cita = "The saying,'Seeing is Believing' is not correct in 2020.";
let quotConBackTick = `The saying,'Seeing is Believing' is not correct in 2020.`;
```


---

### Concatenación de cadenas

La conexión de dos o más cadenas entre sí se llama concatenación.
Usando las cadenas declaradas en la sección de Cadenas anterior:

```js
let nombreCompleto = primerNombre + espacio + apellido; // concatenación, fusionando dos cadenas juntas.
console.log(nombreCompleto);
```

```sh
Asabeneh Yetayeh
```

Podemos concatenar cadenas de diferentes formas.


---

#### Concatenar usando el operador de suma

Concatenar usando el operador de suma es una forma antigua. Esta forma de concatenar es tediosa y propensa a errores. Es bueno saber cómo concatenar de esta manera, pero recomiendo enfáticamente usar las cadenas de plantilla ES6 (explicadas más adelante).

```js
// Declarar diferentes variables de diferentes tipos de datos
let espacio = " ";
let primerNombre = "Asabeneh";
let apellido = "Yetayeh";
let pais = "Finland";
let ciudad = "Helsinki";
let idioma = "JavaScript";
let trabajo = "teacher";
let edad = 250;

let nombreCompleto = primerNombre + espacio + apellido;
let datosPersonaUno =
  nombreCompleto + ". Yo tengo " + edad + ". Vivo en" + pais; // Adición de cadena ES5

console.log(personInfoOne);
```

---


```sh
Asabeneh Yetayeh. Yo tengo 250v Finland
```

#### Cadenas literales largas

Una cadena puede ser un solo carácter, un párrafo o una página. Si la longitud de la cadena es demasiado grande, no cabe en una línea. Podemos usar el carácter de barra invertida (\\) al final de cada línea para indicar que la cadena continuará en la línea siguiente.
**Ejemplo:**

```js
const parrafo =
  "Mi nombre es Asabeneh Yetayeh. Vivo en Finlandia, Helsinki.\
Soy profesora y me encanta enseñar. Enseño HTML, CSS, JavaScript, React, Redux, \
Node.js, Python, Data Analysis y D3.js para cualquier persona interesada en aprender. \
A fines de 2019, estaba pensando en expandir mi enseñanza y llegar a \
a la audiencia global y comencé un desafío de Python del 20 de noviembre al 19 de diciembre.\
Fue una de las experiencias más gratificantes e inspiradoras.\
Ahora, estamos en 2020. Disfruto preparando el desafío 30DaysOfJavaScript y \
Espero que tú también estés disfrutando.";

console.log(parrafo);
```

---


#### Secuencias de escape en cadenas

En JavaScript y otros lenguajes de programación \ seguido de algunos caracteres es una secuencia de escape. Veamos los caracteres de escape más comunes:

-\n: nueva linea

- \t: Tabulador, significa 8 espacios
- \\\\: barra invertida
- \\': Una frase (')
- \\": comillas dobles (")

```js
console.log(
  "Espero que todos estén disfrutando el desafío de 30 días de JavaScript.¿Y tú?"
); // salto de línea
console.log("Días\temasEjercicios");
console.log("Día 1\t3\t5");
console.log("Día 2\t3\t5");
console.log("Día 3\t3\t5");
console.log("Día 4\t3\t5");
console.log("Este es un símbolo de barra invertida (\\)"); // Para escribir una barra invertida
console.log(
  'En todos los lenguajes de programación comienza con "¡Hola, mundo!"'
);
console.log(
  "En todos los lenguajes de programación comienza con '¡Hola, mundo!'"
);
console.log("El dicho 'Ver para creer' no es correcto en 2022");
```

---


Salida en consola:

```sh
Espero que todos estén disfrutando el desafío de 30 días de JavaScript.
¿Y tú?

Días temas Ejercicios
Día 1 3 5
Día 2 3 5
Día 3 3 5
Día 4 3 5
Este es un símbolo de barra invertida (\)
En todos los lenguajes de programación comienza con"¡Hola, mundo!"
En todos los lenguajes de programación comienza con"¡Hola, mundo!"
El dicho 'Ver para creer' no es correcto en 2022
```


---

#### Literales de plantilla

Para crear una plantilla de cadenas(cadenas de plantilla), usamos dos tildes de retroceso. Podemos inyectar datos como expresiones dentro de una cadena de plantilla. Para inyectar datos, encerramos la expresión con un corchete ({}) precedido por un signo $. Consulte la sintaxis a continuación.

```js
//Sintaxis
`Texto literal de cadena``Cadena de texto literal ${expresión}`;
```

**Ejemplo: 1**

```js
let a = 2;
let b = 3;
console.log(`La suma de ${a} y ${b} es ${a + b}`); // La suma de 2 y 3 es 5
```

```js
let nombre = "Asabeneh";
let apellido = "Yetayeh";
let pais = "Finland";
let ciudad = "Helsinki";
let idioma = "JavaScript";

let informacion = `Soy ${nombre} ${apellido}. Vivo en ${pais}, ${ciudad}. Enseño ${idioma}`;
console.log(informacion);
```

Los template literals permiten incluir expresiones de JavaScript directamente dentro del string, haciendo el código más legible que la concatenación con `+`.


---

## Métodos de String

Los strings en JavaScript son inmutables (no pueden ser modificados directamente), pero disponen de una gran cantidad de métodos que retornan un **nuevo string** sin alterar el original.

### Longitud y acceso a caracteres

```js
let js = 'JavaScript';

// .length — retorna la cantidad de caracteres
console.log(js.length);        // 10

// Acceso por índice (empieza en 0)
console.log(js[0]);            // 'J'
console.log(js[3]);            // 'a'

// Último carácter dinámicamente
console.log(js[js.length - 1]); // 't'

// .charAt(index) — igual que el acceso por corchete
console.log(js.charAt(4));      // 'S'

// .at(index) — ES2022, permite índices negativos
console.log(js.at(-1));         // 't' (último carácter)
console.log(js.at(-2));         // 'p' (penúltimo)
```

A diferencia de Python, usar `js[-1]` con corchetes retorna `undefined` en JavaScript estándar. Por eso, para acceder dinámicamente al último carácter se usa `str[str.length - 1]` o el moderno `str.at(-1)`.


---

### Búsqueda en strings

```js
let frase = 'el sol brilla fuerte';

// .indexOf(subcadena) — retorna el índice de la primera aparición, o -1 si no existe
console.log(frase.indexOf('sol'));     // 3
console.log(frase.indexOf('luna'));    // -1

// .includes(subcadena) — retorna true o false
console.log(frase.includes('sol'));    // true
console.log(frase.includes('luna'));   // false

// .startsWith(texto) y .endsWith(texto)
console.log(frase.startsWith('el'));     // true
console.log(frase.endsWith('fuerte'));   // true
```

`indexOf()` retorna el **índice numérico** de la primera aparición de la subcadena. Si no la encuentra, retorna `-1`. Por otro lado, `includes()` solo retorna `true` o `false` sin indicar posición.


---

### Transformación de strings

```js
let saludo = '  Hola Mundo  ';

// .toUpperCase() — convierte todo a mayúsculas (retorna nuevo string)
console.log('hola'.toUpperCase());          // 'HOLA'

// .toLowerCase() — convierte todo a minúsculas
console.log('HOLA'.toLowerCase());          // 'hola'

// .trim() — elimina espacios, tabulaciones y saltos de línea del inicio y final
console.log(saludo.trim());                 // 'Hola Mundo'
// No elimina los espacios entre palabras, solo los del inicio y final

// .replace(buscar, reemplazo) — reemplaza SOLO la primera coincidencia
let txt = 'Hola Hola';
console.log(txt.replace('Hola', 'Adiós'));  // 'Adiós Hola'

// .replaceAll(buscar, reemplazo) — reemplaza TODAS las coincidencias
console.log(txt.replaceAll('Hola', 'Adiós')); // 'Adiós Adiós'
```

Recuerda: los strings son inmutables. Todos estos métodos retornan un **nuevo string** sin modificar el original.


---

### Extracción de subcadenas

```js
let str = 'JavaScript';

// .slice(inicio, fin) — extrae desde 'inicio' hasta 'fin' (sin incluir fin)
console.log(str.slice(4));       // 'Script' (desde índice 4 hasta el final)
console.log(str.slice(0, 4));    // 'Java'

// .substring(inicio, fin) — similar a slice, pero no acepta índices negativos
console.log(str.substring(4, 10)); // 'Script'
```

Tanto `slice(4)` como `substring(4, 10)` retornan `'Script'`. La diferencia principal es que `slice()` soporta índices negativos y `substring()` no.


---

### De string a array: split()

```js
let csv = 'manzana,banana,cereza';

// .split(separador) — divide el string en un array
console.log(csv.split(','));    // ['manzana', 'banana', 'cereza']

let frase = 'Hola Mundo';
console.log(frase.split(' ')); // ['Hola', 'Mundo']
console.log(frase.split(''));  // ['H','o','l','a',' ','M','u','n','d','o']
```


---


## Conversión de tipos: String a Número

JavaScript ofrece varias formas de convertir strings a números:

```js
// parseInt(string) — convierte a entero, ignora caracteres no numéricos al final
console.log(parseInt('10px'));    // 10
console.log(parseInt('3.14'));    // 3 (descarta los decimales)
console.log(parseInt('abc'));     // NaN

// parseFloat(string) — convierte a decimal
console.log(parseFloat('3.14')); // 3.14

// Number(string) — conversión estricta de todo el string
console.log(Number('10'));       // 10
console.log(Number('10px'));     // NaN (no puede convertir todo el string)
console.log(Number(''));         // 0 (string vacío se convierte a 0)
console.log(Number(null));       // 0
console.log(Number(undefined));  // NaN
```

La diferencia clave: `parseInt('10px')` retorna `10` porque parsea de izquierda a derecha y se detiene al encontrar un carácter no numérico. `Number('10px')` intenta convertir **todo** el string y al fallar retorna `NaN`.


---


## El valor especial NaN

`NaN` (Not a Number) es un valor numérico especial que representa un resultado matemático inválido.

```js
// typeof NaN es 'number' (irónicamente)
console.log(typeof NaN);      // 'number'

// NaN NO es igual a sí mismo (es el ÚNICO valor en JS con esta propiedad)
console.log(NaN === NaN);     // false
console.log(NaN == NaN);      // false

// Para verificar si un valor es NaN, usa Number.isNaN() o isNaN()
console.log(Number.isNaN(NaN));       // true
console.log(Number.isNaN('hola'));     // false
console.log(isNaN('hola'));           // true (convierte primero a número)
```

Dado que `NaN` no es igual a sí mismo, **nunca** uses `=== NaN` para verificar; siempre usa la función `Number.isNaN(valor)` o `isNaN(valor)`.


---


## Wrapper Objects (Objetos Envoltorio)

Los strings, numbers y booleans son tipos primitivos, pero podemos acceder a propiedades y métodos como `.length` o `.toUpperCase()`. ¿Cómo es esto posible?

```js
console.log('Hola'.length);         // 4
console.log('Hola'.toUpperCase());  // 'HOLA'
```

Cuando intentas acceder a una propiedad de un primitivo, JavaScript crea **temporalmente** un objeto envoltorio (Wrapper Object) alrededor del valor (`new String('Hola')`), accede a la propiedad o método solicitado, y luego lo descarta inmediatamente. Esto se conoce como **auto-boxing**. El primitivo original nunca se convierte permanentemente en un objeto.