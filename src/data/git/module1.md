## ¿Qué es el Control de Versiones?

Imagina que estás escribiendo un documento importante. Para no perder cambios, empiezas a crear copias: `informe_final.docx`, `informe_final_v2.docx`, `informe_final_DEFINITIVO.docx`, `informe_final_DEFINITIVO_AHORA_SI.docx`...

El Git es un **Sistema de Control de Versiones Distribuido**. Piensa en él como una "máquina del tiempo" para tu código. Registra cada cambio que haces, quién lo hizo y por qué, permitiéndote volver a cualquier versión anterior si algo sale mal.

Fue creado en 2005 por **Linus Torvalds** (el mismo creador del kernel de Linux) precisamente para gestionar el desarrollo del kernel. Lo diseñó para ser rápido, distribuido y capaz de manejar proyectos masivos.

### ¿Qué significa "Distribuido"?

- **Volver a cualquier versión anterior** sin perder nada.
- **Saber exactamente qué cambió**, cuándo y quién lo hizo.
- **Trabajar en equipo** sobre los mismos archivos sin pisarse.

En el mundo del software, el control de versiones no es opcional: es tan fundamental como el código mismo.

---

## Git: El Motor por Debajo

**Git** es un **sistema de control de versiones distribuido** creado en 2005 por Linus Torvalds (sí, el mismo creador del kernel de Linux). Es la herramienta que corre en tu computadora y se encarga de rastrear todos los cambios.

### Características clave de Git:

- **Distribuido:** Cada persona que trabaja en el proyecto tiene una copia completa de toda la historia del código en su propia máquina. No dependes de un servidor central para funcionar.
- **Rápido:** Casi todas las operaciones son locales (no necesitan internet), lo que lo hace extremadamente veloz.
- **Integridad:** Git usa un sistema de verificación llamado **SHA-1** para asegurar que ningún archivo se corrompa sin que te des cuenta. Cada "foto" del proyecto tiene un identificador único (un hash) como `e4c5b2a...`.

---

## GitHub: La Nube Social

Mucha gente confunde Git con GitHub, pero son cosas completamente diferentes:

- ****¿Qué es?**** (Un programa/herramienta): Una plataforma web
- ****¿Dónde vive?**** (En tu computadora (local)): En internet (nube)

- **Git** es la herramienta de línea de comandos. Funciona localmente en tu computadora. No necesita internet.
- **GitHub** es una plataforma web (un servicio en la nube) que **aloja** repositorios de Git y añade herramientas de colaboración como Pull Requests y revisión de código.
- **Alternativas a GitHub:** Existen otras plataformas que hacen exactamente lo mismo, como **GitLab**, **Bitbucket** o **Azure DevOps**. Todas ellas usan Git por debajo.

**Analogía simple:**
- **Git** es como el motor de un auto. Hace todo el trabajo pesado.
- **GitHub** es como la autopista y el estacionamiento. Te da un lugar para compartir tu auto (código) con el mundo y colaborar con otros conductores.

Puedes usar Git sin GitHub, pero no puedes usar GitHub sin Git.

---

## GitHub Desktop: La Interfaz Visual

**GitHub Desktop** es una aplicación de escritorio que te permite usar Git y GitHub de forma **visual**, sin necesidad de escribir comandos en la terminal.

Con GitHub Desktop puedes:
- Crear y clonar repositorios con un clic.
- Ver los archivos que cambiaste de forma gráfica (resaltando líneas añadidas y eliminadas).
- Hacer commits, crear ramas y sincronizar con GitHub, todo desde botones e interfaces intuitivas.

> **Nota importante:** GitHub Desktop es una capa visual sobre Git. Por debajo, ejecuta exactamente los mismos comandos que aprenderás aquí. Entender los conceptos de Git te hará mucho más efectivo incluso usando la interfaz gráfica.

---

## Instalación y Configuración Inicial

### Instalar Git

Para verificar si ya tienes Git instalado, abre una terminal (PowerShell en Windows, Terminal en Mac/Linux) y ejecuta:

```bash
git --version
# Salida esperada (ejemplo): git version 2.45.0
```

Si no lo tienes, descárgalo desde [git-scm.com](https://git-scm.com/). La instalación en Windows incluye **Git Bash**, una terminal especial que emula un entorno Unix.

---

### Configurar tu Identidad

Lo primero que debes hacer después de instalar Git es configurar tu nombre y correo electrónico. Git adjunta esta información a **cada commit** que hagas para identificar al autor:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

El flag `--global` significa que esta configuración se aplica a **todos** los repositorios de tu computadora. Si quisieras un nombre diferente para un proyecto específico, ejecutarías el mismo comando sin `--global` dentro de ese proyecto.

Para verificar tu configuración actual:

```bash
git config --list
# Salida:
# user.name=Tu Nombre
# user.email=tu@email.com
# ...
```

---

## Creando tu Primer Repositorio

Un **repositorio** (o "repo") es simplemente una carpeta que Git está vigilando. Hay dos formas de empezar:

### Iniciar un Repositorio — git init

Para que Git empiece a rastrear una carpeta, necesitas inicializarla:

```bash
# Entrar a la carpeta de tu proyecto
cd mi-proyecto

# Inicializar Git
git init
```

> **Nota:** Si ejecutas `git init` en una carpeta que ya es un repositorio, no se perderán datos. Git simplemente te dirá que reinicializó el repositorio existente, lo cual es útil si alguna vez se daña algún archivo de configuración interno.

¿Qué acaba de pasar? Git ha creado una carpeta oculta llamada **`.git/`**. 

### La anatomía de la carpeta .git/
Esta carpeta es el cerebro de Git. Si la borras, **pierdes todo el historial** y el proyecto vuelve a ser una carpeta normal. Contiene componentes clave como:
- **`objects/`**: El almacén principal. Aquí Git guarda todo el contenido versionado (archivos comprimidos y commits).
- **`refs/`**: Punteros a tus ramas y tags.
- **`HEAD`**: Un archivo que indica en qué rama o commit estás posicionado actualmente.
- **`config`**: La configuración local de este repositorio específico.

**Nunca modifiques archivos dentro de `.git/` manualmente.** Git lo hace por ti a través de los comandos.

---

### Descargar un Repositorio — git clone

Si el proyecto ya existe en GitHub (o GitLab/Bitbucket) y quieres descargarlo, NO usas `git init`. Usas `git clone`:

```bash
git clone https://github.com/usuario/nombre-del-repo.git
```

`git clone` hace 3 cosas automáticamente:
1. Crea una carpeta con el mismo nombre del repositorio (en este caso, `nombre-del-repo`).
2. Descarga **todos los archivos** y **todo el historial** de commits.
3. Configura la conexión con el servidor original (lo llama `origin`).

---

## La Carpeta Oculta `.git/`

Cuando ejecutas `git init` o `git clone`, Git crea una carpeta oculta llamada **`.git/`** dentro de tu proyecto. Esta carpeta es **el cerebro de Git**: contiene absolutamente toda la información que Git necesita para funcionar.

```bash
# Ver la carpeta oculta (en la terminal)
ls -la
# Salida:
# drwxr-xr-x  .git/        <-- ¡Aquí vive toda la magia!
# -rw-r--r--  README.md
# -rw-r--r--  index.html
```

### ¿Qué hay dentro de `.git/`?

- **`objects/`:** Almacena TODO el contenido: archivos, commits, árboles de directorio
- **`refs/`:** Guarda los punteros a las ramas y tags
- **`HEAD`:** Indica en qué rama o commit estás parado ahora mismo
- **`config`:** Configuración específica de este repositorio
- **`hooks/`:** Scripts que se ejecutan automáticamente en ciertos eventos

> **⚠️ Regla de oro:** NUNCA borres ni modifiques manualmente la carpeta `.git/`. Si la eliminas, pierdes toda la historia del proyecto. El proyecto seguirá existiendo como carpeta normal, pero Git dejará de rastrearlo.

