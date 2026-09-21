# Módulo 4: Clean Architecture / Arquitectura Hexagonal

## El Problema de las Arquitecturas Tradicionales (MVC)

Durante muchos años, el estándar de la industria para construir aplicaciones web fue el patrón MVC (Modelo-Vista-Controlador). Bajo este esquema, ponías tu código de base de datos en la carpeta `Models`, tu HTML/React en `Views`, y tu lógica mezclada en `Controllers`.

El problema fatal de este enfoque clásico surge a los pocos años de vida del proyecto. La lógica de negocio más importante (ej. "Cómo se calculan los impuestos de una factura") termina fuertemente acoplada a la tecnología de la base de datos (ej. métodos propios de Mongoose/MongoDB) y a la tecnología del framework web (ej. el objeto `req` y `res` de Express.js).

Si el día de mañana la empresa decide migrar la base de datos de MongoDB a PostgreSQL, o cambiar el framework de Express a NestJS, **tienen que reescribir prácticamente toda la aplicación**, porque la lógica de negocio pura está enredada y contaminada con código técnico de terceros.

El objetivo de las Arquitecturas Limpias es construir sistemas donde **la tecnología sea un detalle, no el corazón del sistema**.

---

## El Centro del Universo: El Dominio

Las **Arquitecturas Limpias** (Clean Architecture de Robert C. Martin) y la **Arquitectura Hexagonal** (de Alistair Cockburn) comparten la misma filosofía central: organizan el software en capas circulares como una cebolla.

La regla de oro de la cebolla es **La Regla de Dependencia**: Las capas externas pueden conocer (depender de) las capas internas, pero *las capas internas jamás deben saber que existen las capas externas*.

En el centro absoluto de la cebolla se encuentra el **Dominio (Entities)**. 
El Dominio representa la esencia de tu negocio. Si estás programando para un Banco, tus entidades son "Cuenta Bancaria", "Préstamo", "Transferencia".
El código de tu Dominio debe ser TypeScript puro (o JavaScript puro). **No puede importar absolutamente ninguna librería externa** (nada de React, nada de Express, nada de SQL, ni siquiera dependencias de validación pesadas).
Debe ser capaz de correr en una terminal de Node, en el navegador o en el motor V8 puro sin romperse.

*¿Por qué?* Porque los frameworks web vienen y van cada 5 años (Angular a React a Svelte), pero las reglas de negocio de un banco no cambian. El centro de la cebolla debe ser inmortal.

---

## La Segunda Capa: Casos de Uso (Use Cases)

Envolviendo al Dominio puro, tenemos la capa de **Aplicación o Casos de Uso**.

Los Casos de Uso orquestan las acciones del sistema. Por ejemplo: `CrearUsuario`, `ProcesarPago`, `ListarFacturasPendientes`.
Un Caso de Uso recibe los datos del exterior, le pide al Dominio que ejecute sus reglas matemáticas y luego le ordena al exterior que guarde los resultados.

**¡Atención aquí!** Según la regla de dependencia, la capa de Casos de Uso no puede saber qué base de datos usas. No puede hacer un `import mongoose`. 
¿Cómo puede un Caso de Uso ordenar que se guarde un usuario si no conoce la base de datos?
Aquí es donde aplicamos la letra "D" de S.O.L.I.D. (El Principio de Inversión de Dependencias).

El Caso de Uso declara una **Interfaz** genérica que dice: *"Yo necesito recibir por parámetro un objeto que tenga la función `guardar()`. No me importa quién sea ese objeto"*. Esto se conoce como un **Puerto (Port)** en la Arquitectura Hexagonal.

```typescript
// Capa de Casos de Uso (Pura, sin saber de SQL o Mongo)
class CrearUsuarioUseCase {
  constructor(repositorioUsuarios) { // Inyección de dependencia (Puerto)
    this.repo = repositorioUsuarios;
  }
  
  ejecutar(datos) {
    const usuarioNuevo = new Usuario(datos); // Entidad pura
    this.repo.guardar(usuarioNuevo); // Llama al método genérico
  }
}
```

---

## La Capa Externa: Infraestructura (Adaptadores)

Finalmente, llegamos a la corteza de la cebolla, el exterior del hexágono: **La Infraestructura**.

Aquí es donde vive toda la "suciedad" técnica que al Dominio no le importa. Aquí vive React, Vue, Express, las llamadas a la API de Stripe, los archivos locales, y por supuesto, la base de datos real (MongoDB, PostgreSQL).

En esta capa, nosotros construimos **Adaptadores (Adapters)** para que la tecnología sucia se enchufe a los "Puertos" limpios que definió nuestra capa de Casos de Uso.

Por ejemplo, creamos un archivo `MongoUsuarioRepository.ts` que implementa la función `.guardar()`.
```typescript
// Capa de Infraestructura (Sucia, conoce MongoDB)
import UserModel from './mongoModel';

class MongoUsuarioRepository {
  guardar(usuario) {
    UserModel.create(usuario); // Llama a la BD real
  }
}
```

Es solo en el último milisegundo, en un archivo principal (`index.ts` o `main.ts` llamado el **Compositor (Wiring)**), donde juntamos el mundo sucio con el mundo limpio:

```typescript
// Archivo de inicio (Main)
const repositorioMongo = new MongoUsuarioRepository();
// ¡Inyectamos el adaptador sucio en el caso de uso limpio!
const crearUsuario = new CrearUsuarioUseCase(repositorioMongo); 

// Si mañana cambias a Postgres, solo cambias la primera línea. El UseCase queda intacto.
```

---

## ¿Debo usar esto en todos mis proyectos?

Este es el gran debate de los desarrolladores Semi-Seniors cuando descubren la Arquitectura Limpia por primera vez: se enamoran e intentan aplicarla para hacer un simple "To-Do List". Eso es un gravísimo error.

La Clean Architecture, las interfaces, las inyecciones de dependencia y las 3 capas, añaden una **cantidad gigantesca de archivos y código repetitivo (Boilerplate)** a tu proyecto. Si aplicas Arquitectura Hexagonal a una aplicación pequeña (como un blog simple o un MVP para ver si tu idea funciona), matarás la velocidad de tu equipo y fracasarás por "Sobre-Ingeniería" (Over-engineering).

**La Regla del Pulgar Pragmática:**
1. **Para Startups rápidas, MVPs y aplicaciones pequeñas (CRUDs simples):** Usa MVC clásico, un buen framework como Next.js o NestJS, y no te preocupes si la lógica se mezcla un poco. La prioridad es salir al mercado rápido.
2. **Para Sistemas Core (Bancarios, Salud, ERPs masivos):** Donde el proyecto tiene cientos de casos de uso complejos, vivirá por más de 10 años, y la empresa gastará millones manteniéndolo. Aquí la Arquitectura Limpia y el DDD (Domain Driven Design) no son un lujo, son obligatorios para la supervivencia.

---

## Conclusión Final del Curso

Felicidades. Has completado el curso más abstracto y valioso para un programador profesional.
La **Sintaxis** de un lenguaje la puede aprender cualquiera (o pedirle a una Inteligencia Artificial que la escriba). La **Arquitectura** es lo que separa a un Junior de un Arquitecto de Software.

Repaso de los superpoderes que adquiriste:
1. **Clean Code:** Sabes que un código de calidad se lee como un buen libro (variables expresivas, funciones enanas, y sin la necesidad de comentarios mentirosos).
2. **S.O.L.I.D.:** Conoces las 5 reglas para que tus clases toleren los cambios del futuro (Especialmente OCP y DIP).
3. **Patrones de Diseño:** Ahora posees un vocabulario universal (Observer, Factory, Adapter, Singleton) para solucionar problemas recurrentes de ingeniería.
4. **Clean Architecture:** Entiendes que el código de negocio (El Dominio) es un Rey Inmortal que jamás debe ensuciarse sus manos con herramientas plebeyas (Frameworks o Bases de datos), delegando ese trabajo a los Adaptadores en la frontera del sistema.

Con este criterio estructural, tu código no solo "funcionará", sino que sobrevivirá el paso del tiempo, y cualquier equipo estará honrado de mantenerlo. ¡Estás listo para diseñar sistemas a escala empresarial!
