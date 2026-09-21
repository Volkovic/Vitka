# Módulo 3: Pruebas End-to-End (Cypress)

## La Cima de la Pirámide: ¿Para qué E2E?

En los módulos anteriores usamos Jest y React Testing Library para probar funciones individuales y componentes aislados. Si ambos pasan, ¿por qué molestarnos en hacer pruebas End-to-End (E2E) que son mucho más lentas y difíciles de mantener?

Imagina un auto. Una prueba unitaria valida que la bujía genera chispa. Una prueba de componente valida que al girar la llave, el motor de arranque gira. 
Sin embargo, **ninguna de las dos asegura que el auto pueda llevarte del punto A al punto B**. ¿Qué pasa si el motor funciona, pero alguien olvidó conectar el tanque de gasolina al motor? El auto no andará.

Las Pruebas E2E simulan la experiencia real completa: levantan el frontend (el auto) y el backend (la gasolina) en paralelo. Abren un navegador real automatizado (Chrome o Firefox), navegan a la URL de tu aplicación local, hacen clic en botones como si fueran fantasmas, llenan formularios y validan que el sistema entero (base de datos incluida) se integre a la perfección.

Si una prueba E2E pasa (ejemplo: El flujo de "Añadir producto al carrito y Pagar"), puedes tener un 99.9% de certeza de que tu negocio generará dinero, sin importar cuán sucio o desordenado esté el código por dentro. Son la garantía definitiva de funcionalidad.

---

## Introducción a Cypress

Durante años, la herramienta dominante para pruebas E2E fue *Selenium*. Selenium operaba enviando comandos remotos al navegador desde afuera, lo cual causaba muchos problemas de sincronización (flakiness). Las pruebas fallaban aleatoriamente porque Selenium intentaba hacer clic en un botón que el navegador aún no terminaba de renderizar.

**Cypress** revolucionó el E2E porque su arquitectura es radicalmente diferente: **Cypress se ejecuta directamente DENTRO del mismo ciclo de ejecución de tu aplicación en el navegador**.
- Tiene acceso nativo absoluto a todo: DOM, localStorage, cookies, e incluso al objeto `window` de tu aplicación.
- Conoce el tráfico de red. Sabe exactamente cuándo tu aplicación hizo un fetch y cuándo recibió la respuesta, por lo que **espera automáticamente** sin que tengas que programar tediosos `setTimeout()` o comandos de espera manual.
- Su interfaz gráfica de desarrollo ("Time Travel") te permite retroceder paso por paso viendo un video exacto de cómo lucía tu aplicación en cada milisegundo de la prueba.

---

## Escribiendo tu primera prueba E2E

La sintaxis de Cypress te será muy familiar porque, bajo el capó, utiliza Mocha (similar al `describe` e `it` de Jest) y aserciones de Chai. Sin embargo, su API principal está encadenada a través del objeto global **`cy`**.

A diferencia de React Testing Library (donde tenías que dibujar un componente), en Cypress lo primero que haces es decirle al navegador automatizado que navegue a la URL donde está corriendo tu aplicación.

```javascript
// cypress/e2e/login.cy.js

describe('Flujo de Inicio de Sesión', () => {
  it('Debería loguear al usuario exitosamente y redirigirlo al dashboard', () => {
    // 1. Navegación real
    cy.visit('http://localhost:5173/login');

    // Cypress espera automáticamente a que la página cargue.
    // 2. Buscamos elementos en el DOM y asertamos que existen
    cy.get('h1').should('contain', 'Bienvenido');
  });
});
```

En Cypress, la filosofía de selección de elementos (`cy.get`) está muy orientada a selectores CSS convencionales (clases, IDs, etiquetas). Sin embargo, las mejores prácticas recomiendan agregar atributos `data-cy="boton-submit"` a tus elementos HTML críticos para que las pruebas E2E no se rompan si un diseñador cambia el color o la clase CSS de un botón.

---

## Interacción y Aserciones Encadenadas

Una vez que obtienes un elemento con `cy.get()`, puedes encadenarle acciones humanas (`click`, `type`, `clear`) y aserciones (`should`, `and`).
La fluidez del encadenamiento en Cypress hace que leer una prueba parezca lenguaje natural.

```javascript
describe('Flujo de Inicio de Sesión', () => {
  it('Muestra error si la contraseña es incorrecta', () => {
    cy.visit('/login'); // Usando baseUrl configurada

    // Llenamos el formulario
    cy.get('[data-cy="input-email"]')
      .type('usuario@test.com')
      .should('have.value', 'usuario@test.com'); // Aserción inline

    cy.get('[data-cy="input-password"]')
      .type('contrasenaFalsa');

    cy.get('[data-cy="btn-login"]')
      .click();

    // Validamos la reacción del sistema
    cy.get('[data-cy="mensaje-error"]')
      .should('be.visible')
      .and('contain', 'Credenciales incorrectas');
  });
});
```
*Magia de Cypress:* Cuando haces el `.click()`, Cypress verifica automáticamente que el botón no esté cubierto por otro elemento, que no esté deshabilitado, y que no se esté animando antes de pulsarlo, imitando perfectamente la frustración de un usuario real.

---

## Intercepción de Red (El Poder de cy.intercept)

Aquí radica el poder más avanzado de Cypress. Aunque estamos haciendo pruebas End-to-End, no siempre queremos golpear el backend real en producción (o en el entorno de pruebas, si la prueba requiere crear 50 usuarios basura y enviarles correos de verificación reales).

Cypress vive dentro del navegador, por lo que tiene el poder divino de interceptar cualquier petición HTTP (fetch/XHR) que tu código frontend intente hacer hacia el servidor backend, y puede modificar la respuesta a su antojo.

```javascript
it('Muestra el listado de productos de forma resiliente', () => {
  // 1. Interceptamos la petición ANTES de que el frontend la haga
  // 'GET' a la ruta '/api/productos'
  // Le decimos a Cypress: "Bloquea esto y devuélvele a mi frontend este archivo JSON falso (fixture)"
  cy.intercept('GET', '/api/productos', { fixture: 'productosFalsos.json' }).as('getProducts');

  // 2. Navegamos a la página
  cy.visit('/tienda');

  // 3. Le decimos a Cypress: "Espera a que esa petición de red ocurra y termine"
  cy.wait('@getProducts');

  // 4. Asertamos en la pantalla. Nuestro frontend jamás supo que el backend fue simulado.
  cy.get('[data-cy="producto-card"]').should('have.length', 2);
});
```

`cy.intercept` permite probar casos críticos (como un error 500 del servidor) sin tener que destruir tu servidor real para simularlo. Puedes forzar deliberadamente a la API a devolver un Error 500 y verificar que tu frontend muestre un mensaje de "Intente más tarde" agradable en lugar de crashear.

---

## Conclusiones sobre la Pirámide de Testing

Has aprendido las herramientas para coronar la Pirámide de Testing. Pero un gran poder conlleva una gran responsabilidad.

Las pruebas de Cypress son tentadoras porque escribes unas pocas líneas y pruebas todo el sistema. Sin embargo, no olvides la Pirámide:
- **Son Lentas:** Una prueba unitaria en Jest toma 5 milisegundos. Levantar un navegador en Cypress toma 5 segundos completos (1000 veces más lento). Si escribes todo tu testing en Cypress, tu pipeline de CI/CD del módulo anterior tardará 45 minutos en correr cada vez que alguien haga push de un commit.
- **Son Frágiles:** Dependen de la red, tiempos de renderizado, animaciones complejas, y de que el backend funcione.

**El Estándar Profesional:**
1. Escribe el 70-80% de tus pruebas en **Jest/React Testing Library**. Todo estado interno, cálculo lógico, condicional, y renderizado de componentes básicos debe estar protegido allí, porque corren en milisegundos.
2. Escribe un puñado estratégico (10-20%) de pruebas en **Cypress** para los llamados *Happy Paths* o Flujos Críticos de Negocio (ej. "Un usuario puede registrarse, elegir un producto y meter su tarjeta de crédito exitosamente"). 

Con esta mezcla, obtienes lo mejor de ambos mundos: la velocidad ultra rápida para el desarrollador en el día a día, y la garantía antibalas en la nube de que la aplicación realmente le funciona al usuario final.
