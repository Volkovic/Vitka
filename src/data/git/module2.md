## Los Tres Estados de Git

Este es probablemente el concepto más importante de todo el curso. Si lo entiendes bien, todo lo demás encajará naturalmente.

Cada archivo en un repositorio Git puede estar en uno de **tres estados** fundamentales. Piensa en ellos como tres "zonas" por las que pasa tu código antes de quedar guardado permanentemente:

```
  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
  │  Working         │     │  Staging Area    │     │  Repository      │
  │  Directory       │────▶│  (Área de        │────▶│  (Historia       │
  │  (Tu carpeta)    │     │   Preparación)   │     │   permanente)    │
  └──────────────────┘     └──────────────────┘     └──────────────────┘
       git add ──────────────▶     git commit ──────────────▶
```

### 1. Working Directory (Directorio de Trabajo)
Es simplemente tu carpeta con los archivos tal como los ves en tu explorador. Cuando editas un archivo con VS Code u otro editor, estás modificando el Working Directory. Git sabe que algo cambió, pero aún no lo está "guardando".

### 2. Staging Area (Área de Preparación)
Es una zona intermedia donde colocas los archivos que **quieres incluir en el próximo commit**. Es como preparar una caja: decides qué meter antes de cerrarla y enviarla.

### 3. Repository (Repositorio / Historia)
Cuando haces un commit, los archivos del Staging Area se "fotografían" permanentemente en la historia de Git. Ese snapshot queda grabado para siempre (o hasta que lo borres intencionalmente).

---

## ¿Por Qué Existe el Staging Area?

Muchos principiantes se preguntan: *"¿Por qué no puedo guardar directamente? ¿Para qué sirve ese paso intermedio?"*

El Staging Area te da **control granular** sobre lo que guardas. Imagina que modificaste 5 archivos, pero solo 3 están relacionados con la funcionalidad que terminaste. Con el Staging Area puedes:

1. Agregar solo esos 3 archivos al staging.
2. Hacer un commit limpio y descriptivo solo con esos 3 cambios.
3. Los otros 2 archivos quedan en el Working Directory esperando un commit futuro.

Sin esta zona intermedia, cada commit incluiría TODO lo que cambiaste, creando un historial desordenado e imposible de entender.

---

## git status — ¿Qué Cambió?

El comando `git status` es tu **brújula**. Te muestra exactamente en qué estado se encuentra cada archivo de tu proyecto:

```bash
git status

# Salida típica:
# On branch main
# Changes not staged for commit:
#   (use "git add <file>..." to update what will be committed)
#         modified:   index.html
#
# Untracked files:
#   (use "git add <file>..." to include in what will be committed)
#         styles.css
#
# no changes added to commit (use "git add" to track files)
```

### ¿Cómo leer la salida?

- **Untracked files:** Archivos nuevos que Git aún no conoce. Nunca fueron añadidos al staging.
- **Changes not staged:** Archivos que Git ya rastrea, fueron modificados, pero aún NO están en el Staging Area.
- **Changes to be committed:** Archivos que ya están en el Staging Area, listos para el próximo commit.
- **nothing to commit, working tree clean:** Todo está guardado. No hay cambios pendientes.

**Consejo:** Ejecuta `git status` constantemente. Es gratuito, no modifica nada y te mantiene orientado sobre lo que está pasando.

---

## git add — Preparar Archivos para el Commit

El comando `git add` mueve archivos del **Working Directory** al **Staging Area**:

```bash
# Agregar UN archivo específico al staging
git add index.html

# Agregar VARIOS archivos
git add index.html styles.css app.js

# Agregar TODOS los archivos modificados y nuevos del directorio actual
git add .
```

### La diferencia entre `git add archivo` y `git add .`

```bash
# Solo agrega "app.js" al staging. Los demás archivos modificados
# quedan fuera del próximo commit.
git add app.js

# Agrega ABSOLUTAMENTE TODO lo que cambió en la carpeta actual
# y subcarpetas. Útil pero peligroso: podrías incluir archivos
# que no querías commitear (como archivos de configuración local
# o variables de entorno).
git add .
```

> **Buena práctica:** Prefiere `git add archivo1 archivo2` sobre `git add .` para mantener commits enfocados y limpios. Solo usa `git add .` cuando estés seguro de que quieres incluir todo.

---

## git commit — Guardar la "Foto" Permanente

El comando `git commit` toma todo lo que está en el Staging Area y lo guarda como un **snapshot permanente** en la historia del proyecto:

```bash
# Commit con mensaje corto (la forma más común)
git commit -m "Agregar página de contacto"

# Salida:
# [main a3f5b2c] Agregar página de contacto
#  2 files changed, 45 insertions(+), 3 deletions(-)
```

### ¿Qué información guarda cada commit?

Cada commit almacena:
- **El snapshot** de todos los archivos en ese momento exacto.
- **El autor** (tu `user.name` y `user.email` configurados).
- **La fecha y hora** exacta.
- **El mensaje** que describe qué se hizo.
- **Un hash SHA-1 único** (ej. `a3f5b2c`) que identifica este commit de forma irrepetible en todo el universo.

---

### El Flujo Completo: Edit → Add → Commit

Veamos el ciclo completo en acción:

```bash
# 1. Editas un archivo (en tu editor, VS Code, etc.)
#    → El archivo pasa a estado "modified" en el Working Directory

# 2. Preparas el archivo para el commit
git add index.html
#    → El archivo se mueve al Staging Area

# 3. Guardas permanentemente
git commit -m "Actualizar el título de la página principal"
#    → El archivo queda grabado en la historia de Git

# 4. Verificas que todo está limpio
git status
#    → "nothing to commit, working tree clean"
```

---

## git diff — Ver Qué Cambió Exactamente

Mientras `git status` te dice **qué archivos** cambiaron, `git diff` te muestra **qué líneas** dentro de esos archivos se modificaron:

```bash
git diff

# Salida (ejemplo):
# diff --git a/index.html b/index.html
# --- a/index.html
# +++ b/index.html
# @@ -3,7 +3,7 @@
#  <head>
# -    <title>Mi Sitio</title>
# +    <title>Mi Portfolio Personal</title>
#  </head>
```

### ¿Cómo leer la salida de `git diff`?

- **`---` y `+++`:** El archivo antes (`---`) y después (`+++`) del cambio
- **Líneas con `-` (rojo):** Líneas que se **eliminaron**
- **Líneas con `+` (verde):** Líneas que se **agregaron**
- **Líneas sin símbolo:** Líneas que **no cambiaron** (contexto)

### Variantes útiles de diff

```bash
# Ver cambios en el Working Directory (NO staged)
git diff

# Ver cambios que YA están en el Staging Area
git diff --staged

# Ver cambios entre dos commits específicos
git diff abc1234 def5678
```

---

## git log — El Historial de Commits

`git log` muestra la lista de todos los commits realizados, del más reciente al más antiguo:

```bash
git log

# Salida:
# commit e4c5b2a1d3f... (HEAD -> main)
# Author: Ana García <ana@example.com>
# Date:   Mon Jul 28 14:30:00 2026
#
#     Agregar formulario de contacto
#
# commit 7b2a1c3d4e5...
# Author: Ana García <ana@example.com>
# Date:   Mon Jul 28 10:15:00 2026
#
#     Crear estructura base del proyecto
```

### Variantes útiles de log

```bash
# Vista compacta: una línea por commit
git log --oneline
# e4c5b2a Agregar formulario de contacto
# 7b2a1c3 Crear estructura base del proyecto

# Ver los últimos 5 commits
git log -5

# Ver qué archivos se modificaron en cada commit
git log --stat

# Vista gráfica de las ramas (muy útil cuando hay varias ramas)
git log --oneline --graph --all
```

---

## .gitignore — Archivos que Git Debe Ignorar

No todo debe ser rastreado por Git. Existen archivos que **nunca** deberían subirse a un repositorio:

- **Dependencias descargadas:** `node_modules/`, `venv/`, `__pycache__/`
- **Variables secretas:** `.env` (contraseñas, API keys, tokens)
- **Archivos del sistema operativo:** `.DS_Store` (Mac), `Thumbs.db` (Windows)
- **Archivos compilados:** `dist/`, `build/`, `*.pyc`

Para decirle a Git que ignore estos archivos, creas un archivo llamado **`.gitignore`** en la raíz de tu proyecto:

```bash
# .gitignore

# Dependencias
node_modules/
venv/

# Variables de entorno (secretos)
.env
.env.local

# Archivos del sistema operativo
.DS_Store
Thumbs.db

# Carpetas de compilación
dist/
build/

# Logs
*.log
```

### Reglas de sintaxis de `.gitignore`:

- **`archivo.txt`:** Ignora un archivo específico
- **`carpeta/`:** Ignora toda una carpeta y su contenido
- **`*.log`:** Ignora todos los archivos con extensión `.log`
- **`!importante.log`:** Excepción: NO ignores este archivo aunque coincida con `*.log`
- **`**/temp`:** Ignora cualquier carpeta o archivo llamado `temp` en cualquier nivel

> **⚠️ Importante:** `.gitignore` solo funciona con archivos que Git **aún no está rastreando**. Si ya hiciste `git add` de un archivo `.env` y lo commiteaste, agregarlo al `.gitignore` después no lo eliminará del historial. Tendrías que removerlo explícitamente del rastreo con `git rm --cached .env`.

---

## Conventional Commits — El Estándar Moderno

En equipos profesionales, los mensajes de commit no se escriben al azar. El estándar **Conventional Commits** define una convención clara para que todos los mensajes sean consistentes y legibles:

### Formato:

```
tipo: descripción corta del cambio
```

### Tipos más comunes:

- **`feat`** (Nueva funcionalidad): `feat: agregar sistema de login con Google`
- **`fix`** (Corrección de un bug): `fix: corregir cálculo de impuestos en carrito`
- **`docs`** (Cambios en documentación): `docs: actualizar guía de instalación`
- **`style`** (Formato/estilo): `style: corregir indentación en app.js`
- **`refactor`** (Reestructurar código): `refactor: extraer lógica de validación a utils`
- **`chore`** (Tareas de mantenimiento): `chore: actualizar dependencias de producción`
- **`test`** (Agregar o modificar tests): `test: agregar tests para el módulo de pagos`

### ¿Por qué es importante?

```bash
# ❌ Mensajes malos (nadie entiende qué pasó):
git commit -m "cambios"
git commit -m "fix"
git commit -m "asdasd"
git commit -m "ahora sí funciona"

# ✅ Mensajes con Conventional Commits (cualquiera entiende la historia):
git commit -m "feat: agregar buscador con filtros por categoría"
git commit -m "fix: corregir error de redirección después del login"
git commit -m "docs: documentar endpoint GET /api/users"
git commit -m "refactor: simplificar lógica de validación de formularios"
```

Con mensajes bien escritos, puedes leer el `git log` de un proyecto y entender toda su evolución sin abrir un solo archivo.

---

### Ejercicio Práctico 1

**Lee la siguiente secuencia de comandos y razona: ¿Cuál es el estado de cada archivo ANTES del commit?**

```bash
echo "Hola" > archivo1.txt
echo "Mundo" > archivo2.txt
git add archivo1.txt
git status
```

**[Solución]**
```bash
# Después de ejecutar estos comandos:
#
# archivo1.txt → Está en el STAGING AREA (fue agregado con git add).
#   Aparecerá bajo "Changes to be committed" en verde.
#
# archivo2.txt → Está en el WORKING DIRECTORY como "Untracked".
#   Git lo ve como un archivo nuevo que nunca fue registrado.
#   Aparecerá bajo "Untracked files".
#
# Si hicieras git commit ahora, SOLO archivo1.txt se guardaría
# en el commit. archivo2.txt quedaría fuera porque nunca se
# añadió al staging con git add.
```

---

### Ejercicio Práctico 2

**¿Qué mensaje de commit seguiría el estándar Conventional Commits para cada uno de estos cambios?**

1. Agregaste un botón de "modo oscuro" a la interfaz.
2. Arreglaste un error donde los usuarios no podían cerrar sesión.
3. Cambiaste el README para incluir instrucciones de instalación.
4. Eliminaste código comentado que ya no se usaba.

**[Solución]**
```bash
# 1. feat: agregar botón de modo oscuro en la barra de navegación
#    → Es una funcionalidad NUEVA, por eso usamos "feat".
#
# 2. fix: corregir error al cerrar sesión que redirigía a página 404
#    → Es la corrección de un BUG existente, por eso usamos "fix".
#
# 3. docs: agregar instrucciones de instalación al README
#    → Solo se cambió DOCUMENTACIÓN, por eso usamos "docs".
#
# 4. chore: eliminar código comentado obsoleto
#    → Es una tarea de LIMPIEZA/MANTENIMIENTO que no cambia la
#      funcionalidad ni arregla un bug, por eso usamos "chore".
```

---

### Ejercicio Práctico 3

**Lee la siguiente salida de `git diff` y responde: ¿Qué cambió exactamente en el archivo?**

```diff
diff --git a/config.js b/config.js
--- a/config.js
+++ b/config.js
@@ -1,5 +1,5 @@
 const config = {
-  port: 3000,
+  port: 8080,
   host: 'localhost',
-  debug: false
+  debug: true
 };
```

**[Solución]**
```bash
# Se hicieron 2 cambios en el archivo config.js:
#
# 1. La línea "port: 3000" fue REEMPLAZADA por "port: 8080"
#    → Se cambió el puerto del servidor de 3000 a 8080.
#
# 2. La línea "debug: false" fue REEMPLAZADA por "debug: true"
#    → Se activó el modo debug (probablemente para desarrollo).
#
# Las líneas sin símbolo (const config, host: 'localhost', };)
# no cambiaron. Git las muestra como contexto para que entiendas
# dónde ocurrieron los cambios dentro del archivo.
```
