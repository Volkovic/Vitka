# Módulo 2: Pipelines de Integración Continua

## Diseñando Nuestro Primer Pipeline

Ahora que entendemos la sintaxis YAML y la estructura de un Workflow, vamos a construir un pipeline real de Integración Continua (CI). Supongamos que estamos desarrollando una aplicación web en React o Node.js. 

Nuestro objetivo es el siguiente: Cada vez que un desarrollador empuje código a cualquier rama, queremos que GitHub encienda un servidor con Linux, instale Node.js, descargue nuestro código, instale las dependencias de NPM, revise que el estilo del código sea correcto (Linting) y, finalmente, ejecute nuestras pruebas automatizadas (Tests).

Si algún paso falla, queremos que GitHub lance una alerta roja y no permita fusionar el código. Si todo pasa, aparecerá un hermoso check verde (✅) junto a nuestro commit.

Empecemos escribiendo la cabeza de nuestro archivo `.github/workflows/ci.yml`:
```yaml
name: Validacion Continua
on: [push, pull_request]
jobs:
  pruebas_y_estilos:
    runs-on: ubuntu-latest
    steps:
      # (Aquí irán nuestros pasos)
```

Tenemos el servidor Ubuntu listo y vacío. Aún no tiene nuestro código ni sabe qué es Node.js.

---

## Descargando el Código (actions/checkout)

El primer error conceptual que tienen los novatos es asumir que el servidor Ubuntu prestado por GitHub ya tiene el código fuente del proyecto dentro de él. ¡No es así! El Runner arranca como una máquina totalmente vacía y en blanco.

Por lo tanto, el primer paso en el 99% de los workflows del planeta Tierra es **descargar (hacer un clon)** del código desde el repositorio de GitHub hacia dentro del disco duro de este Runner.

Podrías escribir scripts manuales usando el comando `git clone`, lidiando con llaves SSH y permisos, pero para ahorrarnos todo ese trabajo, la comunidad de GitHub creó las **Actions prefabricadas**. 
Para usar una Action de un tercero, en lugar de la palabra `run`, utilizamos la palabra clave `uses`.

```yaml
    steps:
      - name: Descargar el codigo del repositorio
        uses: actions/checkout@v4
```

Al agregar este paso, un programa oficial de GitHub (`actions/checkout` en su versión 4) se ejecutará por detrás, y descargará de forma segura y optimizada todo el código de tu proyecto (junto con el commit exacto que disparó la acción) en la carpeta de trabajo del servidor virtual.

---

## Preparando el Entorno (actions/setup-node)

Tenemos nuestro código (archivos `.js`, `package.json`, etc.) en el disco duro del Runner. Pero si intentas ejecutar el comando `npm install` ahora mismo, el servidor arrojará un error diciendo: *"npm: command not found"*.

Recuerda: es una máquina virtual de Ubuntu recién encendida. No trae Node.js instalado por defecto. Debemos instalar el motor de Node para que pueda entender nuestro código. Nuevamente, usaríamos comandos pesados de Linux (`apt-get install nodejs`), pero GitHub nos simplifica la vida con otra Action prefabricada.

```yaml
    steps:
      - name: Descargar el codigo del repositorio
        uses: actions/checkout@v4
        
      - name: Configurar Node.js en el servidor
        uses: actions/setup-node@v4
        with:
          node-version: '18'
```

Aquí hemos añadido la Action `actions/setup-node`. Observa la introducción de una nueva palabra clave: **`with`**. 
Muchas Actions prefabricadas son personalizables; requieren argumentos o parámetros para funcionar como tú deseas. Usando `with:`, le pasamos un "parámetro" a la acción para decirle exactamente qué versión de Node.js queremos que instale en la computadora.

---

## Instalación Limpia (npm ci vs npm install)

El entorno está listo. Tenemos código y tenemos Node.js versión 18. El siguiente paso lógico es descargar las librerías de internet, porque, de nuevo, la carpeta `node_modules` (gigante y pesada) jamás debe subirse a GitHub; está en el `.gitignore`.

Aquí entramos en el territorio de ejecutar comandos de terminal propios, usando la palabra `run`.
Podrías pensar en usar `run: npm install`, pero en entornos de Integración Continua, esto es considerado **una mala práctica**.

¿Por qué? Porque `npm install` puede ser impredecible. Si en tu archivo dependencias pones `"react": "^18.0.0"`, el símbolo `^` le dice a npm: "descarga la versión más reciente superior a la 18". Si instalas hoy será la 18.2, si instalas mañana tal vez sea la 18.3. Esto puede causar que el código falle en la nube cuando en tu máquina local funcionaba perfectamente.

En CI/CD buscamos **reproducibilidad exacta e inmutable**. Para lograrlo, debes usar siempre:
`npm ci` (Clean Install).

El comando `npm ci` no lee el `package.json`, sino que lee el **`package-lock.json`**. Instalará exacta y matemáticamente las mismas versiones bit-a-bit de las librerías que usaste en tu computadora local la última vez. Además, es significativamente más rápido borrando cualquier carpeta preexistente.

```yaml
      - name: Instalar dependencias estrictas
        run: npm ci
```

---

## Ejecución de Pruebas y Validación (Lint & Test)

Con el código en su lugar y la carpeta `node_modules` hidratada con las librerías correctas, llegó la hora del show. Ahora el robot de CI debe cumplir su función policial: validar si el código que se acaba de subir es de buena calidad o si está roto.

Generalmente se separan en diferentes *steps* para que, si algo falla, en la interfaz visual de GitHub podamos ver inmediatamente en qué línea se cayó el proceso.

```yaml
      - name: Validar estilo de codigo (Linter)
        run: npm run lint

      - name: Correr pruebas unitarias y E2E
        run: npm run test
```

Y aquí yace la magia fundamental del CI: Si el comando `npm run lint` encuentra errores de sintaxis y devuelve un "código de error" al sistema operativo, **GitHub Actions detiene inmediatamente todo el workflow**. El paso de `test` ni siquiera se ejecutará, el servidor virtual se apagará y una equis roja enorme bloqueará tu Pull Request.

Si el comando termina felizmente, pasará al comando de `test`. Si las pruebas pasan, el workflow finaliza con un éxito rotundo. Acabas de automatizar al auditor de código más implacable de tu empresa.

---

## Optimizando el Tiempo (El Caché)

Nuestro pipeline ya es funcional y protege nuestro proyecto. Pero a medida que el proyecto crezca, el paso `npm ci` empezará a demorar 2, 3 o 4 minutos cada vez que alguien haga un commit, porque debe descargar gigabytes de datos de internet cada vez que se enciende un Runner vacío.

En el mundo corporativo, los minutos de CI cuestan dinero. La solución profesional es **Cachear dependencias**.
Le diremos a GitHub Actions: *"Cuando termines de descargar los node_modules la primera vez, comprímelos en un archivo zip y guárdalos secretamente en los servidores de GitHub. La próxima vez que corras, revisa si el package-lock.json ha cambiado. Si no cambió, saca ese archivo zip secreto y pégalo directamente, saltándote toda la descarga de internet"*.

Curiosamente, no tenemos que hacer algoritmos complejos para esto. La action `actions/setup-node` que usamos antes, trae esta magia incorporada simplemente añadiendo otro parámetro en el bloque `with`.

**El Workflow Final y Profesional:**
```yaml
name: Validacion Continua
on: [push, pull_request]
jobs:
  pruebas_y_estilos:
    runs-on: ubuntu-latest
    steps:
      - name: Descargar codigo
        uses: actions/checkout@v4
        
      - name: Configurar Node.js y Caché
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm' # <- Esta linea magica ahorra minutos de descarga
          
      - name: Instalar dependencias
        run: npm ci
        
      - name: Linter
        run: npm run lint
        
      - name: Pruebas
        run: npm run test
```

Has dominado la mitad del rompecabezas (el CI). Tienes la confianza de que ningún código defectuoso arruinará la rama principal. En el próximo módulo, daremos el paso audaz: tomar ese código perfecto y enviarlo al mundo real de los servidores con el **Despliegue Continuo (CD)**.
