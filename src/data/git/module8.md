## ¿Qué es CI/CD?

**CI/CD** son las siglas de **Continuous Integration** (Integración Continua) y **Continuous Deployment** (Despliegue Continuo). Son prácticas que automatizan el proceso de verificar y publicar tu código.

### Antes de CI/CD (el mundo manual):

```
  1. Desarrollador termina su código
  2. Ejecuta los tests manualmente en su máquina
  3. "En mi máquina funciona" 🤷
  4. Manda un email al administrador del servidor
  5. El admin sube los archivos manualmente al servidor por FTP
  6. El sitio se rompe en producción
  7. Caos
```

### Con CI/CD (el mundo automatizado):

```
  1. Desarrollador hace push a GitHub
  2. ✅ GitHub Actions ejecuta los tests AUTOMÁTICAMENTE
  3. ✅ Si los tests pasan, despliega AUTOMÁTICAMENTE a producción
  4. Si algo falla, BLOQUEA el merge y notifica al equipo
  5. Paz y orden
```

- ****CI (Integración Continua)**:** Ejecutar tests y verificaciones cada vez que alguien sube código
- ****CD (Despliegue Continuo)**:** Publicar automáticamente a producción cuando el código pasa todas las verificaciones

---

## GitHub Actions — La Herramienta de Automatización

**GitHub Actions** es la plataforma de CI/CD integrada directamente en GitHub. Te permite ejecutar código automáticamente en respuesta a eventos de tu repositorio (como un push, un PR, o un horario programado).

### Anatomía de GitHub Actions:

```
  WORKFLOW (archivo .yml)
  │
  ├── EVENT (qué lo dispara: push, pull_request, schedule...)
  │
  ├── JOB 1 (conjunto de pasos que corren en un servidor)
  │   ├── Step 1: Checkout del código
  │   ├── Step 2: Instalar dependencias
  │   └── Step 3: Ejecutar tests
  │
  └── JOB 2 (puede correr en paralelo o después de Job 1)
      ├── Step 1: Checkout del código
      └── Step 2: Deploy a producción
```

### Glosario de conceptos clave:

- ****Workflow**** (Un archivo `.yml` que define todo el proceso): La receta de cocina
- ****Event**** (Lo que dispara el workflow): El temporizador del horno
- ****Job**** (Un grupo de pasos que corren juntos): Un plato de la receta
- ****Step**** (Una acción individual dentro de un job): Un paso de la receta
- ****Runner**** (El servidor (máquina) donde se ejecuta): La cocina
- ****Action**** (Un bloque de código reutilizable del Marketplace): Un ingrediente prefabricado

---

## Sintaxis YAML — El Lenguaje de los Workflows

Los workflows de GitHub Actions se escriben en **YAML** (Yet Another Markup Language). Es un formato de datos legible para humanos, basado en **indentación** (como Python).

### Reglas fundamentales de YAML:

```yaml
# Los comentarios empiezan con #

# Clave: Valor (simple)
nombre: "Mi Proyecto"
version: 3

# Listas (con guiones)
frutas:
  - manzana
  - banana
  - naranja

# Objetos anidados (con indentación)
servidor:
  host: "localhost"
  puerto: 3000
  debug: true

# ⚠️ La indentación DEBE ser con ESPACIOS (no tabuladores)
# ⚠️ La cantidad de espacios debe ser CONSISTENTE (generalmente 2)
```

> **⚠️ Error más común en YAML:** La indentación incorrecta. Un solo espacio de más o de menos rompe todo el archivo. YAML no usa llaves `{}` ni corchetes `[]` para anidar; depende 100% de los espacios.

---

## Tu Primer Workflow: "Hola Mundo"

Los workflows viven dentro de la carpeta **`.github/workflows/`** de tu repositorio. Creemos el más básico posible:

```yaml
# Archivo: .github/workflows/hola-mundo.yml

# Nombre del workflow (aparece en la pestaña Actions de GitHub)
name: Mi Primer Workflow

# ¿Cuándo se ejecuta? → Cada vez que hago push a cualquier rama
on: [push]

# Los trabajos que se van a ejecutar
jobs:
  # Nombre del job (puedes ponerle como quieras)
  saludo:
    # ¿En qué máquina corre? → Ubuntu (Linux) proporcionado por GitHub
    runs-on: ubuntu-latest

    # Los pasos del job
    steps:
      # Paso 1: Imprimir un mensaje
      - name: Saludar al mundo
        run: echo "¡Hola Mundo desde GitHub Actions!"

      # Paso 2: Mostrar información del entorno
      - name: Mostrar información
        run: |
          echo "Repositorio: ${{ github.repository }}"
          echo "Rama: ${{ github.ref_name }}"
          echo "Autor del push: ${{ github.actor }}"
          echo "Fecha: $(date)"
```

### ¿Qué hace este workflow?

1. Cada vez que haces `git push`, GitHub detecta el evento.
2. Crea un servidor Ubuntu temporal (el **runner**).
3. Ejecuta los dos pasos: imprime un saludo y muestra información.
4. Puedes ver la salida en la pestaña **Actions** de tu repositorio en GitHub.

> **¿Qué pasa si un paso (step) falla?**
> Si cualquier comando dentro de un paso devuelve un error (ej. un test que falla o un script que se rompe), **todo el Job se detiene**. El workflow se marca como "Failed" (cruz roja) y todos los pasos siguientes se saltan (skips). Esto previene que hagas "deploy" si tus tests fallaron.

---

## Events — ¿Qué Dispara un Workflow?

Los **events** definen cuándo se ejecuta tu workflow. Los más comunes:

```yaml
# Ejecutar al hacer push a main
on:
  push:
    branches: [main]

# Ejecutar cuando se abre o actualiza un Pull Request
on:
  pull_request:
    branches: [main]

# Ejecutar con ambos eventos
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

# Ejecutar en un horario (cron) - ej. todos los días a las 3am UTC
on:
  schedule:
    - cron: '0 3 * * *'

# Ejecutar manualmente desde la UI de GitHub
on: workflow_dispatch
```

---

## Actions del Marketplace — No Reinventes la Rueda

El **GitHub Marketplace** tiene miles de **Actions** prefabricadas que puedes usar en tus workflows. Son como "plugins" que resuelven tareas comunes.

### La Action más importante: `actions/checkout`

Cuando un workflow empieza, el runner es una máquina **vacía**. No tiene tu código. La action `actions/checkout` se encarga de clonar tu repositorio dentro del runner:

```yaml
steps:
  # Sin esto, el runner NO tiene acceso a tu código
  - name: Clonar el repositorio
    uses: actions/checkout@v4

  # Ahora sí puedes trabajar con tus archivos
  - name: Listar archivos
    run: ls -la
```

### Otras Actions populares:

```yaml
# Configurar Node.js
- uses: actions/setup-node@v4
  with:
    node-version: '20'

# Configurar Python
- uses: actions/setup-python@v5
  with:
    python-version: '3.12'

# Cachear dependencias para acelerar builds
- uses: actions/cache@v4
  with:
    path: node_modules
    key: ${{ runner.os }}-node-${{ hashFiles('package-lock.json') }}
```

La sintaxis `uses: usuario/nombre-action@versión` descarga y ejecuta esa Action automáticamente.

---

## Secrets — Variables Secretas

Muchos workflows necesitan contraseñas, tokens o API keys. **NUNCA** debes escribir estos valores directamente en el archivo `.yml` (quedarían visibles en el repositorio).

Para esto existen los **Secrets**:

1. Ve a tu repositorio → **Settings → Secrets and variables → Actions**.
2. Haz clic en **"New repository secret"**.
3. Dale un nombre (ej. `DEPLOY_TOKEN`) y pega el valor secreto.

Luego úsalos en tu workflow con la sintaxis `${{ secrets.NOMBRE }}`:

```yaml
steps:
  - name: Deploy al servidor
    run: curl -X POST https://mi-servidor.com/deploy
    env:
      AUTH_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

GitHub **encripta** los secrets y nunca los muestra en los logs. Si un step intenta imprimir un secret, GitHub lo reemplaza por `***`.

---

## Un Workflow Profesional: CI con Tests

Veamos un workflow real que ejecuta los tests de un proyecto Node.js cada vez que se abre un PR:

```yaml
# Archivo: .github/workflows/ci.yml
name: CI - Tests Automáticos

on:
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      # 1. Clonar el código
      - uses: actions/checkout@v4

      # 2. Configurar Node.js
      - uses: actions/setup-node@v4
        with:
          node-version: '20'

      # 3. Instalar dependencias
      - name: Instalar dependencias
        run: npm ci

      # 4. Ejecutar el linter (verificar estilo de código)
      - name: Lint
        run: npm run lint

      # 5. Ejecutar los tests
      - name: Tests
        run: npm test
```

### ¿Qué logra este workflow?

Cada vez que alguien abre un PR hacia `main`:
1. GitHub crea un servidor temporal.
2. Clona el código del PR.
3. Instala las dependencias.
4. Verifica el estilo del código (lint).
5. Ejecuta todos los tests.
6. Si **cualquier paso falla**, el PR se marca con una ❌ roja.
7. Si **todo pasa**, el PR se marca con un ✅ verde.

Combinado con las **Branch Protection Rules** del Módulo 5, puedes hacer que sea **imposible** mergear un PR si los tests no pasan.

---

## Matrices de Prueba — Testear en Múltiples Entornos

¿Qué pasa si tu proyecto necesita funcionar en Node 18, 20 y 22? ¿O en Ubuntu, Windows y macOS? En lugar de crear 9 jobs separados, usas una **matrix**:

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18, 20, 22]

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

Este workflow genera **9 combinaciones** automáticamente:
- Ubuntu + Node 18, Ubuntu + Node 20, Ubuntu + Node 22
- Windows + Node 18, Windows + Node 20, Windows + Node 22
- macOS + Node 18, macOS + Node 20, macOS + Node 22

Todas corren en paralelo, asegurando que tu código funciona en cualquier entorno.

---

## Git Hooks — Automatización Local

Mientras que GitHub Actions corre **en la nube** (en los servidores de GitHub), los **Git Hooks** corren **en tu máquina local** antes o después de ciertas acciones de Git.

### Hooks más comunes:

- **`pre-commit`** (Antes de crear un commit): Verificar formato del código, ejecutar lint
- **`pre-push`** (Antes de hacer push): Ejecutar tests rápidos
- **`commit-msg`** (Después de escribir el mensaje): Validar que sigue Conventional Commits

### Ejemplo con Husky (Node.js):

**Husky** es la herramienta más popular para gestionar Git Hooks en proyectos JavaScript:

```bash
# Instalar Husky
npm install --save-dev husky

# Inicializar Husky
npx husky init
```

Esto crea una carpeta `.husky/` donde puedes definir tus hooks:

```bash
# Archivo: .husky/pre-commit
npm run lint
npm run format:check
```

Ahora, cada vez que intentes hacer `git commit`, Husky ejecutará el linter automáticamente. Si el código no pasa la verificación, **el commit se bloquea** hasta que lo corrijas.

### Hooks vs Actions — ¿Cuándo usar cada uno?

- ****¿Dónde corren?**** (En tu computadora): En servidores de GitHub
- ****¿Cuándo?**** (Antes/después de acciones Git): Al hacer push, abrir PR, etc.
- ****¿Se pueden saltar?**** (Sí (`git commit --no-verify`)): No (a menos que desactives el workflow)
- ****¿Para qué?**** (Verificaciones rápidas antes de subir código): Tests completos, deploys, verificaciones oficiales

Lo ideal es usar **ambos**: Hooks para atrapar errores antes de que salgan de tu máquina, y Actions como la verificación definitiva en la nube.

