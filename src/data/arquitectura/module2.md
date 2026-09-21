# Módulo 2: Principios S.O.L.I.D.

## Introducción a S.O.L.I.D.

Escribir funciones pequeñas (Clean Code) es un gran primer paso. Pero a medida que la aplicación escala a cientos de archivos y clases, necesitas reglas arquitectónicas para saber cómo conectar todos esos archivos sin crear un espagueti inmanejable.

Aquí es donde entran los principios **S.O.L.I.D.**. 
Acuñados (nuevamente) por Robert C. Martin en los años 2000, representan los cinco principios fundamentales del Diseño Orientado a Objetos (OOP), aunque aplican perfectamente al ecosistema moderno de componentes funcionales en React o módulos en Node.js.

Si dominas SOLID, serás capaz de crear sistemas de software que toleren los cambios a lo largo de los años. Si un cliente pide una nueva funcionalidad enorme, un sistema SOLID te permitirá agregarla creando archivos nuevos, en lugar de tener que modificar y romper el código viejo.

Las letras son un acrónimo de:
- **S**ingle Responsibility Principle
- **O**pen/Closed Principle
- **L**iskov Substitution Principle
- **I**nterface Segregation Principle
- **D**ependency Inversion Principle

---

## [S] Single Responsibility Principle (SRP)

*Principio de Responsabilidad Única:* **"Un módulo o clase debe tener una, y solo una, razón para cambiar."**

Este principio nos dice que una clase no debe ser una navaja suiza que hace de todo. 
Imagina una clase `ReporteEmpleado`. Esta clase obtiene datos de la base de datos, calcula los bonos financieros del empleado y, finalmente, imprime los datos en formato PDF.

Esta clase viola SRP horriblemente porque tiene **tres razones para cambiar**:
1. Si cambia la tecnología de la base de datos (de SQL a MongoDB), hay que modificar esta clase.
2. Si el departamento de finanzas cambia la fórmula matemática del bono, hay que modificar esta clase.
3. Si el diseñador pide que el PDF tenga una fuente distinta, hay que modificar esta clase.

La solución es dividirla en tres clases (o módulos) distintas e independientes: 
Un `EmpleadoRepository` (encargado solo de la DB), un `CalculadoraBonos` (encargado solo de matemáticas) y un `ReportePDFGenerator` (encargado solo de visualización). Ahora, si finanzas cambia la fórmula, sabes exactamente el único archivo que tienes que tocar.

---

## [O] Open/Closed Principle (OCP)

*Principio de Abierto/Cerrado:* **"Las entidades de software deben estar abiertas a la extensión, pero cerradas a la modificación."**

Este es probablemente el principio más importante para construir aplicaciones duraderas. Significa que deberías ser capaz de agregar un nuevo comportamiento a tu aplicación **sin tener que editar el código que ya existe y que ya funciona**.

¿Cómo es esto posible? A través del uso del polimorfismo o interfaces.

Imagina una función que procesa pagos:
```javascript
// Mal diseño (Violación de OCP)
function procesarPago(metodo, cantidad) {
  if (metodo === 'PAYPAL') {
    procesarPaypal(cantidad);
  } else if (metodo === 'STRIPE') {
    procesarStripe(cantidad);
  }
}
```
Si la empresa decide agregar pagos con 'Criptomonedas', estás obligado a abrir este archivo y **modificar** la función añadiendo otro `else if`. Eso es riesgoso, podrías romper los pagos de PayPal por accidente.

```javascript
// Buen diseño (Sigue OCP)
function procesarPago(procesador, cantidad) {
  // 'procesador' es un objeto que debe tener el método .pagar()
  procesador.pagar(cantidad);
}
```
Ahora el código está "Cerrado a la modificación". Si quieres agregar Criptomonedas, solo creas un archivo nuevo con la clase `CryptoProcesador` que implemente `.pagar()`, y se lo pasas a la función original. ¡Agregaste una función inmensa sin tocar el núcleo de tu código!

---

## [L] Liskov Substitution Principle (LSP)

*Principio de Sustitución de Liskov:* **"Los objetos de una clase base deben poder ser sustituidos por objetos de sus clases derivadas sin alterar el funcionamiento del programa."**

Barbara Liskov propuso este principio en 1987. Es una advertencia matemática sobre el mal uso de la Herencia en la programación orientada a objetos.

El ejemplo clásico es el del Cuadrado y el Rectángulo. Matemáticamente, todo cuadrado es un tipo de rectángulo. Podrías verte tentado a hacer que la clase `Cuadrado` herede (extends) de la clase `Rectangulo`.
Pero un `Rectangulo` tiene dos métodos: `setAncho(val)` y `setAlto(val)`. 
Si creas un `Cuadrado` y le haces `setAncho(10)`, para mantener la geometría, su alto también debería forzarse a 10. Si el usuario de tu código no sabe que está lidiando con un Cuadrado (él cree que es un Rectángulo genérico), se llevará una sorpresa desagradable cuando vea que alterar el ancho modificó el alto mágicamente.

El programa colapsará por comportamientos inesperados. La lección: la herencia es peligrosa. No crees clases hijas si estas van a alterar los contratos lógicos o las reglas esperadas por la clase padre. Si tienes dudas, favorece la "Composición" sobre la Herencia.

---

## [I] Interface Segregation Principle (ISP)

*Principio de Segregación de Interfaces:* **"Ningún cliente debe verse forzado a depender de métodos o interfaces que no utiliza."**

Este principio aplica más fuerte en lenguajes fuertemente tipados como TypeScript, C# o Java, donde usas `Interfaces`.
Nos dice que es mil veces mejor tener 10 interfaces pequeñitas y específicas, que tener una única interfaz monstruosa y gorda (God Interface).

Imagina una interfaz `ImpresoraMultifuncional` que obliga a quien la implemente a tener los métodos: `.imprimir()`, `.escanear()`, y `.enviarFax()`.
Si tú compras una impresora barata que solo sabe imprimir, y en tu código intentas implementar esa interfaz, estarás **forzado** a escribir los métodos `.escanear()` y `.enviarFax()` devolviendo errores falsos o vacíos, llenando tu código de basura inútil.

La solución (Segregación) es dividirla en interfaces atómicas: `IImpresora`, `IEscaner`, `IFax`. Así, la impresora barata solo implementa `IImpresora`, y tu código se mantiene limpio y honesto.

---

## [D] Dependency Inversion Principle (DIP)

*Principio de Inversión de Dependencias:* **"Los módulos de alto nivel no deben depender de los módulos de bajo nivel. Ambos deben depender de abstracciones."**

El módulo de alto nivel (tu lógica de negocio, tus reglas, el núcleo de tu app) es lo más importante de tu empresa. El módulo de bajo nivel son los detalles técnicos "sucios" (la base de datos, el framework web, la API de terceros).

Un error común de novatos es hacer que la lógica de negocio requiera (importe) directamente la herramienta de bajo nivel.
Ejemplo: Tu clase `ServicioUsuarios` importa y usa directamente `import mongoose from 'mongoose'` para guardar un usuario. Tu lógica de negocio ahora está "casada" y fuertemente acoplada a MongoDB. Si un día quieres cambiar a PostgreSQL, tendrás que reescribir todo tu núcleo de negocio.

**La Inversión:**
Tu lógica de negocio no debe importar herramientas específicas. Debe importar (o recibir) una "Abstracción" (una Interfaz genérica).
`ServicioUsuarios` debe decir: "Yo necesito un objeto cualquiera que tenga el método `.guardarEnDB(usuario)`. No me importa de qué base de datos viene".

Luego, desde afuera (a esto se le llama **Inyección de Dependencias**), el programador le "inyecta" al `ServicioUsuarios` la clase específica de MongoDB que cumple con ese contrato. El flujo de dependencia se invierte: el detalle sucio depende del contrato dictado por la lógica de negocio. ¡Esto es el pilar absoluto de la Clean Architecture que veremos más adelante!
