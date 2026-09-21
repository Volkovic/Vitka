# Módulo 2: Creación de Imágenes (Dockerfiles)

## Introducción al Dockerfile

Hasta ahora hemos hablado de cómo descargar y ejecutar imágenes preexistentes desde Docker Hub (como Ubuntu, Node.js o Nginx). Pero el verdadero poder de Docker se desbloquea cuando necesitas empaquetar tu propia aplicación. Para esto, necesitas crear tu propia Imagen.

El **Dockerfile** es el mecanismo para lograrlo. Es un archivo de texto simple (sin extensión) que contiene una serie de instrucciones declarativas paso a paso. Docker lee este archivo de arriba hacia abajo y ejecuta cada instrucción en orden para ensamblar una nueva imagen.

Piensa en el Dockerfile como una **receta de cocina**. En la receta, declaras los ingredientes base (el sistema operativo), los utensilios necesarios (librerías y dependencias), y finalmente el paso de horneado (el código fuente de tu aplicación). 
Si le pasas el mismo Dockerfile a cualquier computadora, el pastel resultante (la Imagen) será idéntico bit a bit, garantizando así la inmutabilidad y predictibilidad de tu entorno.

---

## La Base de Todo: FROM y el Sistema de Capas

Toda imagen de Docker se construye añadiendo capas. Un concepto crítico a entender es que **cada instrucción en el Dockerfile crea una nueva capa de solo lectura en la imagen final**. Si tu Dockerfile tiene 10 comandos, tu imagen tendrá (en su mayoría) 10 capas superpuestas.

### La instrucción `FROM`
Absolutamente todos los Dockerfiles deben comenzar con la instrucción `FROM`. Esta instrucción define cuál será la "imagen base" sobre la cual construirás tu aplicación.
Rara vez crearás un entorno desde cero absoluto. Lo normal es basarse en el trabajo de alguien más, típicamente imágenes mantenidas oficialmente por proveedores.

**Ejemplo:**
`FROM node:18-alpine`

En este ejemplo, en lugar de empezar con un sistema operativo vacío, le decimos a Docker: *"Consígueme la versión más reciente de Linux Alpine que ya traiga instalada la versión 18 de Node.js, y úsala como punto de partida"*. 
Alpine es una distribución de Linux ultra-ligera (pesa apenas ~5MB). Utilizar variantes como `-alpine` o `-slim` es una práctica recomendada en producción para mantener el tamaño final de tus imágenes al mínimo y reducir la superficie de ataques de seguridad.

---

## Entorno de Trabajo: WORKDIR y ENV

Una vez definida la base, necesitas preparar el entorno interno del contenedor antes de inyectar tu código.

### La instrucción `WORKDIR`
En un sistema Linux normal, cuando abres la terminal sueles iniciar en la raíz (`/`) o en el directorio de usuario (`/home/user/`). 
La instrucción `WORKDIR` le dice a Docker: *"A partir de esta línea, crea este directorio si no existe, y métete dentro de él. Cualquier comando subsiguiente se ejecutará relativo a esta carpeta"*.

**Ejemplo:**
`WORKDIR /usr/src/app`
Es una buena práctica no mezclar los archivos de tu aplicación con los archivos del sistema operativo base. Al usar `WORKDIR`, encapsulas tu proyecto limpiamente.

### La instrucción `ENV`
Las aplicaciones modernas (siguiendo la metodología Twelve-Factor App) deben leer su configuración externa a través de Variables de Entorno, y no mediante credenciales quemadas en el código (hardcoded).
La instrucción `ENV` te permite establecer variables de entorno por defecto que persistirán tanto durante la construcción de la imagen, como cuando el contenedor esté finalmente en ejecución.

**Ejemplo:**
`ENV NODE_ENV=production`
`ENV PORT=3000`

---

## El Arte de Copiar: COPY e Instalación de Dependencias (RUN)

Aquí llegamos al punto donde tu código fuente viaja desde tu máquina física (el *Host*) hacia dentro de la imagen de Docker.

### La instrucción `COPY`
Su sintaxis es simple: `COPY <origen_en_tu_maquina> <destino_en_la_imagen>`.
**Ejemplo:**
`COPY . .`
Esto significa "Copia todos los archivos de la carpeta actual en mi laptop, y pégalos en la carpeta actual de la imagen (la cual definiste arriba con WORKDIR)".

### La instrucción `RUN`
`RUN` ejecuta un comando de terminal *durante el proceso de construcción de la imagen*, no cuando el contenedor está encendido. Su propósito principal es instalar dependencias, compilar binarios o descargar archivos necesarios.
**Ejemplo:**
`RUN npm install`

### La regla de oro del Caché en Dockerfiles
Como mencionamos, cada línea del Dockerfile crea una capa. Docker es inteligente e intenta **cachear (guardar en memoria)** estas capas. Si reconstruyes una imagen y Docker nota que una capa no ha cambiado, usará la versión guardada en caché para ir más rápido. Sin embargo, **si una capa cambia, todas las capas debajo de ella perderán el caché y tendrán que ser reconstruidas**.

El error más común de un novato es hacer esto:
1. `COPY . .` (Copia el código y el package.json)
2. `RUN npm install`

Si cambias solo una letra en tu archivo `index.js`, el paso 1 (COPY) detectará un cambio. Por ende, invalida su caché. Al invalidarse, el paso 2 (RUN npm install) se verá forzado a ejecutarse nuevamente, ¡tardando minutos en descargar dependencias de internet aunque no hayas añadido ninguna dependencia nueva!

**La forma profesional y optimizada es:**
1. `COPY package*.json ./` (Copia SOLO los archivos de dependencias).
2. `RUN npm install` (Instala las dependencias. Esto se cacheará de forma permanente).
3. `COPY . .` (Copia el resto de tu código fuente).

Con este patrón optimizado, si editas tu código fuente (Paso 3), Docker no necesita reinstalar las dependencias (Paso 2) porque usará el caché, reduciendo el tiempo de build (construcción) de minutos a solo segundos.

---

## Ejecución: CMD vs ENTRYPOINT

Al final de tu Dockerfile, debes indicarle a la imagen **cuál es el proceso principal** que debe arrancar cuando el contenedor cobre vida. Hay dos comandos para esto, y su diferencia suele ser motivo de confusión en entrevistas técnicas.

### La instrucción `CMD`
Define el comando por defecto a ejecutar. Lo más importante de `CMD` es que **puede ser sobrescrito** fácilmente por el usuario desde la terminal al hacer `docker run`.

**Ejemplo:**
`CMD ["node", "index.js"]`

Si un usuario ejecuta: `docker run mi-app`, el contenedor arrancará corriendo `node index.js`.
Pero si el usuario ejecuta: `docker run mi-app bash`, el contenedor ignorará completamente tu `CMD` y abrirá una terminal de Linux (`bash`) en su lugar. Esto es útil para imágenes de uso general.

### La instrucción `ENTRYPOINT`
Define el ejecutable principal del contenedor de una forma **estricta y difícil de sobrescribir**. El contenedor se comportará como si fuera un ejecutable cerrado. Cualquier argumento que el usuario pase en el `docker run` no reemplazará al ENTRYPOINT, sino que se añadirá como parámetro al final del mismo.

**Ejemplo:**
`ENTRYPOINT ["node", "index.js"]`
Con esta configuración, el contenedor solo sabe hacer una cosa, y es muy difícil de alterar.

**Recomendación:** En la mayoría de aplicaciones web modernas y microservicios estándar, el uso de `CMD` es la convención preferida por su flexibilidad.

---

## La Magia del Multi-Stage Build

Las aplicaciones compiladas (como Go, Rust, Java, e incluso aplicaciones de Frontend como React con Vite) presentan un desafío. Para compilar tu código necesitas herramientas pesadas (compiladores, SDKs completos, librerías de desarrollo, node_modules masivos). Pero para **ejecutar** tu código en producción, solo necesitas el artefacto final compilado (los archivos HTML/CSS/JS estáticos, o el binario ejecutable) y un servidor web ligero.

Si metes el compilador y el binario final en la misma imagen, terminarás con una imagen que pesa 2 GB, aumentando los costos de almacenamiento de red y riesgos de seguridad.

La solución es **Multi-stage Builds (Construcciones de múltiples fases)**. Te permite usar múltiples instrucciones `FROM` en el mismo Dockerfile. Cada `FROM` comienza una nueva etapa. Lo mágico es que puedes copiar de manera selectiva artefactos de una etapa previa a otra, desechando todo el peso muerto de la primera.

**Ejemplo Teórico (Frontend React):**

**Etapa 1 (El Constructor Pesado):**
1. `FROM node:18 AS builder` (Le damos un alias "builder" a esta etapa).
2. Instalamos los megabytes inmensos de dependencias.
3. Ejecutamos `npm run build` para que Vite genere la carpeta estática `/dist`.

**Etapa 2 (El Ejecutor Ligero):**
1. `FROM nginx:alpine` (Empezamos de cero, con un servidor web ultra liviano que pesa 10MB. ¡Se borra todo el peso del Node de la etapa anterior!).
2. `COPY --from=builder /app/dist /usr/share/nginx/html` (Viajamos en el tiempo a la Etapa 1, tomamos solo los archivos estáticos ya compilados, y los metemos en la Etapa 2).

El resultado final: La imagen que va a producción pesará apenas ~15MB, a pesar de haber requerido gigabytes de RAM y herramientas pesadas durante su fase de construcción.

---

## Protección de Contexto: .dockerignore

Finalmente, antes de construir tu imagen con el comando `docker build -t mi-app .`, debes proteger el contexto de construcción.

Cuando escribes `docker build .`, Docker necesita empacar y enviar el directorio actual completo al Docker Daemon antes de evaluar el Dockerfile. A esto se le llama el "Build Context" (Contexto de Construcción).
Si tienes una carpeta `node_modules` local de 1GB en tu laptop, o archivos con contraseñas `.env`, todo ese peso y sensibilidad se transferirá a la imagen (a causa del comando `COPY . .`).

Para evitar esto, debes crear un archivo llamado `.dockerignore` justo al lado de tu Dockerfile. Funciona exactamente igual que `.gitignore`, pero para Docker.

**Ejemplo de .dockerignore:**
```text
node_modules
.git
.env
npm-debug.log
```

Al incluir `node_modules` en el `.dockerignore`, aseguras que el entorno local y sucio de tu computadora no contamine la imagen, forzando a que las dependencias se instalen frescas y limpias desde cero durante el paso `RUN npm install` de tu Dockerfile. Esto es vital para asegurar que la regla "Funciona en todas partes igual" se cumpla.
