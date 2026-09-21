# Módulo 3: Orquestación Local (Docker Compose)

## El Límite de los Contenedores Aislados

En los módulos anteriores, aprendimos a crear una imagen de nuestra aplicación y a ejecutarla dentro de un contenedor aislado con comandos como `docker build` y `docker run`. Para pruebas simples, esto es fantástico. Pero en el mundo real, una aplicación casi nunca vive en un vacío.

Piensa en una aplicación moderna (por ejemplo, un clon de Netflix). Esta aplicación no consta de un solo servidor. Requiere:
1. Una API construida en Node.js o Python.
2. Una base de datos relacional (como PostgreSQL) para guardar los perfiles de usuario.
3. Una base de datos en caché (como Redis) para gestionar las sesiones ultrarrápidas.
4. Un frontend web en React o Vue.

Para levantar este ecosistema manualmente en tu computadora usando comandos básicos, tendrías que abrir cuatro terminales distintas, correr cuatro comandos `docker run` masivamente largos, pasándoles decenas de variables de entorno, y cruzar los dedos para que se comuniquen entre ellos correctamente. Además, si quieres apagar todo el proyecto, debes buscar y matar los cuatro contenedores uno por uno.

Este proceso es propenso a errores, tedioso y cero colaborativo. No le puedes pedir a un nuevo desarrollador junior en su primer día de trabajo que se memorice cuatro largos comandos de terminal para poder empezar a programar. Aquí es donde entra **Docker Compose**.

---

## ¿Qué es Docker Compose y la sintaxis YAML?

**Docker Compose** es una herramienta que viene instalada junto con Docker Desktop. Su propósito es definir y orquestar aplicaciones Multi-Contenedor. Con Compose, utilizas un único archivo de configuración para declarar todos los servicios (contenedores) que tu aplicación necesita para funcionar. Luego, con un solo comando, Docker Compose se encarga de crear e iniciar todos esos contenedores en el orden correcto.

El archivo de configuración maestro siempre se nombra `docker-compose.yml`. Emplea la sintaxis **YAML** (Yet Another Markup Language). 
YAML es un formato de serialización de datos diseñado para ser muy legible por humanos. A diferencia de JSON (que usa llaves `{}`), YAML se basa estrictamente en **la indentación (espacios)** para definir la estructura y la jerarquía.

**Anatomía básica de un `docker-compose.yml`:**
Un archivo de Compose suele estar dividido en tres bloques o raíces principales (top-level elements):
1. `services`: (Obligatorio) Aquí declaras cada uno de los contenedores que forman tu aplicación.
2. `volumes`: (Opcional) Aquí declaras espacios de persistencia de datos (lo veremos a fondo en el Módulo 4).
3. `networks`: (Opcional) Aquí declaras redes privadas para aislar el tráfico entre tus contenedores.

---

## Definiendo Servicios en Compose

Vamos a destripar el bloque `services`. Cada "servicio" representa un contenedor. Tú eliges el nombre del servicio (por ejemplo `api`, `base_datos`, `frontend`). 

Dentro de cada servicio, debes decirle a Compose de dónde sacar la Imagen para crear el contenedor. Tienes dos caminos posibles:

### Camino A: Usar una imagen preexistente (`image`)
Si necesitas levantar una base de datos o una herramienta estándar, no vas a compilar su código. Simplemente jalas la imagen oficial de Docker Hub.
```yaml
services:
  db:
    image: postgres:15
    ports:
      - "5432:5432"
```

### Camino B: Construir tu propia imagen (`build`)
Si se trata del código fuente de TU aplicación (del cual tienes un `Dockerfile` al lado), le dices a Compose que primero debe compilar la imagen localmente antes de ejecutarla.
```yaml
services:
  mi_api:
    build: . # Busca un Dockerfile en este mismo directorio
    ports:
      - "3000:3000"
```

El bloque `ports` hace exactamente lo mismo que la bandera `-p` en la terminal. Mapea `PUERTO_DE_TU_PC : PUERTO_DEL_CONTENEDOR`.

---

## Variables de Entorno en Docker Compose

Las bases de datos y APIs modernas son altamente configurables a través de variables de entorno. En la terminal (docker run), pasarlas una por una con la bandera `-e` es un dolor de cabeza. Compose lo simplifica enormemente usando la llave `environment`.

```yaml
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: mysecretpassword
      POSTGRES_DB: netflix_clone
```

### Inyectando archivos `.env` (La forma segura)
Escribir contraseñas directamente en el `docker-compose.yml` es una **pésima práctica de seguridad**, ya que ese archivo se subirá a tu repositorio de GitHub para que el resto del equipo lo comparta.
La forma profesional de hacerlo es utilizar el bloque `env_file`. Compose leerá un archivo `.env` que tengas en tu directorio local (el cual debe estar en tu `.gitignore`) y le pasará todas sus variables directamente al contenedor.

```yaml
services:
  mi_api:
    build: .
    env_file:
      - .env
```
De esta manera, el código de infraestructura (Compose) queda limpio, compartido y seguro, mientras que los secretos permanecen locales en el ordenador de cada desarrollador.

---

## Redes Internas y DNS (El Superpoder de Compose)

Este es, indiscutiblemente, el superpoder más grande de Docker Compose: **La Resolución DNS Mágica Interna.**

Cuando levantas tu cluster de contenedores con Compose, este crea automáticamente una **Red Privada Virtual (Bridge Network)** compartida. Todos los servicios definidos en el archivo se conectan automáticamente a esa red.

¿Por qué es esto increíble? Porque dentro de esa red privada interna, **el nombre del servicio actúa como el dominio (URL) para conectarse a él**. 
No necesitas saber la IP aleatoria que Docker le asignó al contenedor de PostgreSQL. Si tu servicio en el YAML se llama `db`, tu contenedor de la API (Node.js/Python) simplemente se conecta a la base de datos apuntando al host o URL: `db`. El router interno de Docker traducirá la palabra "db" a la IP correcta por detrás de escena.

### Seguridad Extrema (Ocultar Puertos)
Gracias a esta red interna, tus microservicios pueden hablar entre sí libremente. Por esto mismo, **no es necesario, ni recomendable, mapear los puertos de tus bases de datos hacia fuera de tu computadora**, a menos que necesites usar un programa visual (como DBeaver o DataGrip) para inspeccionarla.

Si no declaras la sección `ports` en el servicio `db`, la base de datos estará **invisible y blindada** desde el exterior (tu máquina host o el internet abierto), pero la API (que sí está dentro de la red privada de Compose) podrá seguir hablando con ella a través del puerto 5432 sin problema.

---

## El Flujo de Trabajo (La Magia de un solo clic)

Una vez que has creado tu `docker-compose.yml`, toda la complejidad de orquestar múltiples servicios se reduce a tres comandos simples que revolucionarán la forma en la que trabajas.

### 1. Iniciar la Orquesta (`docker-compose up`)
Abre tu terminal en la carpeta donde está tu YAML y ejecuta:
`docker-compose up`

¿Qué hará Docker Compose?
- Leerá el YAML de arriba a abajo.
- Si hay servicios con `build: .`, ejecutará tu Dockerfile para compilar las imágenes frescas.
- Creará la red privada para el proyecto.
- Lanzará los contenedores.
Al igual que `docker run`, si quieres que esto corra de fondo sin secuestrar tu terminal, usa la bandera desvinculada: `docker-compose up -d`.

### 2. Monitorear (`docker-compose ps` y `logs`)
Para ver el estado de los contenedores de este proyecto en específico, ejecuta:
`docker-compose ps`
Para ver los logs (la salida de texto) combinados de todos los contenedores al mismo tiempo (muy útil para cazar errores de comunicación entre la API y la DB):
`docker-compose logs -f` (La bandera `-f` significa 'follow', para ver los nuevos logs en tiempo real).

### 3. Apagar y Destruir (`docker-compose down`)
Cuando termine tu día de trabajo, ya no tienes que matar contenedor por contenedor. Simplemente ejecuta:
`docker-compose down`
Esto es extremadamente elegante. Compose detiene gracefuly (con gracia) todos los servicios, los destruye para liberar espacio en el sistema, e incluso destruye la red virtual que había creado. Tu sistema queda tan limpio como si nada hubiera sucedido.

¡Felicidades! Has dominado el pilar del flujo de trabajo moderno para desarrolladores locales. En el próximo módulo, descubriremos el gran problema del comando `down`: ¿qué sucede con los datos guardados en la base de datos cuando los contenedores se destruyen? Ahí es donde entran los **Volúmenes**.
