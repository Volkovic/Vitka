# Módulo 3: Patrones de Diseño Comunes

## ¿Qué son los Patrones de Diseño?

A medida que los pioneros de la informática construían sistemas de software cada vez más grandes, notaron algo interesante: **se enfrentaban a los mismos problemas de diseño una y otra vez**, sin importar el lenguaje de programación que usaran. 

En 1994, cuatro ingenieros (conocidos históricamente como el *Gang of Four* o la Banda de los Cuatro) publicaron el libro definitivo "Design Patterns". En él, catalogaron 23 soluciones estandarizadas, probadas y óptimas para estos problemas recurrentes. 

Un **Patrón de Diseño** no es un trozo de código que puedes copiar y pegar. Es una plantilla conceptual, una estrategia genérica para resolver un problema arquitectónico específico. 

Están divididos en tres categorías principales:
1. **Creacionales:** Solucionan el problema de cómo crear instancias (objetos) de forma segura y flexible.
2. **Estructurales:** Solucionan el problema de cómo ensamblar objetos y clases grandes para que trabajen juntos.
3. **De Comportamiento:** Solucionan el problema de cómo se comunican y delegan responsabilidades los objetos entre sí.

En este módulo no veremos los 23 patrones (algunos han envejecido mal o son exclusivos de lenguajes como Java), pero analizaremos los cuatro más vitales en el ecosistema de JavaScript y desarrollo web moderno.

---

## El Patrón Factory (Creacional)

Imagina que estás programando un videojuego y necesitas crear cientos de monstruos enemigos.
Podrías instanciar cada enemigo manualmente usando `new Monstruo()`. Pero ¿qué pasa si el tipo de enemigo (Orco, Goblin, Dragón) depende de en qué nivel del juego esté el jugador? Tu código se llenaría de bloques `if/else` repartidos por todas partes.

El patrón **Factory Method (Fábrica)** resuelve esto extrayendo y encapsulando toda la lógica de creación de objetos en un solo lugar (una "fábrica").

```javascript
// La Fábrica
class EnemigoFactory {
  static crearEnemigo(nivel) {
    if (nivel === 1) return new Goblin();
    if (nivel === 2) return new Orco();
    if (nivel === 3) return new Dragon();
    throw new Error('Nivel desconocido');
  }
}

// El Cliente que usa la fábrica (limpio y sin saber los detalles sucios)
const enemigoActual = EnemigoFactory.crearEnemigo(nivelActual);
enemigoActual.atacar();
```

El cliente no sabe cómo se construyó el Goblin, ni qué parámetros requirió su constructor. Solo le pide a la fábrica el producto terminado. Si mañana decides cambiar el constructor del Goblin añadiéndole más vida, solo debes tocar la clase Factory, y el resto del código del juego permanecerá intacto (cumpliendo el principio Open/Closed de S.O.L.I.D.).

---

## El Patrón Singleton (Creacional y Anti-Patrón)

El **Singleton** es probablemente el patrón más famoso, pero también el más polémico y peligroso si se abusa de él.

El propósito del Singleton es **garantizar que una clase tenga única y exclusivamente UNA sola instancia global en toda la aplicación**, y proporcionar un punto de acceso universal a ella.

El caso de uso clásico es la conexión a la base de datos o el registro de configuraciones. No quieres que cada parte de tu código abra una nueva conexión a MongoDB y sature el servidor. Quieres que todas las partes del código usen exactamente la misma conexión compartida.

```javascript
class BaseDeDatos {
  constructor() {
    if (BaseDeDatos.instancia) {
      // Si ya existe una, bloqueamos la creación de una nueva
      return BaseDeDatos.instancia;
    }
    this.conexion = this.conectarServer();
    BaseDeDatos.instancia = this; // Guardamos la única copia
  }
}

// No importa cuántas veces hagas "new", siempre recibirás el mismo objeto.
const db1 = new BaseDeDatos();
const db2 = new BaseDeDatos();
console.log(db1 === db2); // true
```

**¿Por qué se le considera un Anti-Patrón hoy en día?**
Porque en esencia, un Singleton es una variable global glorificada. Si múltiples archivos pueden acceder y modificar el estado de un Singleton, se vuelve extremadamente difícil rastrear qué parte del código causó un error (violando el aislamiento necesario para Pruebas Unitarias). Debe usarse con extrema moderación.

---

## El Patrón Observer (Comportamiento)

Este es posiblemente **el patrón más fundamental para entender el desarrollo Frontend moderno** (React, Vue, RxJS).

El patrón **Observer (Observador)**, también conocido como Publicador/Suscriptor (Pub/Sub), resuelve un problema crítico: ¿Cómo hacemos que múltiples objetos se enteren de que algo acaba de cambiar, sin que tengan que estar preguntando "¿Ya cambiaste? ¿Ya cambiaste?" en un bucle infinito?

El patrón define una relación de uno-a-muchos. Tienes un "Sujeto" (el que tiene los datos) y múltiples "Observadores" (los interesados). 
Los observadores se *suscriben* al Sujeto. Cuando el Sujeto cambia su estado interno, automáticamente notifica (dispara una alerta) a todos sus suscriptores para que reaccionen.

**Ejemplo en JavaScript puro (DOM):**
Cuando usas `document.getElementById('btn').addEventListener('click', miFuncion)`, estás usando el patrón Observer. El botón es el Sujeto, y `miFuncion` es el observador.

**Ejemplo en React:**
Cualquier gestor de estado global (Zustand, Redux, o el React Context API) es el patrón Observer encubierto. Tienes una "Store" central de datos. Tus componentes se "suscriben" a esa store. Cuando el dato cambia, la store notifica automáticamente a los componentes precisos, provocando que se re-rendericen en pantalla.

---

## El Patrón Adapter (Estructural)

En la vida real, si viajas de América a Europa, tu cargador de laptop no encajará en el enchufe de la pared por diferencias de voltaje y forma geométrica. ¿La solución? Compras un **Adaptador**. El adaptador envuelve tu cargador, traduce la energía, y te permite usar un enchufe incompatible sin tener que desarmar y modificar tu laptop.

El patrón **Adapter (Adaptador)** hace exactamente lo mismo en software: permite que objetos con interfaces incompatibles colaboren entre sí.

Imagina que tu aplicación tiene años usando una vieja librería de mapas (`GoogleMapsApiVieja`) que dibuja marcadores con el método `.pintarPunto(x, y)`.
Tu jefe decide que Google es muy caro y compra una nueva librería (`MapboxModerna`), pero esta nueva librería funciona con el método `.drawMarker({ lat, lng })`.

Si cambias de librería, tendrías que ir a los 50 archivos de tu proyecto y reescribir manualmente cada llamada. ¡Un infierno!

La solución limpia es crear una clase Adaptadora:
```javascript
class MapboxAdaptador {
  constructor() {
    this.mapbox = new MapboxModerna();
  }
  
  // Mantenemos el nombre viejo que toda la app ya usa
  pintarPunto(x, y) {
    // Por dentro, "traducimos" al idioma de la librería nueva
    this.mapbox.drawMarker({ lat: x, lng: y });
  }
}
```
Inyectas este adaptador en tu aplicación y mágicamente todo funciona con la nueva librería sin haber tocado el núcleo de tu código. Eres un héroe de la refactorización.

---

## Patrones de la vieja escuela en el Mundo Moderno

Si vienes de lenguajes como Java o C#, podrías estar acostumbrado a implementar estos patrones con jerarquías de herencia gigantescas. Sin embargo, en JavaScript y React, usamos variaciones modernas (funcionales) de estos patrones clásicos.

- **El patrón "Decorator" (Decorador):** Clásicamente, envuelve un objeto para darle nuevos comportamientos (como las Matryoshkas rusas). En React clásico, esto se implementaba con **Higher-Order Components (HOCs)** (ej. `connect()` de Redux). Hoy en día, hemos evolucionado y usamos **Custom Hooks** para extraer y compartir comportamiento sin envolver elementos visualmente.
- **El patrón "Command":** Consiste en empaquetar una acción y sus parámetros en un objeto para ejecutarla después. Es exactamente lo que hacemos con las "Actions" o los "Thunks" en el ecosistema de Redux.

Conocer el nombre formal de estos patrones de diseño te elevará automáticamente al nivel de programador Semi-Senior/Senior. Ya no dices "hice una función que devuelve componentes dependiendo de un texto"; ahora dices "implementé un Factory Pattern para los componentes". Esto te otorga un vocabulario común y universal para discutir arquitectura de alto nivel con cualquier ingeniero del mundo.
