## El Concepto de "Remoto" (Remote)

Hasta ahora, todo lo que hemos hecho con Git ha sido **local**: en tu propia computadora. Pero el verdadero poder de Git aparece cuando conectas tu repositorio local con un **servidor remoto** como GitHub.

Un **remoto** es simplemente una copia de tu repositorio que vive en un servidor en internet. Cuando clonas un repositorio, Git automáticamente crea una conexión con el servidor de origen y la llama **`origin`**.

```bash
# Ver los remotos configurados en tu repositorio
git remote -v

# Salida típica:
# origin  https://github.com/tu-usuario/mi-proyecto.git (fetch)
# origin  https://github.com/tu-usuario/mi-proyecto.git (push)
```

`origin` es solo un **nombre por convención**. Podrías llamarlo como quieras, pero toda la comunidad usa `origin` para referirse al servidor principal.

---

### La Relación Local ↔ Remoto

Cuando trabajas con remotos, existen **tres capas** de ramas que debes entender:

```
  TU COMPUTADORA                          GITHUB
  ┌────────────────────────┐              ┌──────────────────┐
  │  main (local)          │              │  main (remoto)   │
  │  origin/main (tracking)│─────────────▶│                  │
  └────────────────────────┘              └──────────────────┘
```

- **`main`** (Tu PC): Tu copia local con tus cambios
- **`origin/main`** (Tu PC (tracking)): Una "foto" de cómo estaba `main` en GitHub la última vez que sincronizaste
- **`main` en GitHub** (En la nube): La versión "oficial" del código

---

## git push — Subir Cambios al Remoto

`git push` toma los commits de tu rama local y los **sube** al servidor remoto:

```bash
# Subir la rama actual al remoto "origin"
git push origin main

# Si ya configuraste el upstream (tracking), basta con:
git push
```

### Primera vez que subes una rama nueva

Si creaste una rama local que no existe en GitHub, la primera vez necesitas decirle a Git que la cree en el remoto y establezca la conexión:

```bash
# Crear la rama en GitHub y vincularla
git push -u origin mi-nueva-rama
# -u (o --set-upstream) establece el tracking

# A partir de ahora, desde esa rama solo necesitas:
git push
```

### ¿Qué pasa si alguien subió cambios antes que tú?

```bash
git push
# ! [rejected] main -> main (fetch first)
# error: failed to push some refs
# hint: Updates were rejected because the remote contains work that you do not have locally.
```

Esto significa que el remoto tiene commits que tú no tienes. **Git se niega a subir** para no sobrescribir el trabajo de otra persona. La solución: primero descarga los cambios con `git pull` y luego intenta el push de nuevo.

### git push --force (Peligro)
Existe una forma de obligar a Git a aceptar tus cambios y sobrescribir el historial remoto:
```bash
git push --force origin main
```
**NUNCA** uses `--force` en ramas compartidas (como `main` o `develop`), ya que destruirás el código que subieron tus compañeros. Solo se usa en tu propia rama de trabajo (por ejemplo, después de hacer un `rebase` o modificar el historial localmente).

## git fetch — Descargar Sin Aplicar

`git fetch` descarga los últimos cambios del remoto a tu computadora, pero **no los aplica** a tus archivos. Solo actualiza las ramas de tracking (`origin/main`, `origin/develop`, etc.):

```bash
git fetch origin

# Salida:
# remote: Counting objects: 12, done.
# From https://github.com/tu-usuario/mi-proyecto
#    a1b2c3d..e4f5g6h  main       -> origin/main
#    * [new branch]    feature/api -> origin/feature/api
```

Después del fetch, tu rama local `main` sigue exactamente como estaba. Pero `origin/main` ahora refleja lo último que hay en GitHub. Puedes **inspeccionar** lo que cambió antes de decidir si lo incorporas:

```bash
# Ver qué commits hay en el remoto que tú no tienes
git log main..origin/main --oneline

# Ver las diferencias entre tu código y el del remoto
git diff main origin/main
```

> **¿Qué ramas descarga `git clone`?**
> Cuando usas `git clone`, Git descarga **todas** las ramas del repositorio remoto (y puedes verlas con `git branch -r`). Sin embargo, localmente solo te crea y te posiciona en la rama principal (`main` o `master`). Si quieres trabajar en otra rama que descargaste, solo usa `git switch nombre-rama` y Git creará tu copia local conectada a la remota.

---

## git pull — Descargar Y Aplicar

`git pull` es básicamente un atajo que combina dos operaciones:

```
git pull = git fetch + git merge
```

Descarga los cambios del remoto y luego los **fusiona** automáticamente con tu rama local:

```bash
git pull origin main

# Salida:
# Updating a1b2c3d..e4f5g6h
# Fast-forward
#  README.md | 5 +++--
#  1 file changed, 3 insertions(+), 2 deletions(-)
```

---

### fetch vs pull — ¿Cuándo Usar Cada Uno?

- **`git fetch`:** ✅, ❌, Ninguno, Cuando quieres VER qué hay de nuevo antes de aplicarlo
- **`git pull`:** ✅, ✅ (merge), Puede generar conflictos, Cuando confías en que los cambios no chocarán con los tuyos

**Recomendación profesional:** En equipos grandes, muchos prefieren hacer `git fetch` + revisar + `git merge` manual, en lugar de `git pull` directo. Esto te da más control y evita merges sorpresa.

---

## Múltiples Remotos: `origin` y `upstream`

Cuando haces un **fork** de un repositorio en GitHub (es decir, creas tu propia copia de un proyecto de otra persona), trabajas con **dos remotos**:

- **`origin`** (**Tu fork** en GitHub): Subir tus cambios
- **`upstream`** (**El repositorio original**): Descargar actualizaciones del proyecto original

```bash
# Ver remotos actuales
git remote -v
# origin   https://github.com/TU-USUARIO/proyecto.git (fetch)
# origin   https://github.com/TU-USUARIO/proyecto.git (push)

# Agregar el repositorio original como "upstream"
git remote add upstream https://github.com/AUTOR-ORIGINAL/proyecto.git

# Ahora tienes dos remotos:
git remote -v
# origin   https://github.com/TU-USUARIO/proyecto.git (fetch)
# origin   https://github.com/TU-USUARIO/proyecto.git (push)
# upstream https://github.com/AUTOR-ORIGINAL/proyecto.git (fetch)
# upstream https://github.com/AUTOR-ORIGINAL/proyecto.git (push)
```

### Flujo típico con forks:

```bash
# 1. Descargar las últimas actualizaciones del proyecto original
git fetch upstream

# 2. Integrar esos cambios a tu rama main local
git switch main
git merge upstream/main

# 3. Subir tu main actualizado a TU fork en GitHub
git push origin main
```

---

## Autenticación con GitHub

Cuando haces `push` a GitHub, necesitas demostrar que eres tú. Hay dos métodos principales:

### 1. Token de Acceso Personal (PAT)

Desde 2021, GitHub dejó de aceptar contraseñas para operaciones Git. En su lugar, necesitas un **Personal Access Token**:

```bash
# Cuando Git pide contraseña, pegas tu token en lugar del password
# Username: tu-usuario
# Password: ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Para crear un PAT: GitHub → Settings → Developer Settings → Personal Access Tokens → Generate New Token.

### 2. SSH Keys (el método profesional)

Una **SSH Key** es un par de archivos criptográficos (una clave pública y una privada) que funcionan como una "llave digital". Una vez configurada, nunca más necesitas escribir usuario ni contraseña:

```bash
# Generar un par de llaves SSH
ssh-keygen -t ed25519 -C "tu@email.com"

# Esto crea dos archivos:
# ~/.ssh/id_ed25519       ← Clave PRIVADA (NUNCA la compartas)
# ~/.ssh/id_ed25519.pub   ← Clave PÚBLICA (esta se sube a GitHub)
```

Después de generarla, copias el contenido de la clave pública (`.pub`) y la agregas en: GitHub → Settings → SSH and GPG Keys → New SSH Key.

---

## GitHub Desktop para Sincronización

Todo lo que vimos en este módulo se puede hacer desde **GitHub Desktop** de forma visual:

- **Subir cambios** (`git push`): Botón "Push origin" en la barra superior
- **Descargar cambios** (`git pull`): Botón "Fetch origin" → "Pull origin"
- **Crear rama** (`git switch -c nombre`): Menú Branch → New Branch
- **Cambiar de rama** (`git switch nombre`): Selector de ramas en la barra superior
- **Ver historial** (`git log`): Pestaña "History"

> GitHub Desktop ejecuta exactamente los mismos comandos por debajo. Conocer los comandos te ayuda a entender qué hace cada botón y a diagnosticar problemas cuando algo sale mal.

---

### Ejercicio Práctico 1

**Lee la siguiente salida y responde: ¿Cuántos remotos están configurados? ¿Cuál es la URL de cada uno?**

```bash
git remote -v
# origin    https://github.com/ana/mi-portfolio.git (fetch)
# origin    https://github.com/ana/mi-portfolio.git (push)
# upstream  https://github.com/template/portfolio-base.git (fetch)
# upstream  https://github.com/template/portfolio-base.git (push)
```

**[Solución]**
```bash
# Hay 2 remotos configurados:
#
# 1. "origin" → https://github.com/ana/mi-portfolio.git
#    Este es el fork de Ana (su copia personal del proyecto).
#    Aquí es donde Ana sube (push) sus cambios.
#
# 2. "upstream" → https://github.com/template/portfolio-base.git
#    Este es el repositorio ORIGINAL del que Ana hizo fork.
#    Sirve para descargar (fetch) actualizaciones del proyecto base.
#
# Cada remoto aparece dos veces porque tiene una URL para fetch
# (descargar) y otra para push (subir). Generalmente son la misma.
```

---

### Ejercicio Práctico 2

**Lee la siguiente secuencia de comandos y razona: ¿Qué hace cada paso? ¿Por qué Git rechaza el push y cómo se resuelve?**

```bash
# Paso 1
git add .
git commit -m "feat: agregar página de contacto"

# Paso 2
git push
# ! [rejected] main -> main (fetch first)

# Paso 3
git pull

# Paso 4
git push
# Everything up-to-date... ¡Éxito!
```

**[Solución]**
```bash
# Paso 1: Se preparan todos los archivos modificados y se crea un commit
# local con el mensaje "feat: agregar página de contacto".
#
# Paso 2: Se intenta subir el commit a GitHub, pero Git RECHAZA el push.
# El mensaje "fetch first" significa que el remoto (GitHub) tiene commits
# que tu máquina local no tiene. Alguien más (o tú desde otra computadora)
# subió cambios después de tu última sincronización.
# Git se niega a subir para no sobrescribir esos cambios.
#
# Paso 3: git pull descarga los commits faltantes del remoto y los
# fusiona (merge) con tu rama local. Si no hay conflictos, se hace
# automáticamente. Si los hay, tendrías que resolverlos manualmente.
#
# Paso 4: Ahora que tu rama local tiene TODOS los commits (los del
# remoto + los tuyos), Git permite el push exitosamente.
```

---

### Ejercicio Práctico 3

**¿Cuál es la diferencia práctica entre estos dos flujos de trabajo?**

```bash
# Flujo A
git pull origin main

# Flujo B
git fetch origin
git log main..origin/main --oneline
git merge origin/main
```

**[Solución]**
```bash
# Flujo A (git pull):
# Descarga Y aplica los cambios en UN solo paso. Es más rápido pero
# más "ciego": no ves qué cambios se están integrando antes de que
# se apliquen. Si hay un conflicto, te toma por sorpresa.
#
# Flujo B (fetch + log + merge):
# Descarga los cambios (fetch) pero NO los aplica aún. Luego
# inspecciona qué commits nuevos hay (log) para entender qué cambió.
# Finalmente, si todo se ve bien, los integra manualmente (merge).
#
# El Flujo B es más seguro y profesional porque te da visibilidad
# completa antes de modificar tu código. En equipos grandes, es la
# práctica recomendada para evitar sorpresas.
```
