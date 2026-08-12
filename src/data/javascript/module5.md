## Arrays

A diferencia de las variables, un array (matriz ó arreglo) puede almacenar _múltiples valores_.Cada valor en un array tiene un _index_ y cada index (índice) tiene _una referencia en una dirección de memoria_. Se puede acceder a cada valor usando sus _index_. El index de un array comienza desde _cero_, y el index del último elemento es menor a uno desde la longitud del array.

Un array es una colección de diferentes tipos de datos que están ordenados y son cambiables (modificables). Un array permite almacenar elementos duplicados y diferentes tipos de datos. Un array puede estar vacío o puede tener diferentes valores de diferentes tipos de datos.

### Como crear un array vacío

En JavaScript, podemos crear una array de diferentes maneras. Veamos diferentes formas de crear un array.
Es muy común usar _const_ en lugar de _let_ para declarar una variable array. Si está utilizando const, significa que no volverás a utilizar ese nombre de variable. Usar `const` congela el vínculo de la variable (no permite reasignar la variable a una dirección de memoria distinta, como `arr = []`), pero **sí permite mutar el contenido interno** del array (como usar `arr.push(30)`). Por eso es totalmente seguro y estándar declarar arrays con `const`.

- Usando el constructor de arrays

```js
// sintaxis
const arr = Array();
// or
// let arr = new Array()
console.log(arr); // []
```

- Usando corchetes([])

```js
// sintaxis
// Esto es lo más recomendable para crear una lista vacía
const arr = [];
console.log(arr);
```

---


### Como crear un array con valores

Array con valores iniciales. Usamos _length_ para encontrar la longitud del array.

```js
const numbers = [0, 3.14, 9.81, 37, 98.6, 100]; // array de  números
const fruits = ["banana", "orange", "mango", "lemon"]; // array de strings, Fruits
const vegetables = ["Tomato", "Potato", "Cabbage", "Onion", "Carrot"]; // array de strings, vegetables
const animalProducts = ["milk", "meat", "butter", "yoghurt"]; // array de strings, products
const webTechs = ["HTML", "CSS", "JS", "React", "Redux", "Node", "MongDB"]; // array web, technology
const countries = ["Finland", "Denmark", "Sweden", "Norway", "Iceland"]; // array de strings, country

// Imprimimos el array y su longitud

console.log("Numbers:", numbers);
console.log("Number of numbers:", numbers.length);

console.log("Fruits:", fruits);
console.log("Number of fruits:", fruits.length);

console.log("Vegetables:", vegetables);
console.log("Number of vegetables:", vegetables.length);

console.log("Animal products:", animalProducts);
console.log("Number of animal products:", animalProducts.length);

console.log("Web technologies:", webTechs);
console.log("Number of web technologies:", webTechs.length);

console.log("Countries:", countries);
console.log("Number of countries:", countries.length);
```

---


```sh
Numbers: [0, 3.14, 9.81, 37, 98.6, 100]
Number of numbers: 6
Fruits: ['banana', 'orange', 'mango', 'lemon']
Number of fruits: 4
Vegetables: ['Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']
Number of vegetables: 5
Animal products: ['milk', 'meat', 'butter', 'yoghurt']
Number of animal products: 4
Web technologies: ['HTML', 'CSS', 'JS', 'React', 'Redux', 'Node', 'MongDB']
Number of web technologies: 7
Countries: ['Finland', 'Estonia', 'Denmark', 'Sweden', 'Norway']
Number of countries: 5
```

- Array puede tener elementos de diferentes tipos de datos

```js
const arr = [
  "Asabeneh",
  250,
  true,
  { country: "Finland", city: "Helsinki" },
  { skills: ["HTML", "CSS", "JS", "React", "Python"] },
]; // arr contiene diferentes tipos de datos
console.log(arr);
```

---


### Creando un array usando split

Como hemos visto en la sección anterior, podemos dividir un string en diferentes posiciones y podemos cambiar a un array. Veamos los ejemplos a continuación

```js
let js = "JavaScript";
const charsInJavaScript = js.split("");

console.log(charsInJavaScript); // ["J", "a", "v", "a", "S", "c", "r", "i", "p", "t"]

let companiesString = "Facebook, Google, Microsoft, Apple, IBM, Oracle, Amazon";
const companies = companiesString.split(",");

console.log(companies); // ["Facebook", " Google", " Microsoft", " Apple", " IBM", " Oracle", " Amazon"]
let txt =
  "I love teaching and empowering people. I teach HTML, CSS, JS, React, Python.";
const words = txt.split(" ");

console.log(words);
// el texto tiene caracteres especiales piensa cómo puedes obtener solo las palabras
// ["I", "love", "teaching", "and", "empowering", "people.", "I", "teach", "HTML,", "CSS,", "JS,", "React,", "Python"]
```

---


### Acceder a los elementos de un array usando el index

Accedemos a cada elemento en un array usando su index. El index de un array comienza desde 0. La siguiente imagen muestra claramente el index de cada elemento en un array



```js
const fruits = ["banana", "orange", "mango", "lemon"];
let firstFruit = fruits[0]; // estamos accediendo al primer elemento usando su index

console.log(firstFruit); // banana

secondFruit = fruits[1];
console.log(secondFruit); // orange

let lastFruit = fruits[3];
console.log(lastFruit); // lemon
// El último index se puede calcular de la siguiente manera

let lastIndex = fruits.length - 1;
lastFruit = fruits[lastIndex];

console.log(lastFruit); // lemon
```

```js
const numbers = [0, 3.14, 9.81, 37, 98.6, 100]; // set of numbers

console.log(numbers.length); // => para saber el tamaño de la array, que es 6
console.log(numbers); // -> [0, 3.14, 9.81, 37, 98.6, 100]
console.log(numbers[0]); //  -> 0
console.log(numbers[5]); //  -> 100

let lastIndex = numbers.length - 1;
console.log(numbers[lastIndex]); // -> 100
```

---


```js
const webTechs = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Node",
  "MongoDB",
]; // Lista de tecnologías web

console.log(webTechs); // Todos los elementos del array
console.log(webTechs.length); // => para saber el tamaño de la array, que es 7
console.log(webTechs[0]); //  -> HTML
console.log(webTechs[6]); //  -> MongoDB

let lastIndex = webTechs.length - 1;
console.log(webTechs[lastIndex]); // -> MongoDB
```

---


```js
const countries = [
  "Albania",
  "Bolivia",
  "Canada",
  "Denmark",
  "Ethiopia",
  "Finland",
  "Germany",
  "Hungary",
  "Ireland",
  "Japan",
  "Kenya",
]; // Lista de países

console.log(countries); // -> Todas los países del array
console.log(countries[0]); //  -> Albania
console.log(countries[10]); //  -> Kenya

let lastIndex = countries.length - 1;
console.log(countries[lastIndex]); //  -> Kenya
```

---


```js
const shoppingCart = [
  "Milk",
  "Mango",
  "Tomato",
  "Potato",
  "Avocado",
  "Meat",
  "Eggs",
  "Sugar",
]; // Lista de productos alimenticios

console.log(shoppingCart); // -> todo el carrito de compras en array
console.log(shoppingCart[0]); //  -> Milk
console.log(shoppingCart[7]); //  -> Sugar

let lastIndex = shoppingCart.length - 1;
console.log(shoppingCart[lastIndex]); //  -> Sugar
```

---


### Modificar elementos de array

Un array es mutable (modificable). Una vez que un array es creado, podemos modificar el contenido de los elementos del array.

```js
const numbers = [1, 2, 3, 4, 5];
numbers[0] = 10; // cambiando 1 en el índice 0 a 10
numbers[1] = 20; // cambiando 2 en el índice 1 a 20

console.log(numbers); // [10, 20, 3, 4, 5]

const countries = [
  "Albania",
  "Bolivia",
  "Canada",
  "Denmark",
  "Ethiopia",
  "Finland",
  "Germany",
  "Hungary",
  "Ireland",
  "Japan",
  "Kenya",
];

countries[0] = "Afghanistan"; // Sustitución de Albania por Afganistán
let lastIndex = countries.length - 1;
countries[lastIndex] = "Korea"; // Sustitución de Kenia por Corea
console.log(countries);
```

Los arrays en JavaScript son dinámicos. Si asignas un valor a un índice muy superior al tamaño actual (por ejemplo, `arr[10] = 100` en un array de 3 elementos), el array se redimensiona automáticamente. Los espacios intermedios quedarán vacíos (conocidos como *empty slots* o *holey arrays*) y devolverán `undefined` si intentas acceder a ellos.

Además, la propiedad `length` no solo sirve para leer el tamaño del array, sino que también se puede modificar (setear). Si ejecutas `arr.length = 0`, borrarás instantáneamente todos los elementos del array, dejándolo vacío.

### Referencias y Clonación de Arrays

En JavaScript, los arrays son objetos (tipos compuestos). Al asignar un array a otra variable (ej. `let y = x`), se pasan **por referencia**. Ambas variables apuntarán a la misma ubicación en memoria, por lo que si modificas `y` (por ejemplo, `y.push(4)`), también estarás modificando `x`.

Para clonar o copiar un array superficialmente en ES6 sin crear referencias anidadas, la forma más recomendada es usar el operador de propagación (*spread operator*): `let clon = [...arr];`. Esto extrae los elementos y los coloca en un array completamente nuevo.

---


```sh
["Afghanistan", "Bolivia", "Canada", "Denmark", "Ethiopia", "Finland", "Germany", "Hungary", "Ireland", "Japan", "Korea"]
```

### Métodos para manipular arrays

Existen diferentes métodos para manipular un array. Estos son algunos de los métodos disponibles para manejar arrays:_Array, length, concat, indexOf, slice, splice, join, toString, includes, lastIndexOf, isArray, fill, push, pop, shift, unshift_


---

#### Constructor de arrays

Array:Para crear un array.

```js
const arr = Array(); // crea un array vacío
console.log(arr);

const eightEmptyValues = Array(8); // crea ocho valores vacíos
console.log(eightEmptyValues); // [empty x 8]
```


---

#### Creando valores estáticos con fill

fill: Rellena todos los elementos del array con un valor estático.

```js
const arr = Array(); // crea un array vacío
console.log(arr);

const eightXvalues = Array(8).fill("X"); // crea ocho valores de elementos llenos de 'X'
console.log(eightXvalues); // ['X', 'X','X','X','X','X','X','X']

const eight0values = Array(8).fill(0); // crea ocho valores de elementos llenos de '0'
console.log(eight0values); // [0, 0, 0, 0, 0, 0, 0, 0]

const four4values = Array(4).fill(4); // crea 4 valores de elementos llenos de '4'
console.log(four4values); // [4, 4, 4, 4]
```


---

#### Concatenación de arrays usando concat

concat:Para concatenar dos arrays.

```js
const firstList = [1, 2, 3];
const secondList = [4, 5, 6];
const thirdList = firstList.concat(secondList);

console.log(thirdList); // [1, 2, 3, 4, 5, 6]
```

```js
const fruits = ["banana", "orange", "mango", "lemon"]; // array de fruits
const vegetables = ["Tomato", "Potato", "Cabbage", "Onion", "Carrot"]; // array de vegetables
const fruitsAndVegetables = fruits.concat(vegetables); // concatena los dos arrays

console.log(fruitsAndVegetables);
```

```sh
["banana", "orange", "mango", "lemon", "Tomato", "Potato", "Cabbage", "Onion", "Carrot"]
```

---


#### Obtener la longitud de array

Length:Para saber el tamaño del array

```js
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.length); // -> 5 es el tamaño del array
```


---

#### Obtener el index de un elemento en un array

indexOf:Para verificar si un elemento existe en un array. Si existe, devuelve el index, de lo contrario devuelve -1.

```js
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.indexOf(5)); // -> 4
console.log(numbers.indexOf(0)); // -> -1
console.log(numbers.indexOf(1)); // -> 0
console.log(numbers.indexOf(6)); // -> -1
```

Comprobar si un elemento existe en un array.

- Comprobar elementos en una lista

```js
// vamos a comprobar si existe banana en el array

const fruits = ["banana", "orange", "mango", "lemon"];
let index = fruits.indexOf("banana"); // 0

if (index === -1) {
  console.log("Esta fruta no existe en el array.");
} else {
  console.log("Esta fruta existe en el array.");
}
// Esta fruta existe en el array.

// we can use also ternary here
index === -1
  ? console.log("Esta fruta no existe en el array.")
  : console.log("Esta fruta existe en el array.");

// let us check if an avocado exist in the array
let indexOfAvocado = fruits.indexOf("avocado"); // -1, if the element not found index is -1
if (indexOfAvocado === -1) {
  console.log("Esta fruta no existe en el array.");
} else {
  console.log("Esta fruta existe en el array.");
}
// Esta fruta no existe en el array.
```

---


#### Obtener el último index de un elemento en un array

lastIndexOf: Da la posición del último elemento en el array. Si existe, devuelve el index, de lo contrario, devuelve -1.

```js
const numbers = [1, 2, 3, 4, 5, 3, 1, 2];

console.log(numbers.lastIndexOf(2)); // 7
console.log(numbers.lastIndexOf(0)); // -1
console.log(numbers.lastIndexOf(1)); //  6
console.log(numbers.lastIndexOf(4)); //  3
console.log(numbers.lastIndexOf(6)); // -1
```

includes:Para verificar si un elemento existe en un array. Si existe, devuelve true, de lo contrario devuelve false.

```js
const numbers = [1, 2, 3, 4, 5];

console.log(numbers.includes(5)); // true
console.log(numbers.includes(0)); // false
console.log(numbers.includes(1)); // true
console.log(numbers.includes(6)); // false

const webTechs = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Node",
  "MongoDB",
]; // Lista de tecnologías web

console.log(webTechs.includes("Node")); // true
console.log(webTechs.includes("C")); // false
```

---


#### Comprobar un array

Array.isArray:Para verificar si el tipo de dato en un array

```js
const numbers = [1, 2, 3, 4, 5];
console.log(Array.isArray(numbers)); // true

const texto = 'JavaScript';
console.log(Array.isArray(texto));   // false
```

---

#### Crear un array desde otros iterables

`Array.from()` permite crear un nuevo array a partir de un objeto iterable como un string, un Set, o un NodeList del DOM.

```js
// Desde un string
console.log(Array.from('Hola'));  // ['H', 'o', 'l', 'a']

// Desde un Set
const miSet = new Set([1, 2, 3, 2, 1]);
console.log(Array.from(miSet));  // [1, 2, 3]

// Con función de transformación
console.log(Array.from([1, 2, 3], x => x * 2)); // [2, 4, 6]
```


---

#### Ordenar un array

El método `.sort()` ordena los elementos **in-place** (modifica el array original). Por defecto, convierte los elementos a strings y los ordena **lexicográficamente** (orden alfabético/Unicode), lo cual produce resultados inesperados con números:

```js
// Con strings funciona intuitivamente
let frutas = ['banana', 'manzana', 'cereza'];
frutas.sort();
console.log(frutas); // ['banana', 'cereza', 'manzana']

// ⚠️ Con números, el resultado es SORPRENDENTE
let nums = [10, 2, 5, 1];
nums.sort();
console.log(nums);   // [1, 10, 2, 5] — ¡Incorrecto! Ordena como strings: '1','10','2','5'
```

Para ordenar números correctamente, debemos pasar una **función comparadora**:

```js
let nums = [10, 2, 5, 1];

// Orden ascendente
nums.sort((a, b) => a - b);
console.log(nums);   // [1, 2, 5, 10] ✅

// Orden descendente
nums.sort((a, b) => b - a);
console.log(nums);   // [10, 5, 2, 1]
```

La función comparadora recibe dos elementos (`a` y `b`). Si retorna un número negativo, `a` va primero; si retorna positivo, `b` va primero; si retorna 0, quedan igual.


---

#### Invertir un array

El método `.reverse()` invierte el orden de los elementos **in-place** (modifica el array original):

```js
let nums = [1, 2, 3, 4, 5];
nums.reverse();
console.log(nums);   // [5, 4, 3, 2, 1]
```

Un patrón muy común es combinar `.sort()` con `.reverse()` para ordenar de forma descendente.