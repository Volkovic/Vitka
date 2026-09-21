# Módulo 1: Fundamentos del Testing y Jest

## ¿Por qué probar nuestro código?

Seguramente te ha pasado: construyes una nueva funcionalidad en tu aplicación, la pruebas haciendo clic por todos lados en tu navegador, y parece funcionar a la perfección. La subes a producción. Al día siguiente, descubres que al agregar esa funcionalidad, rompiste otra parte del sistema que no habías tocado en meses.

A medida que las aplicaciones crecen, **probar todo manualmente se vuelve imposible**. 
El Testing Automatizado consiste en escribir código que pone a prueba tu código. Es un robot que, en cuestión de segundos, verifica que las 500 funciones de tu aplicación sigan arrojando el resultado esperado tras cada cambio.

El testing automatizado no solo previene bugs, sino que actúa como **documentación viva**. Al leer las pruebas de un compañero, puedes entender exactamente qué se supone que hace su código. Además, te da una inmensa **confianza para refactorizar**. Puedes reescribir todo el interior de una función sucia para hacerla más limpia, y si al terminar, las pruebas siguen pasando en verde, sabes que no rompiste nada.

---

## La Pirámide de Testing

No todas las pruebas son iguales. En la industria del software, categorizamos el testing automatizado usando el concepto de "La Pirámide de Testing".

1. **Pruebas Unitarias (Base de la pirámide):**
   - **Qué hacen:** Prueban la unidad de código más pequeña posible en aislamiento total (una sola función, un solo método).
   - **Características:** Son extremadamente rápidas (milisegundos) y baratas de escribir.
   - **Volumen:** Deberían componer la mayor parte de tu código de pruebas (el 70%).

2. **Pruebas de Integración (Medio de la pirámide):**
   - **Qué hacen:** Prueban cómo interactúan múltiples piezas de código juntas. (Ej. Probar que un componente de React hace click y llama correctamente a un contexto global).
   - **Características:** Son un poco más lentas y más complejas de armar.
   - **Volumen:** Deberían ser aproximadamente el 20%.

3. **Pruebas End-to-End o E2E (Punta de la pirámide):**
   - **Qué hacen:** Simulan a un usuario real interactuando con tu aplicación completa. Levantan un navegador real (Chrome/Firefox), hacen clic en botones, escriben en inputs y verifican la base de datos real.
   - **Características:** Son muy lentas, propensas a fallar por lentitud de internet (flaky) y muy costosas de mantener.
   - **Volumen:** Deberían ser la minoría (10%), reservadas solo para los "Happy Paths" más críticos del negocio (como el flujo de pago o login).

---

## Introducción a Jest

Para escribir y ejecutar pruebas unitarias y de integración en el ecosistema JavaScript, la herramienta rey absoluto de la industria es **Jest** (creada por Facebook).

Jest es un "Test Runner". Es el programa que busca todos los archivos en tu proyecto que terminen en `.test.js` o `.spec.js`, ejecuta el código dentro de ellos y te imprime en la consola un reporte hermoso con checks verdes o equis rojas indicando qué pasó y qué falló.

**La sintaxis básica de Jest:**
Jest inyecta funciones globales en tus archivos de prueba, por lo que no necesitas importar nada para usarlas. Las dos principales son `test()` (o `it()`) y `expect()`.

```javascript
// math.js
export const sumar = (a, b) => a + b;

// math.test.js
import { sumar } from './math';

test('suma correctamente 1 + 2 para dar 3', () => {
  // 1. Preparación (Arrange)
  const a = 1;
  const b = 2;
  
  // 2. Acción (Act)
  const resultado = sumar(a, b);
  
  // 3. Aserción (Assert)
  expect(resultado).toBe(3);
});
```
*Nota: Este patrón de tres pasos (Arrange, Act, Assert) es la convención universal para escribir pruebas limpias.*

---

## Aserciones (Matchers)

El bloque `expect()` es donde ocurre la magia. Retorna un objeto al que puedes encadenarle "Matchers" (Aserciones). Los matchers son las condiciones que determinan si la prueba pasa o falla. 

Existen matchers para evaluar casi cualquier tipo de dato:

**1. Para Valores Exactos:**
`expect(valor).toBe(algo)`
Usa `toBe` para tipos de datos primitivos (números, strings, booleanos). Es equivalente a `===`.

**2. Para Objetos y Arrays:**
`expect(objeto).toEqual({ nombre: 'Juan' })`
Nunca uses `toBe` para objetos o arreglos, porque en JavaScript, dos objetos idénticos tienen diferente referencia en memoria, y `toBe` fallaría. `toEqual` revisa recursivamente cada propiedad de los objetos.

**3. Para Booleanos y Nulos:**
- `expect(valor).toBeTruthy()` (Pasa si el valor es *truthy*).
- `expect(valor).toBeNull()`
- `expect(valor).toBeUndefined()`

**4. Para Strings y Arrays:**
- `expect('Hola Mundo').toMatch(/Mundo/)` (Usando expresiones regulares).
- `expect(['Manzana', 'Pera']).toContain('Pera')`

**5. Para Excepciones:**
Si quieres asegurar que una función lanza un error bajo ciertas condiciones:
`expect(() => miFuncionQueLanzaError()).toThrow('Texto del error esperado')`

---

## Agrupación (Describe) y Ciclo de Vida (Hooks)

A medida que tu archivo de pruebas crece, tener decenas de funciones `test()` sueltas se vuelve desordenado. Jest provee el bloque `describe()` para crear una suite de pruebas agrupadas lógicamente.

```javascript
describe('Módulo de Autenticación', () => {
  test('falla con contraseña corta', () => { /* ... */ });
  test('inicia sesión correctamente', () => { /* ... */ });
});
```

### Hooks del Ciclo de Vida
A menudo, necesitas preparar ciertas cosas antes de que corran las pruebas, o limpiar la basura después de que terminen (por ejemplo, vaciar una base de datos de pruebas para que cada `test()` arranque desde cero limpio). 
Para esto existen los Hooks:

- `beforeAll()`: Corre UNA VEZ antes de todas las pruebas del archivo. Útil para conectar a la base de datos.
- `beforeEach()`: Corre ANTES DE CADA UNA de las pruebas. Vital para limpiar variables y garantizar que una prueba no contamine a la siguiente (Aislamiento).
- `afterEach()`: Corre DESPUÉS DE CADA UNA de las pruebas.
- `afterAll()`: Corre UNA VEZ al final del archivo. Útil para desconectarse de la base de datos.

```javascript
describe('Operaciones en Base de Datos', () => {
  beforeEach(() => {
    limpiarTablaUsuarios();
  });

  test('Crea un usuario', () => {
    // Esta prueba tiene la garantía de que la tabla está vacía.
  });
});
```

---

## El Arte del Mocking (Dobles de Prueba)

Aquí llegamos a la parte donde el 90% de los desarrolladores se atascan.

En las Pruebas Unitarias, **la unidad de código bajo prueba debe estar 100% aislada**. 
Si estás probando una función `obtenerPrecioDolar()`, y esa función hace un `fetch()` a la API del banco... ¡Tú NO quieres que tu prueba haga un HTTP Request real a internet! 
¿Qué pasa si el banco está caído? Tu prueba fallaría (rojo), y tú pensarías que tu código está mal, cuando en realidad es culpa del internet. Las pruebas unitarias deben funcionar perfecto incluso si te desconectas del WiFi en un avión.

Para lograr esto usamos **Mocks** (Simulaciones). Reemplazamos la función real (`fetch`) por un "Doble de Prueba" controlado por nosotros.

```javascript
import { obtenerPrecioDolar } from './api';
// Imaginemos que 'obtenerPrecioDolar' usa 'axios' internamente.
import axios from 'axios';

// 1. Le decimos a Jest que intercepte y reemplace TODA la librería de axios
jest.mock('axios');

test('retorna el precio correctamente', async () => {
  // 2. Le decimos al mock de axios qué debe devolver FALSAMENTE
  axios.get.mockResolvedValue({ data: { precio: 1000 } });

  // 3. Ejecutamos la función
  const precio = await obtenerPrecioDolar();

  // 4. Aserciones
  expect(precio).toBe(1000);
  // Podemos incluso afirmar que axios.get fue llamado con la URL correcta
  expect(axios.get).toHaveBeenCalledWith('https://banco.com/api/dolar');
});
```

Con los Mocks (`jest.fn()` o `jest.mock()`), tomas el control absoluto del universo. Puedes forzar que las dependencias devuelvan éxito, o forzar que fallen para ver cómo tu código maneja los errores, todo de forma instantánea y sin tocar el mundo real exterior.
