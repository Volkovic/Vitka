## git rebase — Reescribiendo la Historia

En el Módulo 3 aprendimos `git merge` como la forma de unir ramas. `git rebase` es la **alternativa** que logra el mismo resultado pero con una historia más limpia y lineal.

### ¿Qué hace rebase?

En lugar de crear un "commit de merge" que une dos líneas de desarrollo, `rebase` **toma tus commits y los "replanta"** sobre la punta de otra rama, como si siempre hubieras trabajado desde la versión más actual:

```
  ANTES (tu rama "feature" divergió de main):

  A ── B ── C ── D            (main)
            \
             E ── F           (feature)  ← HEAD

  DESPUÉS de git rebase main (estando en feature):

  A ── B ── C ── D            (main)
                  \
                   E' ── F'   (feature)  ← HEAD
```

Los commits E y F se "movieron" (en realidad se **recrearon** como E' y F') para que ahora estén basados en D (el último commit de main) en lugar de B.

---

### merge vs rebase — Comparación Visual

```
  CON MERGE:
  A ── B ── C ── D ──── MERGE    (main)
            \          /
             E ── F ──           (feature)
  
  → La historia muestra las dos líneas y el punto de unión.
  → Preserva el contexto de cuándo se creó la rama.
  → Puede volverse visualmente compleja con muchas ramas.

  CON REBASE + MERGE (fast-forward):
  A ── B ── C ── D ── E' ── F'  (main)
  
  → La historia es una línea recta limpia.
  → Parece que todo se hizo secuencialmente.
  → Más fácil de leer con git log.
```

---

### ¿Cuándo usar merge y cuándo rebase?

- **Tu rama local necesita actualizarse con `main`** (`rebase`): Mantiene tu historia limpia antes de abrir un PR
- **Integrar un PR terminado a `main`** (`merge`): Preserva el contexto del trabajo en equipo
- **Rama compartida con otros** (`merge`): Rebase reescribe la historia, lo cual es peligroso si otros ya la descargaron
- **Rama personal solo tuya** (`rebase`): No afecta a nadie más y tu historia queda ordenada

### El flujo profesional típico:

```bash
# 1. Estás trabajando en tu rama feature
git switch feature/buscador

# 2. Main avanzó mientras trabajabas (otros hicieron merge de sus PRs)
#    Quieres incorporar esos cambios a tu rama
git fetch origin
git rebase origin/main

# 3. Si hay conflictos, los resuelves archivo por archivo
# (Git te va guiando paso a paso)
git add archivo-resuelto.js
git rebase --continue

# 4. Tu rama ahora está "actualizada" con main y tu historia es lineal
# 5. Abres el PR normalmente
```

---

### La Regla de Oro del Rebase

> **NUNCA hagas rebase de ramas que ya fueron pusheadas y que otros desarrolladores están usando.**

Si haces `rebase` de una rama pública, los commits cambian de hash (E se convierte en E'). Cualquiera que tenga la versión vieja (con E) tendrá conflictos insolubles al intentar sincronizar.

```bash
# ❌ PELIGROSO: Rebase de una rama compartida
git switch main
git rebase develop   # ¡NO! Otros están usando main

# ✅ SEGURO: Rebase de tu rama personal antes de abrir PR
git switch mi-feature-local
git rebase main      # OK, nadie más usa mi-feature-local
```

---

## Squash — Aplastar Commits

Cuando trabajas en una funcionalidad, es normal hacer muchos commits pequeños mientras experimentas:

```bash
git log --oneline
# f4b2a5d fix: typo en el botón
# c1a3b2e fix: ahora sí funciona el hover
# a7e2b1c fix: olvidé importar el componente
# d3f5c4a feat: agregar botón de compartir
```

Antes de abrir un PR, esos 4 commits desordenados deberían condensarse en **uno solo** limpio y profesional. Eso es hacer **squash**.

---

### Método 1: Rebase Interactivo

```bash
# Aplastar los últimos 4 commits en uno solo
git rebase -i HEAD~4
```

Git abre un editor con esta lista:

```
pick d3f5c4a feat: agregar botón de compartir
pick a7e2b1c fix: olvidé importar el componente
pick c1a3b2e fix: ahora sí funciona el hover
pick f4b2a5d fix: typo en el botón
```

Cambias `pick` por `squash` (o `s`) en los commits que quieres fusionar con el anterior:

```
pick d3f5c4a feat: agregar botón de compartir
squash a7e2b1c fix: olvidé importar el componente
squash c1a3b2e fix: ahora sí funciona el hover
squash f4b2a5d fix: typo en el botón
```

Git te pedirá un nuevo mensaje de commit. Escribes uno limpio:

```
feat: agregar botón de compartir con efecto hover
```

Resultado: Los 4 commits se convierten en 1 solo commit profesional.

---

### Las 3 formas de Merge en GitHub

Cuando un Pull Request es aprobado, GitHub te da 3 opciones para integrarlo:

1. **Create a merge commit:** Conserva todos los commits individuales de la rama y crea un commit extra de "merge". Es útil si quieres mantener toda la historia exacta de cómo se desarrolló.
2. **Squash and merge:** Toma todos los commits del PR, los aplasta en **uno solo**, y lo agrega a `main`. Es la opción preferida por la mayoría de equipos porque mantiene el historial de `main` extremadamente limpio (un PR = un commit).
3. **Rebase and merge:** Toma todos los commits del PR y los agrega al final de `main` secuencialmente, sin crear un commit de merge. Conserva los commits individuales pero en una línea recta.

---

## git cherry-pick — Elegir Commits Específicos

`git cherry-pick` te permite tomar **un commit específico** de cualquier rama y aplicarlo en tu rama actual, sin hacer merge de toda la rama:

```bash
# Encontrar el hash del commit que necesitas
git log --oneline feature/pagos
# a1b2c3d agregar validación de tarjeta  ← ¡Este lo necesito!
# e4f5g6h crear formulario de pago
# h7i8j9k configurar pasarela

# Estando en tu rama, tomar solo ese commit
git switch main
git cherry-pick a1b2c3d

# Resultado: Solo el commit a1b2c3d se aplica a main.
# Los demás commits de feature/pagos NO se tocan.
```

### Diagrama visual:

```
  ANTES:
  A ── B ── C                 (main) ← HEAD
            \
             D ── E ── F      (feature)

  git cherry-pick E:

  DESPUÉS:
  A ── B ── C ── E'           (main) ← HEAD
            \
             D ── E ── F      (feature)  ← E sigue aquí también
```

### ¿Cuándo usarlo?

- Un compañero corrigió un bug en su rama que tú necesitas urgentemente en la tuya, pero su PR aún no fue mergeado.
- Necesitas un commit específico de una rama de desarrollo en una rama de hotfix de producción.
- Hiciste un commit en la rama equivocada y quieres "copiarlo" a la correcta.

---

## Tags — Etiquetando Versiones

Un **tag** (etiqueta) en Git es un marcador permanente que apunta a un commit específico. Se usa para señalar **versiones importantes** del software (releases).

```bash
# Crear un tag en el commit actual
git tag v1.0.0

# Crear un tag con mensaje (tag anotado, el más profesional)
git tag -a v1.0.0 -m "Primera versión estable del producto"

# Ver todos los tags
git tag
# v0.1.0
# v0.2.0
# v1.0.0

# Ver información detallada de un tag
git show v1.0.0

# Subir tags a GitHub
git push origin v1.0.0

# Subir TODOS los tags
git push origin --tags
```

### Tags vs Ramas:

- **¿Se mueve?** (❌ Siempre apunta al mismo commit): ✅ Avanza con cada nuevo commit
- **¿Para qué?** (Marcar versiones (v1.0.0, v2.3.1)): Trabajo en progreso
- **¿Es mutable?** (No (es una "foto" permanente)): Sí (crece con el tiempo)

---

## Versionado Semántico (SemVer)

El estándar de la industria para nombrar versiones es **Semantic Versioning**:

```
  v MAJOR . MINOR . PATCH
    │        │        │
    │        │        └── Corrección de bugs (compatible)
    │        └── Nueva funcionalidad (compatible)
    └── Cambio que ROMPE compatibilidad
```

### Ejemplos:

- **`v1.0.0` → `v1.0.1`:** Se corrigió un bug. Tu código sigue funcionando igual.
- **`v1.0.1` → `v1.1.0`:** Se agregó una funcionalidad nueva. Tu código sigue funcionando.
- **`v1.1.0` → `v2.0.0`:** Se hizo un cambio que rompe la compatibilidad. Podrías necesitar modificar tu código.

---

## GitHub Releases — Publicar Versiones

Un **Release** en GitHub es una versión empaquetada de tu software, basada en un tag. Es la forma profesional de distribuir tu código:

1. Ve a tu repositorio en GitHub → **Releases** → **Draft a new release**.
2. Selecciona un tag existente (o crea uno nuevo).
3. Agrega un título y **Release Notes** describiendo qué cambió.
4. Opcionalmente, adjunta archivos binarios (ej. el `.exe` compilado).
5. Publica.

### Ejemplo de Release Notes:

```markdown
## v2.1.0 - Buscador Inteligente

### ✨ Nuevas funcionalidades
- Agregar buscador con autocompletado
- Filtros por categoría y rango de precio

### 🐛 Correcciones
- Corregir error al cerrar sesión en Safari
- Arreglar alineación del footer en móviles

### 🔧 Mantenimiento
- Actualizar React de 18.2 a 18.3
- Migrar de Jest a Vitest para los tests
```

---

### Ejercicio Práctico 1

**Lee la siguiente lista de commits y razona: ¿Cómo quedaría el historial después de hacer squash de los últimos 3 commits? ¿Qué mensaje usarías?**

```bash
git log --oneline
# f4b2a5d fix: ajustar padding del formulario
# c1a3b2e fix: corregir validación del email
# a7e2b1c feat: crear formulario de contacto
# d3f5c4a feat: agregar página About
# e5g6h7i feat: crear landing page
```

**[Solución]**
```bash
# Si hacemos squash de los últimos 3 commits (f4b2a5d, c1a3b2e, a7e2b1c),
# el historial quedaría así:
#
# NUEVO_HASH feat: crear formulario de contacto con validación
# d3f5c4a   feat: agregar página About
# e5g6h7i   feat: crear landing page
#
# Los 3 commits se fusionan en 1 solo. El mensaje debería describir
# el resultado FINAL del trabajo, no los pasos intermedios:
#
# ✅ "feat: crear formulario de contacto con validación de email"
# ❌ "feat + fix + fix: formulario, validación y padding"
#
# Nota: Los commits d3f5c4a y e5g6h7i NO se ven afectados.
# El squash solo aplica a los commits que seleccionaste.
```

---

### Ejercicio Práctico 2

**Tu proyecto está en la versión `v3.2.1`. Determina cuál sería la nueva versión para cada uno de estos cambios según SemVer:**

1. Corregiste un bug donde los precios se mostraban sin decimales.
2. Agregaste un sistema de notificaciones push.
3. Cambiaste la base de datos de MySQL a PostgreSQL, lo que requiere que todos los usuarios migren sus datos.

**[Solución]**
```bash
# 1. Corrección de bug → PATCH: v3.2.2
#    Solo se incrementa el último número (PATCH).
#    Es un fix que no agrega funcionalidad ni rompe nada.
#
# 2. Nueva funcionalidad → MINOR: v3.3.0
#    Se incrementa el número del medio (MINOR) y el PATCH se reinicia a 0.
#    Es una funcionalidad nueva que no rompe la compatibilidad existente.
#    Los usuarios existentes no necesitan cambiar nada en su código.
#
# 3. Cambio que rompe compatibilidad → MAJOR: v4.0.0
#    Se incrementa el primer número (MAJOR) y los otros se reinician a 0.
#    Cambiar la base de datos requiere que los usuarios migren,
#    lo cual es un "breaking change" (cambio rompedor).
```

---

### Ejercicio Práctico 3

**Lee el siguiente diagrama. Si estás en la rama `main` y ejecutas `git cherry-pick E`, ¿cuál es el resultado?**

```
  A ── B ── C ── D              (main) ← HEAD
            \
             E ── F ── G        (feature/auth)
```

**[Solución]**
```bash
# Resultado después de cherry-pick E:
#
#  A ── B ── C ── D ── E'       (main) ← HEAD
#            \
#             E ── F ── G       (feature/auth)
#
# Solo el commit E se copia a main como E' (con un hash nuevo).
# Los commits F y G NO se tocan. La rama feature/auth queda intacta.
#
# E' contiene exactamente los mismos CAMBIOS que E, pero es un
# commit diferente (distinto hash, distinto padre). Es una "copia"
# de los cambios, no un "movimiento".
#
# La rama feature/auth sigue teniendo E, F y G. Nada se eliminó
# de ella. Cuando eventualmente hagas merge de feature/auth a main,
# Git es lo suficientemente inteligente para detectar que los cambios
# de E ya fueron aplicados y no generará conflicto duplicado.
```
