# Módulo 1: Fundamentos y Contenedores

## El Problema: "En mi máquina sí funciona"

Bienvenido al curso de Docker. Para entender qué es Docker y por qué revolucionó la industria del desarrollo de software, primero debemos comprender el problema fundamental que vino a resolver.

Durante décadas, los desarrolladores se enfrentaron al infame problema de **"En mi máquina sí funciona"**. Imagina la siguiente situación: 
Desarrollas una aplicación en tu computadora con Windows. Instalas Node.js versión 14, una base de datos PostgreSQL versión 12 y configuras ciertas variables de entorno específicas. Todo funciona de maravilla. 

Luego, le pasas el código a tu compañero de equipo que usa un Mac, o peor aún, intentas desplegar (subir) esa aplicación al servidor de producción que corre Ubuntu Linux. De repente, la aplicación falla. ¿Por qué?
- El servidor tiene Node.js versión 18 (incompatible con tu código).
- Falta instalar una librería del sistema operativo que tú sí tenías.
- Las variables de entorno tienen rutas diferentes.
- La versión de la base de datos es distinta.

El problema real no es tu código, es el **entorno de ejecución**. Las aplicaciones modernas dependen de un ecosistema complejo (sistema operativo, librerías, dependencias, configuraciones) que es muy difícil de replicar exactamente igual en diferentes máquinas.

Docker nace para resolver esto mediante la **Contenerización**.

---

## ¿Qué es Docker y la Contenerización?

**Docker** es una plataforma de código abierto que permite automatizar el despliegue, escalado y manejo de aplicaciones. Lo hace encapsulando la aplicación junto con **todas sus dependencias** (librerías, binarios, configuraciones y el runtime) dentro de un paquete estandarizado llamado **Contenedor** (Container).

La analogía perfecta es el transporte marítimo internacional. Antes de la invención del contenedor de carga estándar (esos grandes rectángulos de metal que vemos en los puertos), transportar mercancías era un caos. Un barco llevaba barriles, cajas de madera de distintos tamaños, sacos, etc. Cargar y descargar era lento y dependía de qué tipo de mercancía fuera.

Cuando se inventó el contenedor estándar de metal, a los barcos, trenes y grúas ya no les importaba qué había adentro (podían ser autos, ropa o comida). Solo les importaba que el contenedor tenía un tamaño estándar y sabían cómo manejarlo.

**Docker hace exactamente esto pero con el software.**
Empaqueta tu aplicación y su entorno en un "contenedor" estándar. A partir de ese momento, a cualquier servidor del mundo solo le importa tener Docker instalado. Si tiene Docker, sabrá cómo ejecutar tu contenedor de forma idéntica, sin importar si es tu laptop personal, un servidor en Amazon Web Services o la computadora de tu compañero de trabajo.

Con Docker, dejas de enviar "solo el código" a producción. Empiezas a enviar **"el código + el entorno exacto donde ese código funciona"**.

---

## Máquinas Virtuales vs Contenedores

Al escuchar que encapsulamos entornos, es normal pensar en **Máquinas Virtuales (VMs)** como VirtualBox o VMWare. Sin embargo, la arquitectura de Docker es fundamentalmente diferente y mucho más eficiente.

### Máquinas Virtuales (VMs)
Una máquina virtual emula un ordenador físico completo. Para funcionar, requiere un software llamado **Hypervisor**, el cual se instala sobre el sistema operativo principal (Host OS).
Sobre este Hypervisor, se instala un **Sistema Operativo Invitado (Guest OS)** completo (Windows, Linux) por cada máquina virtual.
- **Desventajas:** Son pesadas. Cada VM puede pesar Gigabytes porque incluye un sistema operativo entero. Arrancar una VM toma minutos, al igual que encender una computadora real. Además, desperdician recursos (CPU y RAM) manteniendo múltiples sistemas operativos corriendo en paralelo.

### Contenedores (Docker)
Los contenedores tienen un enfoque distinto. En lugar de virtualizar el hardware completo para instalar un nuevo sistema operativo, **virtualizan el sistema operativo a nivel de núcleo (Kernel)**.
Docker utiliza una capa llamada **Docker Engine** que se instala sobre tu sistema operativo principal. Todos los contenedores corren sobre este único Docker Engine y **comparten el Kernel del sistema operativo anfitrión**.

- **Ventajas:** Los contenedores no necesitan instalar un sistema operativo completo. Solo incluyen la aplicación y sus dependencias directas (librerías). Esto hace que un contenedor pese Megabytes en lugar de Gigabytes. Además, como no tienen que arrancar un sistema operativo, un contenedor se inicia en milisegundos. Puedes correr cientos de contenedores en una misma computadora sin agotar sus recursos.

---

## La Arquitectura de Docker

Docker utiliza una arquitectura de **Cliente-Servidor**. Aunque normalmente ejecutas ambos en la misma máquina, es importante entender sus tres componentes principales:

### 1. Docker Daemon (Servidor)
También conocido como `dockerd`. Es el programa que se ejecuta en segundo plano (background) en tu sistema operativo. Es el verdadero cerebro de la operación. Se encarga de escuchar las peticiones (a través de una API REST) y gestionar los objetos fundamentales de Docker: imágenes, contenedores, redes y volúmenes.

### 2. Docker Client (Cliente)
Es la interfaz de línea de comandos (CLI) que usas en tu terminal, invocada al escribir el comando `docker`. Tú nunca interactúas directamente con los contenedores. Tú le escribes comandos al Cliente de Docker (ej. `docker run`), y este cliente se comunica con el Docker Daemon para decirle qué debe hacer. El cliente y el daemon pueden estar en la misma computadora, o el cliente puede conectarse a un daemon en un servidor remoto.

### 3. Docker Registry (Registros)
Es el lugar donde se almacenan las **Imágenes** de Docker. Piensa en ello como un "GitHub para imágenes de Docker". El registro público más famoso y usado por defecto es **Docker Hub** (hub.docker.com). Cuando le dices a Docker que ejecute un contenedor de Node.js o Ubuntu, el Docker Daemon se conecta a Docker Hub, descarga la imagen oficial, y la ejecuta en tu máquina local. También puedes crear registros privados para tu empresa.

---

## Imágenes vs Contenedores

Para dominar Docker, debes grabar a fuego en tu memoria la diferencia entre una **Imagen** y un **Contenedor**. A menudo los principiantes confunden estos términos.

La analogía más exacta proviene de la Programación Orientada a Objetos (POO):
- Una **Imagen** de Docker es como una **Clase** (Class).
- Un **Contenedor** es como una **Instancia** (Objeto) de esa Clase.

### La Imagen (Image)
Una imagen es una plantilla de **solo lectura (read-only)**. Contiene las instrucciones para crear un contenedor. Incluye el sistema de archivos base, el código de la aplicación, las librerías, y la configuración de entorno (por ejemplo, "Ubuntu 22.04 + Node.js 18 + Mi código fuente"). 
Las imágenes son inmutables; una vez creadas, no cambian. Se construyen a través de un archivo de texto llamado `Dockerfile` (que veremos en el próximo módulo). Las imágenes son lo que descargas de Docker Hub.

### El Contenedor (Container)
Un contenedor es la **instancia en ejecución** de una imagen. Si la imagen es el "molde", el contenedor es el pastel horneado.
Al lanzar un contenedor a partir de una imagen, Docker añade una **capa de lectura y escritura (Read-Write layer)** por encima de las capas de solo lectura de la imagen original. Esto significa que dentro de un contenedor en ejecución, puedes crear archivos, modificar bases de datos o instalar cosas, y esos cambios solo vivirán en esa capa específica del contenedor, sin alterar la imagen original.
Si el contenedor se destruye, todos los cambios en esa capa de lectura/escritura se pierden (a menos que usemos Volúmenes, tema del módulo 4). Puedes tener múltiples contenedores ejecutándose simultáneamente basados en la misma imagen exacta.

---

## El Ciclo de Vida de un Contenedor

Un contenedor en Docker no es estático; transita por un ciclo de vida con diferentes estados que puedes controlar mediante el Docker CLI. Comprender estos estados es vital para la administración de servidores y el debugging (depuración).

1. **Created (Creado):** El contenedor ha sido creado a partir de una imagen y su estructura de archivos está lista, pero el proceso interno (la aplicación) aún no ha iniciado. No consume CPU en este punto.
2. **Running (En Ejecución):** El proceso principal del contenedor (definido al crear la imagen) está funcionando. La aplicación está viva, respondiendo peticiones, procesando datos y consumiendo recursos de CPU y RAM. Si el proceso interno se detiene, el contenedor sale de este estado.
3. **Paused (Pausado):** El contenedor y todos sus procesos están congelados (suspendidos en memoria). La aplicación deja de procesar tareas, pero la memoria RAM mantiene el estado actual. Es útil para priorizar temporalmente recursos de la máquina a otros contenedores sin tener que reiniciar los servicios desde cero.
4. **Stopped / Exited (Detenido):** El proceso principal del contenedor terminó, ya sea porque el usuario lo detuvo manualmente, o porque la aplicación finalizó su tarea (o crasheó por un error). El contenedor sigue existiendo en el disco con todos los cambios que se le hicieron en su capa de escritura, pero no está en memoria ni gasta CPU. Puede ser reiniciado en cualquier momento retomando su estado guardado.
5. **Deleted (Eliminado):** El contenedor es destruido por completo. Su capa de lectura/escritura se elimina del disco duro de la máquina. Cualquier dato que no haya sido guardado externamente en un Volumen se perderá para siempre. No puede ser recuperado. La imagen base, sin embargo, permanece intacta en el sistema.

---

## Interacción Básica: CLI de Imágenes

Ahora que entendemos la teoría, veamos cómo se manipula esto a través de la terminal usando el **Docker CLI** para administrar Imágenes.

### Búsqueda y Descarga
Para usar contenedores, primero necesitas tener la imagen base en tu máquina local.
Si quieres buscar imágenes en Docker Hub directamente desde la terminal, puedes usar:
`docker search <nombre_imagen>` (ej. `docker search ubuntu`).

Una vez que sabes qué imagen quieres, la descargas (o "tiras" de ella) con el comando:
`docker pull <nombre_imagen>:<tag>`
El **tag (etiqueta)** suele ser la versión. Si omites el tag, Docker descargará automáticamente la versión `latest` (la más reciente).
Ejemplo: `docker pull node:18-alpine` descarga la imagen oficial de Node.js versión 18 en su variante 'alpine' (una versión minúscula de Linux).

### Listado e Inspección
Para ver todas las imágenes que has descargado o creado en tu computadora, usas:
`docker images` (o su versión más moderna `docker image ls`).
Esto te mostrará una tabla con el nombre del repositorio, el tag, el ID de la imagen, cuándo fue creada y cuánto pesa en Megabytes.

Si quieres conocer absolutamente todos los detalles técnicos (arquitectura, variables de entorno por defecto, puertos expuestos) de una imagen específica, utilizas:
`docker inspect <id_o_nombre_imagen>`
Esto devuelve un extenso archivo JSON con toda la metainformación incrustada en la plantilla de solo lectura.

### Eliminación de Imágenes
Las imágenes ocupan espacio en el disco duro. Si ya no necesitas una plantilla, debes borrarla.
`docker rmi <id_o_nombre_imagen>` (la 'i' viene de Image, Remove Image).
Ten en cuenta que **no podrás eliminar una imagen** si existe al menos un contenedor (incluso si está detenido) que haya sido creado a partir de esa imagen. Primero debes eliminar el contenedor y luego la imagen.

---

## Interacción Básica: CLI de Contenedores

La administración de contenedores (instancias) es tu tarea del día a día. Aquí están los comandos más críticos.

### Crear y Ejecutar (docker run)
El comando más importante en Docker. Realiza un `docker pull` (si no tienes la imagen) e inmediatamente inicia un contenedor.
`docker run <opciones> <nombre_imagen>`

Opciones vitales:
- `-d` (Detached): Ejecuta el contenedor en segundo plano. Si no pones `-d`, la terminal quedará bloqueada mostrando los logs del contenedor, y si cierras la terminal, el contenedor muere.
- `--name <nombre_custom>`: Por defecto, Docker le asigna nombres graciosos y aleatorios a tus contenedores (ej. `sleepy_einstein`). Esta opción te permite bautizarlo como quieras (ej. `--name mi_base_datos`).
- `-p <puerto_host>:<puerto_contenedor>`: Port Mapping (Mapeo de puertos). Si tu contenedor corre un servidor web en el puerto 80, pero tu computadora real no sabe cómo llegar a él por el aislamiento, debes mapearlo. Ej. `-p 8080:80` significa "Cualquier tráfico que llegue al puerto 8080 de mi computadora real, envíalo al puerto 80 dentro del contenedor".

Ejemplo completo: `docker run -d --name mi_nginx -p 8080:80 nginx:latest`

### Monitoreo (docker ps y logs)
Para ver los contenedores que están **actualmente en ejecución (Running)**:
`docker ps` (Process Status). Te muestra IDs, nombres, imagen base y puertos mapeados.
Si quieres ver TODOS los contenedores, incluso los **detenidos (Exited)**, añade la bandera `-a` (all):
`docker ps -a`

Si un contenedor se ejecutó en segundo plano con `-d` y quieres ver qué está imprimiendo en su consola interna (útil para debuggear errores):
`docker logs <id_o_nombre_contenedor>`

### Detener e Iniciar (stop y start)
Para apagar un contenedor en ejecución gracefully (mandándole una señal para que cierre procesos correctamente):
`docker stop <id_o_nombre_contenedor>`
El contenedor pasa al estado 'Exited'.
Para volver a encenderlo, usando su estado guardado:
`docker start <id_o_nombre_contenedor>`

### Destrucción (docker rm)
Cuando terminaste con un contenedor y quieres liberar espacio (borrando su capa de lectura/escritura y su existencia del sistema):
`docker rm <id_o_nombre_contenedor>`
Nota: No puedes hacer `docker rm` a un contenedor que está en estado 'Running'. Debes hacer `stop` primero, o forzar la eliminación con `docker rm -f` (Force), aunque es peligroso ya que puede corromper datos que el contenedor estaba escribiendo.

Con estos comandos fundamentales, ya estás listo para levantar entornos preconfigurados. En el próximo módulo, dejaremos de consumir imágenes ajenas y aprenderemos a crear nuestras propias imágenes a medida utilizando **Dockerfiles**.
