# Módulo 4: Persistencia y Volúmenes

## El Problema: La Naturaleza Efímera de los Contenedores

Si has seguido los módulos anteriores, has aprendido a correr una base de datos PostgreSQL usando un contenedor y Docker Compose. Has creado tablas, insertado usuarios y todo funciona de maravilla. 
Al final del día, decides apagar y limpiar tu entorno de desarrollo corriendo el elegante comando `docker-compose down`.

Al día siguiente, corres `docker-compose up` para volver al trabajo. Tu aplicación Node.js arranca, tu base de datos se inicia en milisegundos, intentas iniciar sesión y... **error: Usuario no encontrado**. 
Revisas la base de datos y todas las tablas están vacías. ¿Qué sucedió?

Acabas de experimentar la **naturaleza efímera** de los contenedores.
Como aprendimos en el Módulo 1, cuando se destruye un contenedor (`rm` o `down`), la capa de lectura/escritura superior asociada a él (donde la base de datos escribía la información en disco) **se destruye y se elimina permanentemente**. 
Al levantar el sistema de nuevo con `up`, Docker crea un contenedor totalmente virgen a partir de la imagen estática.

Esta inmutabilidad es maravillosa para una API sin estado (Stateless), pero es un desastre para una Base de Datos (Stateful). Para solucionar esto y guardar datos permanentemente fuera del ciclo de vida del contenedor, Docker inventó los **Volúmenes (Volumes)**.

---

## ¿Qué son los Volúmenes?

Un **Volumen** en Docker es un mecanismo para persistir datos. Conceptualmente, es un túnel, puente o agujero de gusano.

Lo que hace Docker es tomar una carpeta específica **dentro** del contenedor (por ejemplo, `/var/lib/postgresql/data`, donde Postgres guarda físicamente sus tablas) y conectarla directamente con una carpeta **fuera** del contenedor, en el disco duro físico de tu computadora real (el Host).

Al establecer este puente, cuando el motor de base de datos Postgres (que vive dentro del contenedor) intenta escribir un dato en su disco duro interno, el puente redirige esa escritura (bypasseando el sistema de archivos del contenedor) y escribe los bytes **directamente en el disco duro de tu PC**.

Dado que los archivos ahora viven en tu computadora física, cuando haces un `docker-compose down` y el contenedor se vaporiza en el aire, **los archivos de base de datos se mantienen intactos y seguros en tu disco**. Cuando haces `up` de nuevo, Docker conecta el puente nuevamente y el contenedor virgen encuentra los archivos donde el contenedor anterior los dejó.

Existen dos tipos principales de volúmenes, cada uno con propósitos muy distintos: **Volúmenes Nombrados (Named Volumes)** y **Bind Mounts**.

---

## Volúmenes Nombrados (Named Volumes)

Son la opción preferida y recomendada por Docker para persistir datos de aplicaciones (como bases de datos).

Con los Volúmenes Nombrados, tú simplemente le dices a Docker: *"Crea un cajón con este nombre, no me importa dónde lo guardes en mi disco duro físico, tú encárgate de administrarlo. Solo asegúrate de conectar ese cajón a esta ruta dentro del contenedor"*.
Docker guardará estos datos en un área del sistema de archivos de tu PC fuertemente protegida y aislada, donde otros procesos no pueden interferir accidentalmente.

### Cómo usarlos en Docker Compose
Para declarar Volúmenes Nombrados en `docker-compose.yml`, debes usar la sintaxis `volumes:` en dos lugares: a nivel superior (para decirle a Compose que cree el volumen) y a nivel de servicio (para hacer el túnel).

```yaml
services:
  db:
    image: postgres:15
    volumes:
      - mi_volumen_postgres:/var/lib/postgresql/data # "Nombre_Tuyo : Ruta_Interna"
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: mysecretpassword

volumes:
  mi_volumen_postgres: # Aquí declaras formalmente la existencia del volumen
```

Ahora, no importa cuántas veces hagas `docker-compose down` o borres contenedores; el volumen `mi_volumen_postgres` (y tus usuarios guardados) permanecerán intactos en tu computadora esperando ser reutilizados.

---

## Bind Mounts (Montajes de Enlace)

A diferencia de los volúmenes administrados por Docker, con un **Bind Mount** tú tienes el control absoluto. En lugar de pedirle a Docker que asigne un espacio secreto, tú le dices: *"Toma exactamente **ESTA** carpeta de mi computadora (ej. `C:/MisProyectos/Frontend`) y métela a la fuerza dentro del contenedor en la ruta `/usr/src/app`"*.

### ¿Para qué se utilizan los Bind Mounts?
El caso de uso rey de los Bind Mounts es **el desarrollo local con Hot-Reloading**.
Imagina que estás programando una app en React dentro de un contenedor. Si usas el comando `COPY . .` del Dockerfile, tu código fuente se pega dentro de la imagen estática. Si cambias el color de un botón en tu editor de código (VSCode), el contenedor no se enterará, porque él está usando el código muerto que le pegaste al construir la imagen. Tendrías que destruir el contenedor, reconstruir la imagen (`build`), y volver a levantar el contenedor para ver el botón de otro color. Eso toma minutos por cada cambio de línea.

¡El **Bind Mount** soluciona esto! Al enlazar la carpeta de tu código fuente en VSCode con la carpeta interna del contenedor, estableces una conexión de doble vía. Si tú editas `index.js` en VSCode, el archivo cambia instantáneamente dentro del contenedor en ejecución. Herramientas como Vite o Nodemon detectan el cambio en vivo y recargan tu aplicación en milisegundos.

### Cómo usarlos en Docker Compose
La sintaxis es similar, pero en la parte izquierda pones una ruta de tu computadora local (usualmente `./` que significa "el directorio actual") en lugar del nombre de un volumen. ¡Y no necesitas declararlos en la sección raíz de `volumes`!

```yaml
services:
  frontend_react:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - ./:/usr/src/app # "Ruta_de_tu_PC : Ruta_Interna"
      - /usr/src/app/node_modules # (Truco: Volumen anónimo para proteger node_modules)
```
*El segundo elemento en la lista es un truco avanzado: un volumen anónimo. Sirve para decirle a Docker que sincronice todo tu código de tu computadora, EXCEPTO la carpeta `node_modules` interna del contenedor, protegiéndola de ser sobreescrita por tu sistema anfitrión.*

---

## Administración de Volúmenes (CLI)

Dado que los volúmenes están diseñados explícitamente para sobrevivir a la muerte de un contenedor, pueden llegar a convertirse en un problema de espacio en el disco si no tienes cuidado (imagina decenas de bases de datos persistidas de proyectos viejos ocupando gigabytes).

Es importante saber cómo administrar esta "basura" persistente con el Docker CLI.

1. **Listar volúmenes:** 
Para ver todos los volúmenes que existen en las entrañas de tu Docker local:
`docker volume ls`

2. **Inspeccionar volúmenes:**
Para descubrir exactamente en qué oscura carpeta de tu disco duro físico (generalmente `/var/lib/docker/volumes/...`) Docker está guardando los archivos de un volumen nombrado:
`docker volume inspect <nombre_del_volumen>`

3. **La Escoba (Prune):**
Eventualmente, tendrás muchos volúmenes de proyectos que ya abandonaste y contenedores que ya borraste. Estos volúmenes huérfanos se llaman *Dangling Volumes*. Para limpiar todo el espacio en disco eliminando los volúmenes que NO están conectados a ningún contenedor activo, usa:
`docker volume prune` (Este comando te pedirá confirmación porque los datos borrados no se pueden recuperar).

### Destrucción total con Compose
Si estás seguro de que quieres borrar un proyecto por completo (Contenedores, Redes, y **también borrar la base de datos y sus volúmenes asociados**), Docker Compose tiene una bandera agresiva especial para el comando down:
`docker-compose down -v` (La `v` es de Volumes).
Esto arrasará con todo el ecosistema del proyecto y la próxima vez que hagas `up`, empezarás desde cero absoluto.

---

## Conclusiones del Curso

¡Has llegado al final del curso básico de Docker!
Hagamos un resumen mental de todo el conocimiento fundamental que has adquirido:

1. **Imágenes vs Contenedores:** Entiendes que la imagen es la plantilla inmutable de solo lectura (la Clase) y el contenedor es la instancia viva con capa de escritura (el Objeto).
2. **Ciclo de Vida:** Sabes encender (`run`), pausar, apagar (`stop`) y destruir (`rm`) entidades para ahorrar memoria RAM de tu sistema.
3. **Dockerfiles:** Sabes cocinar tus propias imágenes escribiendo instrucciones de forma eficiente (usando cachés óptimos y *Multi-stage builds* para achicar su tamaño).
4. **Docker Compose:** Ya no corres comandos gigantes en la terminal. Usas archivos de infraestructura como código (YAML) para levantar un clúster entero de servicios (APIs + Bases de datos) que hablan entre sí a través de DNS privado.
5. **Persistencia:** Dominas los Volúmenes Nombrados para salvar los datos de tu base de datos cuando el sistema se apaga, y usas Bind Mounts para desarrollar con Hot-Reloading sin compilar a cada rato.

Con estos conceptos interiorizados, ya posees el Estándar de Programador moderno. Puedes clonar un repositorio gigantesco de tu trabajo, y con un simple `docker-compose up -d`, estarás desarrollando en un ambiente local que es una réplica exacta, limpia y milimétrica del servidor de producción. ¡Felicidades!
