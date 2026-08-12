## Promesas

Los seres humanos damos o recibimos una promesa para realizar alguna actividad en algún momento. Si cumplimos la promesa, hacemos felices a los demás, pero si no la cumplimos, puede provocar descontento. La promesa en JavaScript tiene algo en común con los ejemplos anteriores.

Una promesa es una forma de manejar operaciones asíncronas en JavaScript. Permite a los manejadores con un valor eventual de éxito o razón de fracaso de una acción asíncrona. Esto permite que los métodos asíncronos devuelvan valores como los métodos síncronos: en lugar de devolver inmediatamente el valor final, el método asíncrono devuelve una promesa de proporcionar el valor en algún momento en el futuro.

Una promesa está en uno de estos estados:

- pendiente: estado inicial, ni cumplido ni rechazado.
- cumplido: significa que la operación se ha completado con éxito.
- rechazado: significa que la operación ha fallado.

Una promesa pendiente puede ser cumplida con un valor, o rechazada con una razón (error). Cuando ocurre cualquiera de estas opciones, se llaman los manejadores asociados puestos en cola por el método _then_ de una promesa. (Si la promesa ya se ha cumplido o ha sido rechazada cuando se adjunta un manejador correspondiente, se llamará al manejador, por lo que no hay una condición de competencia entre una operación asíncrona que se completa y sus manejadores que se adjuntan).

Como los métodos _Promise.prototype.then()_ y _Promise.prototype.catch()_ devuelven promesas, pueden encadenarse.

Es importante destacar que si dentro de un bloque `.then(data => { ... })` retornas un nuevo valor (por ejemplo, `return data * 2`), ese bloque produce mágicamente y retorna UNA NUEVA PROMESA resuelta con ese valor modificado. Esto es lo que permite el encadenamiento o *Method Chaining*. Además, gracias a la propagación de errores (Error Propagation), si tienes múltiples `.then()` seguidos, basta con colocar un solo bloque `.catch()` al final absoluto; si cualquier `.then()` falla, el motor aborta inmediatamente el resto de los `.then()` y viaja (salta) directo al `.catch()` del fondo para atrapar el error.

Para entender cómo JavaScript maneja este asincronismo, debemos hablar del **Event Loop** (Bucle de Eventos). En JavaScript, todo el código síncrono bloqueante en la "Call Stack" (Pila de Llamadas) principal DEBE terminar de ejecutarse primero. Solo cuando la pila está vacía, el Event Loop inyecta las tareas asíncronas. Por ejemplo, si ejecutas `setTimeout(() => console.log('Hola'), 0); console.log('Mundo');`, se imprimirá primero 'Mundo' y luego 'Hola', ya que la mera invocación de `setTimeout` envía su callback a la cola asíncrona de la Web API (Macrotask Queue), dándole prioridad al código síncrono. 
Dentro de las tareas asíncronas, existen jerarquías. Los callbacks de `.then()` y `await` no van a la cola normal, sino a la **Cola de Microtareas (Microtask Queue)**. Esta es una cola de espera de máxima prioridad exclusiva para promesas. Si un `setTimeout` (Macrotarea) y una Promesa resuelta (Microtarea) compiten al mismo tiempo en la sala de espera, el Event Loop le dará pase libre y prioridad absoluta siempre a la Promesa.

---

## Callbacks

Para entender muy bien la promesa, entendamos primero la devolución de llamada. Veamos los siguientes callbacks. A partir de los siguientes bloques de código se notará, la diferencia entre callback y promesas.

- call back
  Veamos una función callback que puede tomar dos parámetros. El primer parámetro es err y el segundo es result. Si el parámetro err es falso, no habrá error, de lo contrario retornará un error.

En este caso el err tiene un valor y devolverá el bloque err.

```js
//Callback
const doSomething = (callback) => {
  setTimeout(() => {
    const skills = ["HTML", "CSS", "JS"];
    callback("It did not go well", skills);
  }, 2000);
};

const callback = (err, result) => {
  if (err) {
    return console.log(err);
  }
  return console.log(result);
};

doSomething(callback);
```

---


```sh
// después de 2 segundos se imprimirá
It did not go well
```

En este caso el err es falso y devolverá el bloque else que es el resultado.

```js
const doSomething = (callback) => {
  setTimeout(() => {
    const skills = ["HTML", "CSS", "JS"];
    callback(false, skills);
  }, 2000);
};

doSomething((err, result) => {
  if (err) {
    return console.log(err);
  }
  return console.log(result);
});
```

---


```sh
// después de 2 segundos imprimirá las habilidades
["HTML", "CSS", "JS"]
```

### Constructor de promesas

Podemos crear una promesa utilizando el constructor Promise. Podemos crear una nueva promesa utilizando la palabra clave `new` seguida de la palabra `Promise` y seguida de un paréntesis. Dentro del paréntesis, toma una función `callback`. La función de callback de la promesa tiene dos parámetros que son las funciones _`resolve`_ y _`reject`_.

```js
// sintaxis
const promise = new Promise((resolve, reject) => {
  resolve("success");
  reject("failure");
});
```

```js
// Promesas
const doPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const skills = ["HTML", "CSS", "JS"];
    if (skills.length > 0) {
      resolve(skills);
    } else {
      reject("Something wrong has happened");
    }
  }, 2000);
});

doPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.log(error));
```

---


```sh
["HTML", "CSS", "JS"]
```

La promesa anterior se ha resuelto con resolución.
Veamos otro ejemplo cuando la promesa se resuelve con el rechazo (reject).

```js
// Promesa
const doPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const skills = ["HTML", "CSS", "JS"];
    if (skills.includes("Node")) {
      resolve("fullstack developer");
    } else {
      reject("Something wrong has happened");
    }
  }, 2000);
});

doPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => console.error(error));
```

---


```sh
Something wrong has happened
```

## Fetch API

La API Fetch proporciona una interfaz para obtener recursos (incluso a través de la red). A cualquiera que haya utilizado XMLHttpRequest le resultará familiar, pero la nueva API ofrece un conjunto de funciones más potente y flexible. Es una función nativa asíncrona del navegador para solicitar recursos por red HTTP, que retorna inherentemente una Promesa. En este reto utilizaremos fetch para solicitar url y APIS. Además de esto, veamos una demostración del caso de uso de las promesas en el acceso a los recursos de la red utilizando la API fetch.

```js
const url = "https://restcountries.com/v2/all"; // api de países
fetch(url)
  .then((response) => response.json()) // acceder a los datos de la API como JSON
  .then((data) => {
    // obtener los datos
    console.log(data);
  })
  .catch((error) => console.error(error)); // manejo de errores si ocurre algo incorrecto
```


---

## Async y Await

Async y await es una forma elegante de manejar las promesas. Es fácil de entender y limpio de escribir.

```js
const square = async function (n) {
  return n * n;
};

square(2);
```

```sh
Promesa {<resolved>: 4}
```

La palabra _async_ delante de una función significa que esa función devolverá una promesa. La función cuadrada anterior en lugar de un valor devuelve una promesa.

¿Cómo accedemos al valor de la promesa? Para acceder al valor de la promesa, utilizaremos la palabra clave _await_.

```js
const square = async function (n) {
  return n * n;
};
const value = await square(2);
console.log(value);
```

---


```sh
4
```

Ahora, como puedes ver en el ejemplo anterior escribiendo async delante de una función creamos una promesa y para obtener el valor de una promesa utilizamos await. Async y await van juntos, uno no puede existir sin el otro.

Vamos a obtener los datos de la API utilizando tanto el método promise como el método async y await.

- promesa

```js
const url = "https://restcountries.com/v2/all";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error(error));
```

- async y await

---


```js
const fetchData = async () => {
  try {
    const response = await fetch(url);
    const countries = await response.json();
    console.log(countries);
  } catch (err) {
    console.error(err);
  }
};
console.log("===== async and await");
fetchData();
```

El uso de `await` revolucionó el código de red y bases de datos porque previene el infame *Callback Hell* (código anidado en forma de pirámide invertida), permitiendo leer y razonar sobre el código temporal y asíncrono en una elegante estructura visual *Top-Down* (de arriba hacia abajo), como si fuera código síncrono clásico.

Sin embargo, hay que tener cuidado con el rendimiento. Si tienes tres peticiones de red independientes que duran 2 segundos cada una y usas tres `await` consecutivos uno debajo del otro, el código tardará 6 segundos en total, ya que los `await` se bloquean secuencialmente haciendo un "cuello de botella" artificial innecesario. Para solucionar esto y ejecutar promesas en paralelo, JavaScript ofrece métodos estáticos muy potentes:

- **`Promise.all([promesa1, promesa2])`**: Toma un array de Promesas simultáneas y retorna UNA SOLA promesa maestra que se resuelve ÚNICAMENTE cuando todas y cada una de las promesas del array han terminado con éxito. Tiene una política de "Todo o Nada": si una sola promesa falla y entra en estado *Rejected*, el `Promise.all` entero se autodescarta, entra en cortocircuito y salta instantáneamente al bloque Catch de rechazo, perdiendo todo el trabajo.
- **`Promise.allSettled()`**: Introducido en ES2020, es el método moderno que deberías utilizar si quieres que todas las peticiones terminen y recopilar tanto los éxitos como los fallos detallados sin que un solo fallo derrumbe el resto.
- **`Promise.race([p1, p2, p3])`**: Ejecuta una carrera de promesas y se resuelve (o rechaza) estrictamente con el resultado de la PRIMERA promesa que logre finalizar (la más veloz), ignorando a las perdedoras. Es ideal para programar patrones de tiempo de expiración (Timeout Patterns).
- **`.finally()`**: Se ejecuta siempre al finalizar una promesa, sin importar si fue resuelta o rechazada. Es ideal para tareas de limpieza como ocultar un spinner de carga.

```js
// Ejemplo: ejecutar 3 fetch en paralelo con Promise.all
const urls = [
  'https://api.ejemplo.com/usuarios',
  'https://api.ejemplo.com/productos',
  'https://api.ejemplo.com/pedidos'
];

Promise.all(urls.map(url => fetch(url).then(r => r.json())))
  .then(([usuarios, productos, pedidos]) => {
    console.log('Todos los datos cargados:', usuarios, productos, pedidos);
  })
  .catch(error => console.error('Al menos una petición falló:', error))
  .finally(() => console.log('Carga finalizada (éxito o fallo)'));
```

## 💻 Ejercicios Prácticos (Promesas y APIs)

**Consigna 1:** Crea una Promesa básica (`new Promise`) que se resuelva exitosamente con el mensaje "Promesa cumplida" después de 2 segundos.
**[Solución]**
```javascript
const miPromesa = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Promesa cumplida');
  }, 2000);
});

miPromesa.then(resultado => {
  console.log(resultado); // Promesa cumplida (después de 2s)
});
```

**Consigna 2:** Lee la API pública de países usando la API `fetch` (basada en promesas con `.then()`) e imprime los datos crudos que devuelve.
**[Solución]**
```javascript
const countriesAPI = 'https://restcountries.com/v2/all';

fetch(countriesAPI)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Imprime el array completo de países
  })
  .catch(error => console.error(error));
```

**Consigna 3:** Reescribe la lectura de la API anterior utilizando `async / await` para que el código sea más síncrono visualmente. Extrae solo el nombre del primer país.
**[Solución]**
```javascript
const fetchPrimerPais = async () => {
  try {
    const response = await fetch('https://restcountries.com/v2/all');
    const data = await response.json();
    console.log("El primer país es:", data[0].name);
  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
}
// fetchPrimerPais();
```