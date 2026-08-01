## El Arte de Deshacer en Git

Equivocarse es parte del proceso. La diferencia entre un principiante y un profesional no es que el profesional no cometa errores, sino que **sabe cómo deshacerlos sin entrar en pánico**.

Git tiene múltiples herramientas para deshacer cambios, cada una diseñada para un escenario diferente. En este módulo aprenderás cuándo y cómo usar cada una.

---

## git stash — El Cajón Temporal

Imagina este escenario: estás a mitad de una funcionalidad nueva, con código a medio escribir que todavía no funciona. De repente, tu jefe te dice: *"¡Hay un bug urgente en producción, arréglalo YA!"*

No puedes hacer commit de código roto. No puedes cambiar de rama con cambios sin guardar. ¿Qué haces?

**`git stash`** guarda tus cambios en un "cajón temporal" y deja tu Working Directory limpio, como si no hubieras tocado nada:

```bash
# Tu situación actual:
git status
# modified: login.js (cambios a medio hacer)
# modified: styles.css (cambios a medio hacer)

# Guardar todo en el stash
git stash
# Saved working directory and index state WIP on feature/login: a3f5b2c

# Ahora tu directorio está limpio:
git status
# nothing to commit, working tree clean

# ¡Puedes cambiar de rama tranquilo!
git switch main
# (arreglas el bug urgente, haces commit, push...)

# Vuelves a tu rama
git switch feature/login

# Recuperas tus cambios del cajón
git stash pop
# Tus cambios reaparecen exactamente como los dejaste
```

---

### Comandos útiles de stash

```bash
# Guardar con un mensaje descriptivo
git stash save "login a medio hacer - falta validación"

# Ver la lista de stashes guardados
git stash list
# stash@{0}: On feature/login: login a medio hacer - falta validación
# stash@{1}: WIP on main: arreglo temporal del navbar

# Aplicar el stash más reciente SIN eliminarlo de la lista
git stash apply

# Aplicar el stash más reciente Y eliminarlo de la lista
git stash pop

# Aplicar un stash específico (por índice)
git stash apply stash@{1}

# Eliminar un stash específico sin aplicarlo
git stash drop stash@{0}

# Eliminar TODOS los stashes
git stash clear
```

> **En GitHub Desktop:** Cuando intentas cambiar de rama con cambios pendientes, te pregunta: "¿Quieres llevar tus cambios a la otra rama o guardarlos en stash?" Es la misma funcionalidad, pero con un botón.

---

## git commit --amend — Corregir el Último Commit

¿Te pasó alguna vez que hiciste un commit e inmediatamente te diste cuenta de que:
- El mensaje tiene un error de escritura.
- Olvidaste incluir un archivo.
- Quieres agregar un pequeño cambio que debería ir en el mismo commit.

`--amend` te permite **modificar el último commit** sin crear uno nuevo:

```bash
# Caso 1: Solo corregir el mensaje
git commit --amend -m "feat: agregar validación de email en registro"

# Caso 2: Agregar un archivo olvidado al último commit
git add archivo-olvidado.js
git commit --amend --no-edit
# --no-edit mantiene el mismo mensaje del commit original
```

### ¿Qué hace internamente?

`--amend` **no edita** el commit anterior. En realidad, lo **reemplaza** por un commit nuevo con un hash diferente. El commit viejo desaparece del historial.

```
  ANTES:                 DESPUÉS:
  A ── B ── C            A ── B ── C'  (C' reemplaza a C)
             ↑                      ↑
           main                   main
```

> **⚠️ Regla crítica:** Solo usa `--amend` si el commit que quieres modificar **NO ha sido pusheado** aún a GitHub. Si ya lo subiste y alguien más lo descargó, modificar la historia causará problemas graves de sincronización. En ese caso, haz un commit nuevo con la corrección.

---

## git revert — Deshacer de Forma Segura

`git revert` es la forma **segura** de deshacer un commit. En lugar de borrar la historia, crea un **nuevo commit** que aplica los cambios inversos:

```bash
# Revertir el último commit
git revert HEAD

# Revertir un commit específico (por hash)
git revert a3f5b2c
```

### Ejemplo visual:

```
  ANTES:
  A ── B ── C ── D       (main)
  
  git revert C
  
  DESPUÉS:
  A ── B ── C ── D ── "Revert C"    (main)
```

El commit C **sigue existiendo** en la historia. Pero el nuevo commit "Revert C" deshace exactamente lo que C hizo. Si C agregó 10 líneas, "Revert C" las elimina. Si C borró un archivo, "Revert C" lo restaura.

### ¿Por qué es seguro?

- **No borra historia:** Todos los commits anteriores siguen intactos.
- **Es compatible con equipos:** Como es un commit nuevo, no rompe la sincronización de otros desarrolladores.
- **Es trazable:** Cualquiera puede ver en el historial que se deshizo un cambio y por qué.

---

## git reset — Deshacer Borrando Historia (¡Peligroso!)

A diferencia de `revert`, `git reset` **mueve el puntero de la rama hacia atrás**, eliminando commits de la historia visible. Existen tres modos:

### Los tres modos de reset

```bash
# --soft: Mueve HEAD pero MANTIENE los cambios en Staging Area
git reset --soft HEAD~1

# --mixed (el predeterminado): Mueve HEAD y saca los cambios del staging,
# pero los MANTIENE en el Working Directory
git reset --mixed HEAD~1
# Equivalente a: git reset HEAD~1

# --hard: Mueve HEAD y BORRA TODO. Los cambios desaparecen del staging
# Y del working directory. Como si nunca hubieran existido.
git reset --hard HEAD~1
```

### Comparación visual:

```
  ANTES (en los 3 casos):
  A ── B ── C
             ↑
           HEAD/main

  DESPUÉS de git reset HEAD~1:
  A ── B
        ↑
      HEAD/main     (C "desaparece" del historial)
```

### ¿Dónde quedan los cambios del commit C?

- **`--soft`:** ✅ Intacto, ✅ Los cambios de C quedan staged, ❌ C desaparece
- **`--mixed`:** ✅ Los cambios de C quedan como "modified", ❌ Vacío, ❌ C desaparece
- **`--hard`:** ❌ Borrado, ❌ Borrado, ❌ C desaparece

> **⚠️ `git reset --hard` es el comando más destructivo de Git.** Si no hiciste push del commit, y haces `--hard`, esos cambios se pierden para siempre (bueno, casi... existe `git reflog`, que veremos más adelante).

---

## revert vs reset — ¿Cuándo Usar Cada Uno?

- ****¿Borra historia?**** (No. Crea un commit nuevo): Sí. Elimina commits
- ****¿Seguro para equipos?**** (✅ Siempre seguro): ⚠️ Peligroso si ya hiciste push
- ****¿Cuándo usarlo?**** (Cuando el commit ya está en GitHub): Cuando el commit es solo local
- ****Ejemplo de uso**** ("El último deploy rompió producción, necesito revertir YA"): "Acabo de hacer un commit local con basura, quiero borrarlo antes de subirlo"

**Regla simple:**
- ¿Ya hiciste `push`? → Usa `revert`.
- ¿Solo está en tu máquina? → Puedes usar `reset`.

---

## Detached HEAD — "¿Dónde Estoy?"

**Detached HEAD** es uno de los estados que más confusión genera en principiantes. Ocurre cuando `HEAD` apunta directamente a un **commit** en lugar de a una **rama**.

### ¿Cómo se llega a Detached HEAD?

```bash
# Situación normal: HEAD apunta a una RAMA
git log --oneline
# a3f5b2c (HEAD -> main) último commit
# b7e2a1d segundo commit

# Checkout a un commit específico (NO a una rama):
git checkout b7e2a1d

# ¡Git te advierte!
# You are in 'detached HEAD' state. You can look around, make
# experimental changes and commit them, and you can discard any
# commits you make in this state without impacting any branches...
```

### ¿Qué significa visualmente?

```
  NORMAL:                      DETACHED HEAD:
  A ── B ── C                  A ── B ── C
             ↑                      ↑       ↑
           main                   HEAD     main
             ↑
           HEAD                HEAD apunta a B directamente,
                               NO a la rama main
```

### ¿Es peligroso?

**No.** Tu código no se borró. Estás simplemente "visitando" un commit viejo, como un turista mirando una foto antigua. Puedes explorar, leer el código, incluso hacer commits experimentales.

**Pero cuidado:** Si haces commits en estado Detached HEAD y luego cambias de rama, esos commits quedan "huérfanos" y eventualmente Git los eliminará (después de ~30 días).

---

### ¿Cómo salir de Detached HEAD?

```bash
# Opción 1: Volver a una rama existente
git switch main
# HEAD vuelve a apuntar a main. Todo normal.

# Opción 2: Crear una rama nueva desde donde estás
# (útil si hiciste commits experimentales que quieres conservar)
git switch -c mi-rama-experimental
# Ahora esos commits tienen un "hogar" en una rama nombrada.
```

---

## git reflog — La Última Red de Seguridad

`git reflog` es el comando de **último recurso**. Registra TODOS los movimientos que hizo `HEAD`, incluso los que ya no aparecen en `git log` (como commits borrados por `reset`).

```bash
git reflog

# Salida:
# a3f5b2c (HEAD -> main) HEAD@{0}: commit: feat: agregar buscador
# e7d1c3a HEAD@{1}: reset: moving to HEAD~1
# f4b2a5d HEAD@{2}: commit: commit accidental que borré con reset
# c1a3b2e HEAD@{3}: checkout: moving from feature to main
```

### Caso de uso real: Recuperar un commit "borrado"

```bash
# 1. Hiciste un commit importante
git commit -m "feat: agregar sistema de pagos"

# 2. Por error, lo borraste con reset --hard
git reset --hard HEAD~1
# ¡Oh no! ¡El código desapareció!

# 3. Usas reflog para encontrar el hash del commit perdido
git reflog
# f4b2a5d HEAD@{1}: commit: feat: agregar sistema de pagos  ← ¡Aquí está!

# 4. Volver a ese commit
git reset --hard f4b2a5d
# ¡Tu código regresó!
```

> **Git casi nunca borra datos de verdad.** Los commits "eliminados" por `reset` siguen existiendo internamente durante aproximadamente 30 días. `git reflog` es la forma de encontrarlos y recuperarlos.

