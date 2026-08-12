## Clases

JavaScript es un lenguaje de programación orientado a objetos. Todo en JavScript es un objeto, con sus propiedades y métodos. Creamos una clase para crear un objeto. Una clase es como un constructor de objetos, o un "plano" para crear objetos. Instanciamos una clase para crear un objeto. La clase define los atributos y el comportamiento del objeto, mientras que el objeto, por su parte, representa la clase.

Una vez que creamos una clase podemos crear un objeto a partir de ella cuando queramos. La creación de un objeto a partir de una clase se denomina instanciación de la clase.

En la sección de objetos, vimos cómo crear un objeto literal. El objeto literal es un singleton (instancia única). Si queremos obtener un objeto similar, tenemos que escribirlo. Sin embargo, la clase permite crear muchos objetos. Esto ayuda a reducir la cantidad de código y la repetición del mismo.

### Definir una clase

Las clases fueron introducidas en **ES6 (ECMAScript 2015)**. En realidad, son una capa de **"azúcar sintáctico"** sobre el ya existente modelo de herencia basada en prototipos de JavaScript. Antes de ES6 (en ES5), los desarrolladores lograban la herencia utilizando **Funciones Constructoras regulares y mutando explícitamente su propiedad `.prototype`** (Herencia Prototípica manual). El **Prototipo (Prototype)** es un objeto oculto interno que cada función constructora y objeto posee, utilizado como "molde" para delegar y heredar propiedades o métodos a través de la Cadena de Prototipos (Prototype Chain).

A diferencia de las funciones regulares, las clases en JavaScript **no sufren "hoisting" (elevación)** de la misma manera. Intentar instanciar una clase antes de su línea de declaración arrojará un `ReferenceError` (Temporal Dead Zone). Además de la declaración de clase estándar, también puedes usar una **Expresión de Clase (Class Expression)**, asignando la clase a una variable constante, por ejemplo: `const Rectangulo = class { };`.

Para definir una clase en JavaScript necesitamos la palabra clave _class_ , el nombre de una clase en **CamelCase** y bloque de código (dentro de dos corchetes). Vamos a crear una clase llamada Persona.

```sh
// sintaxis
class ClassName {
    //  el código va aquí
}

```

**Ejemplo:**

```js
class Person {
  // el código va aquí
}
```

---


Hemos creado una clase Persona pero no tiene nada dentro.

### Instanciar Clases

Instanciar una clase significa crear un objeto a partir de una clase. Necesitamos la palabra clave _new_ y llamamos al nombre de la clase después de la palabra _new_.

Vamos a crear un objeto persona a partir de nuestra clase Persona.

```js
class Person {
  // el código va aquí
}
const person = new Person();
console.log(person);
```

```sh
Person {}
```

Como puedes ver, hemos creado un objeto persona. Como la clase aún no tiene propiedades, el objeto también está vacío.

Usemos el constructor de la clase para pasar diferentes propiedades a la clase.

---


### Constructor

El constructor es una función incorporada que permite crear un blueprint para nuestro objeto. La función constructora comienza con la palabra clave _constructor_ seguida de un paréntesis. Dentro del paréntesis pasamos las propiedades del objeto como parámetro. Utilizamos la palabra clave _this_ para adjuntar los parámetros del constructor con la clase.

¿Qué ocurre si no incluyes explícitamente un método `constructor(){}` en una clase vacía o base? El motor de JavaScript es tolerante e **inserta automáticamente un constructor vacío e invisible** por detrás: `constructor() {}`. Por otro lado, si la clase que carece de constructor no es una clase base, sino una clase Hija (que usa `extends`), JavaScript inyecta un constructor que pasa todos los argumentos al padre automáticamente: `constructor(...args) { super(...args); }`.

El siguiente constructor de la clase Persona tiene las propiedades firstName y lastName. Estas propiedades se adjuntan a la clase Persona utilizando la palabra clave _this_. _this_ se refiere a la propia clase.

```js
class Person {
  constructor(firstName, lastName) {
    console.log(this); // Compruebe el resultado desde aquí
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const person = new Person();

console.log(person);
```

```sh
Person {firstName: undefined, lastName:undefined}
```

---


Todas las claves del objeto son undefined. Siempre que instanciemos debemos pasar el valor de las propiedades. Pasemos el valor en este momento cuando instanciamos la clase.

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const person1 = new Person("Asabeneh", "Yetayeh");

console.log(person1);
```

```sh
Person {firstName: "Asabeneh", lastName: "Yetayeh"}
```

Como hemos dicho al principio, una vez que creamos una clase podemos crear muchos objetos utilizando la clase. Ahora, vamos a crear muchos objetos persona utilizando la clase Persona.

```js
class Person {
  constructor(firstName, lastName) {
    console.log(this); // Compruebe el resultado desde aquí
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const person1 = new Person("Asabeneh", "Yetayeh");
const person2 = new Person("Lidiya", "Tekle");
const person3 = new Person("Abraham", "Yetayeh");

console.log(person1);
console.log(person2);
console.log(person3);
```

---


```sh
Person {firstName: "Asabeneh", lastName: "Yetayeh"}
Person {firstName: "Lidiya", lastName: "Tekle"}
Person {firstName: "Abraham", lastName: "Yetayeh"}
```

Usando la clase Persona creamos tres objetos persona. Como puedes ver nuestra clase no tenía muchas propiedades vamos a añadir más propiedades a la clase.

```js
class Person {
  constructor(firstName, lastName, age, country, city) {
    console.log(this); // Compruebe el resultado desde aquí
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
  }
}

const person1 = new Person("Asabeneh", "Yetayeh", 250, "Finland", "Helsinki");

console.log(person1);
```

---


```sh
Person {firstName: "Asabeneh", lastName: "Yetayeh", age: 250, country: "Finland", city: "Helsinki"}
```

### Valores por defecto con el constructor

Las propiedades de la función constructora pueden tener un valor por defecto como otras funciones regulares.

```js
class Person {
  constructor(
    firstName = "Asabeneh",
    lastName = "Yetayeh",
    age = 250,
    country = "Finland",
    city = "Helsinki"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
  }
}

const person1 = new Person(); // tomará el valor por defecto values
const person2 = new Person("Lidiya", "Tekle", 28, "Finland", "Espoo");

console.log(person1);
console.log(person2);
```

---


```sh
Person {firstName: "Asabeneh", lastName: "Yetayeh", age: 250, country: "Finland", city: "Helsinki"}
Person {firstName: "Lidiya", lastName: "Tekle", age: 28, country: "Finland", city: "Espoo"}
```

### Métodos de clase

El constructor dentro de una clase es una función incorporada que nos permite crear un blueprint para el objeto. En una clase podemos crear métodos de clase. Los métodos son funciones de JavaScript dentro de la clase. Vamos a crear algunos métodos de clase.

Si necesitas que un método maneje operaciones asíncronas (como hacer un fetch a una API) y devuelva una Promesa natural, puedes usar la palabra clave `async` colocándola exactamente antes del nombre del método. Por ejemplo: `async comprar() { await fetch(...) }`.

```js
class Person {
  constructor(firstName, lastName, age, country, city) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
  }
  getFullName() {
    const fullName = this.firstName + " " + this.lastName;
    return fullName;
  }
}

const person1 = new Person("Asabeneh", "Yetayeh", 250, "Finland", "Helsinki");
const person2 = new Person("Lidiya", "Tekle", 28, "Finland", "Espoo");

console.log(person1.getFullName());
console.log(person2.getFullName());
```

---


```sh
Asabeneh Yetayeh
test.js:19 Lidiya Tekle
```

### Propiedades con valor inicial

Cuando creamos una clase para algunas propiedades podemos tener un valor inicial. Por ejemplo, si estás jugando una partida, tu puntuación inicial será cero. Así, podemos tener una puntuación inicial o una puntuación que sea cero. De otra manera, podemos tener una habilidad inicial y adquiriremos alguna habilidad después de algún tiempo.

```js
class Person {
  constructor(firstName, lastName, age, country, city) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
    this.score = 0;
    this.skills = [];
  }
  getFullName() {
    const fullName = this.firstName + " " + this.lastName;
    return fullName;
  }
}

const person1 = new Person("Asabeneh", "Yetayeh", 250, "Finland", "Helsinki");
const person2 = new Person("Lidiya", "Tekle", 28, "Finland", "Espoo");

console.log(person1.score);
console.log(person2.score);

console.log(person1.skills);
console.log(person2.skills);
```

---


```sh
0
0
[]
[]
```

Un método puede ser un método regular o un getter o un setter. Veamos, getter y setter.

El uso de getters y setters nos ayuda a respetar el principio de **Encapsulamiento** en la Programación Orientada a Objetos. Este concepto dicta que el estado interno de un objeto debe estar protegido y no debe ser manipulado de forma directa e indiscriminada (ej: `cuenta.saldo = 9999`), sino a través de métodos expuestos que validen la transacción.

En las versiones modernas de JavaScript (ES2022+), podemos definir una **propiedad de clase PRIVADA** que prohíba estrictamente su lectura o modificación desde afuera **prefijando el nombre de la propiedad con un símbolo Hash `#`** (por ejemplo: `#saldo = 0;`).

---

### getter

El método get nos permite acceder al valor del objeto. Escribimos un método get utilizando la palabra clave _get_ seguida de una función. En lugar de acceder a las propiedades directamente desde el objeto utilizamos getter para obtener el valor. Vea el ejemplo siguiente

```js
class Person {
  constructor(firstName, lastName, age, country, city) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
    this.score = 0;
    this.skills = [];
  }
  getFullName() {
    const fullName = this.firstName + " " + this.lastName;
    return fullName;
  }
  get getScore() {
    return this.score;
  }
  get getSkills() {
    return this.skills;
  }
}

const person1 = new Person("Asabeneh", "Yetayeh", 250, "Finland", "Helsinki");
const person2 = new Person("Lidiya", "Tekle", 28, "Finland", "Espoo");

console.log(person1.getScore); // No necesitamos paréntesis para llamar a un método getter
console.log(person2.getScore);

console.log(person1.getSkills);
console.log(person2.getSkills);
```

---


```sh
0
0
[]
[]
```


---

### setter

El método setter nos permite modificar el valor de ciertas propiedades. Escribimos un método setter utilizando la palabra clave _set_ seguida de una función. Vea el ejemplo de abajo.

```js
class Person {
  constructor(firstName, lastName, age, country, city) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
    this.score = 0;
    this.skills = [];
  }
  getFullName() {
    const fullName = this.firstName + " " + this.lastName;
    return fullName;
  }
  get getScore() {
    return this.score;
  }
  get getSkills() {
    return this.skills;
  }
  set setScore(score) {
    this.score += score;
  }
  set setSkill(skill) {
    this.skills.push(skill);
  }
}

const person1 = new Person("Asabeneh", "Yetayeh", 250, "Finland", "Helsinki");
const person2 = new Person("Lidiya", "Tekle", 28, "Finland", "Espoo");

person1.setScore = 1;
person1.setSkill = "HTML";
person1.setSkill = "CSS";
person1.setSkill = "JavaScript";

person2.setScore = 1;
person2.setSkill = "Planning";
person2.setSkill = "Managing";
person2.setSkill = "Organizing";

console.log(person1.score);
console.log(person2.score);

console.log(person1.skills);
console.log(person2.skills);
```

---


```sh
1
1
["HTML", "CSS", "JavaScript"]
["Planning", "Managing", "Organizing"]
```

No te confundas con la diferencia entre un método regular y un getter. If you know how to make a regular method you are good. Let us add regular method called getPersonInfo in the Person class.

```js
class Person {
  constructor(firstName, lastName, age, country, city) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.country = country;
    this.city = city;
    this.score = 0;
    this.skills = [];
  }
  getFullName() {
    const fullName = this.firstName + " " + this.lastName;
    return fullName;
  }
  get getScore() {
    return this.score;
  }
  get getSkills() {
    return this.skills;
  }
  set setScore(score) {
    this.score += score;
  }
  set setSkill(skill) {
    this.skills.push(skill);
  }
  getPersonInfo() {
    let fullName = this.getFullName();
    let skills =
      this.skills.length > 0 &&
      this.skills.slice(0, this.skills.length - 1).join(", ") +
        ` and ${this.skills[this.skills.length - 1]}`;
    let formattedSkills = skills ? `He knows ${skills}` : "";

    let info = `${fullName} is ${this.age}. He lives ${this.city}, ${this.country}. ${formattedSkills}`;
    return info;
  }
}

const person1 = new Person("Asabeneh", "Yetayeh", 250, "Finland", "Helsinki");
const person2 = new Person("Lidiya", "Tekle", 28, "Finland", "Espoo");
const person3 = new Person("John", "Doe", 50, "Mars", "Mars city");

person1.setScore = 1;
person1.setSkill = "HTML";
person1.setSkill = "CSS";
person1.setSkill = "JavaScript";

person2.setScore = 1;
person2.setSkill = "Planning";
person2.setSkill = "Managing";
person2.setSkill = "Organizing";

console.log(person1.getScore);
console.log(person2.getScore);

console.log(person1.getSkills);
console.log(person2.getSkills);
console.log(person3.getSkills);

console.log(person1.getPersonInfo());
console.log(person2.getPersonInfo());
console.log(person3.getPersonInfo());
```


---


### Métodos y Propiedades Estáticas (static)

La palabra clave `static` define un método o propiedad que pertenece a la **clase misma**, no a las instancias. Esto significa que puedes llamarlo directamente sobre la clase sin necesidad de crear un objeto con `new`.

```js
class Auto {
  constructor(marca) {
    this.marca = marca;
  }

  // Método normal: se llama en una instancia
  arrancar() {
    return `${this.marca} está arrancando...`;
  }

  // Método estático: se llama directamente en la clase
  static tocarBocina() {
    return '¡BEEEP!';
  }
}

const miAuto = new Auto('Toyota');

// ✅ Método normal — se llama en la instancia
console.log(miAuto.arrancar());     // 'Toyota está arrancando...'

// ✅ Método estático — se llama en la CLASE
console.log(Auto.tocarBocina());    // '¡BEEEP!'

// ❌ Un método estático NO puede ser llamado desde una instancia
console.log(miAuto.tocarBocina());  // TypeError: miAuto.tocarBocina is not a function
```

Los métodos estáticos son útiles para funciones utilitarias que no dependen del estado de ninguna instancia particular. Un ejemplo real es `Math.random()` — no necesitas hacer `new Math()` porque todos los métodos de `Math` son estáticos.


---


### El operador `instanceof`

El operador `instanceof` verifica si un objeto es una instancia de una clase determinada (o de cualquier clase en su cadena de herencia). Retorna `true` o `false`.

```js
class Animal {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

class Perro extends Animal {
  ladrar() {
    return '¡Guau!';
  }
}

const firulais = new Perro('Firulais');

console.log(firulais instanceof Perro);   // true
console.log(firulais instanceof Animal);  // true  (hereda de Animal)
console.log(firulais instanceof Object);  // true  (todo hereda de Object)

const texto = 'Hola';
console.log(texto instanceof Perro);      // false
```

`instanceof` recorre la **cadena de prototipos** del objeto para verificar la relación de herencia.


---


### Prototipos (Prototype)

En JavaScript, **todo objeto tiene un prototipo**. El prototipo es un objeto interno del cual hereda propiedades y métodos. Las clases de ES6 son en realidad una sintaxis más limpia ("azúcar sintáctica") sobre el sistema de prototipos que JavaScript ha usado desde siempre.

Cuando accedes a una propiedad o método de un objeto y este no la tiene directamente, JavaScript busca automáticamente en su prototipo, luego en el prototipo del prototipo, y así sucesivamente. A esta búsqueda se le llama **cadena de prototipos** (Prototype Chain).

```js
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
}

const ana = new Persona('Ana');

// El método 'saludar' no vive en 'ana' directamente,
// sino en Persona.prototype
console.log(ana.saludar());  // 'Hola, soy Ana'

// Podemos ver el prototipo
console.log(Object.getPrototypeOf(ana) === Persona.prototype); // true
```

Antes de ES6 (antes de las clases), los objetos y la herencia se creaban manualmente usando funciones constructoras y la propiedad `.prototype`:

```js
// Forma antigua (pre-ES6) de crear "clases"
function Animal(nombre) {
  this.nombre = nombre;
}
Animal.prototype.hablar = function() {
  return `${this.nombre} hace un sonido`;
};

const gato = new Animal('Michi');
console.log(gato.hablar()); // 'Michi hace un sonido'
```

Hoy en día usamos clases ES6 por claridad, pero entender prototipos es fundamental porque es el mecanismo real que opera por debajo.