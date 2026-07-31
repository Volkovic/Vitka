## ¿Qué es el Control de Versiones?

Imagina que estás escribiendo un documento importante. Para no perder cambios, empiezas a crear copias: `informe_final.docx`, `informe_final_v2.docx`, `informe_final_DEFINITIVO.docx`, `informe_final_DEFINITIVO_AHORA_SI.docx`...

El **control de versiones** resuelve exactamente ese caos. Es un sistema que registra cada cambio que haces en tus archivos a lo largo del tiempo, permitiéndote:

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

| Concepto | Git | GitHub |
|----------|-----|--------|
| **¿Qué es?** | Un programa/herramienta | Una plataforma web |
| **¿Dónde vive?** | En tu computadora (local) | En internet (nube) |
| **¿Qué hace?** | Rastrea cambios en archivos | Aloja repositorios Git y facilita la colaboración |
| **¿Necesita internet?** | No (casi todo es local) | Sí |
| **Alternativas** | — | GitLab, Bitbucket, Azure DevOps |

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

### Opción 1: Crear un repositorio desde cero (`git init`)

Si tienes una carpeta con código existente (o una carpeta vacía) y quieres que Git comience a rastrear sus cambios:

```bash
# Crear una carpeta nueva (o navegar a una existente)
mkdir mi-proyecto
cd mi-proyecto

# Inicializar Git en esta carpeta
git init
# Salida: Initialized empty Git repository in /ruta/mi-proyecto/.git/
```

A partir de este momento, Git está "observando" todo lo que pasa dentro de `mi-proyecto/`.

---

### Opción 2: Clonar un repositorio existente (`git clone`)

Si el proyecto ya existe en GitHub (o en cualquier servidor remoto) y quieres descargarlo a tu computadora con toda su historia:

```bash
git clone https://github.com/usuario/nombre-del-repo.git

# Esto crea una carpeta "nombre-del-repo/" con todo el código
# y todo el historial de cambios.
```

`git clone` es el equivalente a "descargar + conectar". No solo descarga los archivos, sino que también configura la conexión con el servidor remoto para que luego puedas subir y bajar cambios.

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

| Carpeta/Archivo | Función |
|-----------------|---------|
| `objects/` | Almacena TODO el contenido: archivos, commits, árboles de directorio |
| `refs/` | Guarda los punteros a las ramas y tags |
| `HEAD` | Indica en qué rama o commit estás parado ahora mismo |
| `config` | Configuración específica de este repositorio |
| `hooks/` | Scripts que se ejecutan automáticamente en ciertos eventos |

> **⚠️ Regla de oro:** NUNCA borres ni modifiques manualmente la carpeta `.git/`. Si la eliminas, pierdes toda la historia del proyecto. El proyecto seguirá existiendo como carpeta normal, pero Git dejará de rastrearlo.

---

### Ejercicio Práctico 1

**¿Cuál es la diferencia entre `git init` y `git clone`? ¿En qué situación usarías cada uno?**

**[Solución]**
```bash
# git init: Inicializa un repositorio NUEVO desde cero en tu máquina local.
# Lo usas cuando TÚ estás empezando un proyecto nuevo y quieres que Git
# comience a rastrearlo.
#
# git clone: Descarga una COPIA COMPLETA de un repositorio que ya existe
# en un servidor remoto (como GitHub). Lo usas cuando quieres trabajar
# en un proyecto que otra persona (o tú mismo) ya subió a la nube.
#
# Diferencia clave: git init crea un repo vacío (sin historia).
# git clone descarga un repo con toda su historia de commits.
```

---

### Ejercicio Práctico 2

**Lee el siguiente bloque de comandos y razona: ¿Qué ocurre en cada paso? ¿Cuál es el resultado final?**

```bash
mkdir portfolio
cd portfolio
git init
git config user.name "Ana García"
git config user.email "ana@example.com"
```

**[Solución]**
```bash
# Paso 1: mkdir portfolio
#   → Crea una carpeta vacía llamada "portfolio" en el directorio actual.
#
# Paso 2: cd portfolio
#   → Entra (navega) a la carpeta "portfolio".
#
# Paso 3: git init
#   → Inicializa un repositorio Git vacío dentro de "portfolio".
#   → Crea la carpeta oculta .git/ con toda la infraestructura de Git.
#
# Paso 4: git config user.name "Ana García"
#   → Configura el nombre del autor SOLO para este repositorio específico.
#   → Notar que NO usa --global, por lo que esta configuración NO afecta
#     a otros repositorios en la computadora.
#
# Paso 5: git config user.email "ana@example.com"
#   → Lo mismo, pero para el email. Solo afecta a este repo.
#
# Resultado final: Tenemos una carpeta "portfolio" que es un repositorio
# Git configurado con un nombre y email específicos para los commits
# de este proyecto. Aún no se ha hecho ningún commit.
```

---

### Ejercicio Práctico 3

**Si ejecutas el siguiente comando, ¿qué información puedes extraer de la salida?**

```bash
git config --list
# Salida:
# user.name=Carlos López
# user.email=carlos@empresa.com
# core.editor=code --wait
# init.defaultbranch=main
```

**[Solución]**
```bash
# De esta salida podemos deducir:
#
# 1. user.name=Carlos López → El autor de los commits se registrará como "Carlos López".
# 2. user.email=carlos@empresa.com → Su email asociado a los commits.
# 3. core.editor=code --wait → Cuando Git necesite abrir un editor de texto
#    (por ejemplo, para escribir un mensaje de commit largo), usará VS Code.
#    El flag --wait le dice a Git que espere hasta que cierres el archivo en
#    VS Code antes de continuar.
# 4. init.defaultbranch=main → Cuando cree un nuevo repositorio con git init,
#    la rama principal se llamará "main" en lugar del antiguo "master".
```
