## ¿Qué es una Rama (Branch)?

Imagina que estás escribiendo un libro. Un día se te ocurre una idea para un capítulo alternativo, pero no quieres arruinar lo que ya tienes. Entonces haces una **copia** del manuscrito, experimentas con la nueva idea, y si te gusta, la incorporas al libro principal. Si no te convence, simplemente la descartas sin haber dañado el original.

Eso es exactamente una **rama** en Git.

Una rama es una **línea independiente de desarrollo**. Te permite trabajar en nuevas funcionalidades, corregir bugs o experimentar sin afectar el código principal del proyecto.

```
          commit1 ── commit2 ── commit3        (main)
                                   \
                                    commit4 ── commit5  (nueva-feature)
```

En este diagrama:
- La rama `main` sigue intacta con sus 3 commits originales.
- La rama `nueva-feature` parte desde el commit 3 y tiene sus propios cambios.
- Ambas ramas coexisten sin interferirse.

---

## ¿Por Qué NUNCA Trabajar Directo en `main`?

La rama `main` (antes llamada `master`) es la **rama de producción**. Representa el código que funciona, que está probado y que los usuarios finales utilizan.

Si todos trabajan directamente en `main`:
- Un error de un desarrollador rompe el código para **todo el equipo**.
- No puedes experimentar sin riesgo.
- No puedes revisar los cambios de otro antes de integrarlos.
- Revertir un error se vuelve un caos.

**La regla de la industria:** Cada nueva funcionalidad, cada bug fix, cada experimento se hace en **su propia rama**. Solo cuando está probado y revisado se integra a `main`.

---

## El Puntero HEAD — "¿Dónde Estoy?"

`HEAD` es un concepto que confunde a muchos, pero en realidad es muy simple:

> **HEAD es un puntero que indica en qué commit estás parado en este momento.**

Normalmente, `HEAD` apunta a una **rama**, y esa rama apunta al último commit de esa rama. Cuando haces un nuevo commit, la rama avanza y `HEAD` se mueve con ella.

```
  commit1 ── commit2 ── commit3
                            ↑
                          main
                            ↑
                          HEAD   ← "Estás aquí"
```

Si cambias de rama (por ejemplo a `develop`), `HEAD` simplemente se mueve para apuntar a esa otra rama:

```
  commit1 ── commit2 ── commit3     (main)
                            \
                             commit4
                                ↑
                             develop
                                ↑
                              HEAD   ← "Ahora estás aquí"
```

---

### Referencias Relativas desde HEAD

Git te permite navegar por la historia usando `HEAD` como punto de partida:

| Referencia | Significado |
|------------|-------------|
| `HEAD` | El commit en el que estás ahora mismo |
| `HEAD~1` | Un commit antes del actual (el "padre") |
| `HEAD~2` | Dos commits antes del actual (el "abuelo") |
| `HEAD~3` | Tres commits atrás |

```
  commitA ── commitB ── commitC ── commitD
                                      ↑
                                    HEAD
  HEAD~3     HEAD~2     HEAD~1     HEAD
```

Esto es increíblemente útil para comandos como `git diff HEAD~2` (ver qué cambió en los últimos 2 commits) o `git reset HEAD~1` (deshacer el último commit).

---

## Comandos Esenciales de Ramas

### Listar ramas

```bash
# Ver todas las ramas locales
git branch

# Salida:
#   develop
# * main          ← El asterisco indica la rama actual (donde está HEAD)
#   feature/login
```

### Crear una rama nueva

```bash
# Crear una rama nueva (pero NO te mueve a ella)
git branch mi-nueva-rama

# Crear Y moverte a la nueva rama en un solo comando
git switch -c mi-nueva-rama
# Equivalente antiguo:
git checkout -b mi-nueva-rama
```

> **Nota:** `git switch` es el comando moderno (Git 2.23+) que reemplaza a `git checkout` para cambiar de rama. Es más intuitivo y menos propenso a errores.

---

### Cambiar de rama

```bash
# Moverte a una rama existente
git switch main
# Equivalente antiguo:
git checkout main

# Verificar en qué rama estás
git branch
# * main
#   mi-nueva-rama
```

> **⚠️ Importante:** Antes de cambiar de rama, asegúrate de que tu Working Directory esté limpio (sin cambios sin commitear). Si tienes cambios pendientes, Git te advertirá y podría negarse a cambiar de rama para no perder tu trabajo. (Más adelante aprenderás `git stash` para resolver esto).

---

### Eliminar una rama

```bash
# Eliminar una rama que YA fue mergeada a main
git branch -d mi-rama-vieja

# Forzar la eliminación de una rama (aunque NO haya sido mergeada)
# ⚠️ Cuidado: perderás los commits que solo existían en esa rama
git branch -D mi-rama-experimental
```

---

## git merge — Unir el Trabajo

Cuando terminas de trabajar en una rama y quieres integrar sus cambios a la rama principal, usas **`git merge`**.

### El flujo típico:

```bash
# 1. Asegurarte de estar en la rama que RECIBIRÁ los cambios
git switch main

# 2. Traer los cambios de la otra rama
git merge mi-feature

# Salida exitosa:
# Merge made by the 'ort' strategy.
#  login.html | 45 +++++++++++++++++++++++++
#  styles.css |  12 ++++++
#  2 files changed, 57 insertions(+)
```

### Tipos de merge que Git puede hacer:

**1. Fast-Forward Merge** (sin divergencia):
Si `main` no tuvo nuevos commits desde que creaste la rama, Git simplemente "avanza" el puntero:

```
  ANTES:
  commit1 ── commit2 ── commit3 ── commit4
                 ↑                    ↑
               main              feature
  
  DESPUÉS (fast-forward):
  commit1 ── commit2 ── commit3 ── commit4
                                      ↑
                                    main (avanzó)
```

**2. Merge Commit** (con divergencia):
Si ambas ramas tuvieron commits nuevos, Git crea un **commit especial de merge** que une ambas líneas:

```
  ANTES:
  commit1 ── commit2 ── commit5          (main)
                   \
                    commit3 ── commit4    (feature)
  
  DESPUÉS:
  commit1 ── commit2 ── commit5 ── MERGE COMMIT   (main)
                   \                    /
                    commit3 ── commit4
```

---

## Conflictos de Merge — El "Choque"

Un **conflicto de merge** ocurre cuando Git **no puede decidir automáticamente** qué versión de una línea mantener, porque dos ramas modificaron la **misma línea** del **mismo archivo** de formas diferentes.

### ¿Cuándo ocurre?

```bash
# En la rama "main", alguien cambió la línea 5 de index.html a:
<h1>Bienvenido a nuestra tienda</h1>

# En la rama "feature", tú cambiaste la misma línea 5 a:
<h1>Bienvenido a nuestro marketplace</h1>

# Cuando intentas hacer merge, Git se detiene:
git merge feature
# CONFLICT (content): Merge conflict in index.html
# Automatic merge failed; fix conflicts and then commit the result.
```

Git no sabe si el título correcto es "tienda" o "marketplace", así que **te pide a ti que lo resuelvas**.

---

### ¿Cómo se ve un conflicto en el archivo?

Cuando Git detecta un conflicto, marca el archivo con indicadores especiales:

```html
<body>
<<<<<<< HEAD
  <h1>Bienvenido a nuestra tienda</h1>
=======
  <h1>Bienvenido a nuestro marketplace</h1>
>>>>>>> feature
</body>
```

### Anatomía de las marcas de conflicto:

| Marca | Significado |
|-------|-------------|
| `<<<<<<< HEAD` | Inicio del conflicto. Lo que sigue es el código de TU rama actual |
| `=======` | Separador entre las dos versiones |
| `>>>>>>> feature` | Fin del conflicto. Lo de arriba es el código de la rama que intentas mergear |

---

### ¿Cómo resolver un conflicto?

**Paso 1:** Abre el archivo en tu editor (VS Code te lo resaltará automáticamente con colores y botones).

**Paso 2:** Decide qué mantener. Tienes 3 opciones:
- **Aceptar el cambio actual** (tu rama): Quedarte con "tienda".
- **Aceptar el cambio entrante** (la otra rama): Quedarte con "marketplace".
- **Combinar ambos** manualmente: Escribir algo completamente nuevo.

**Paso 3:** Elimina TODAS las marcas de conflicto (`<<<<<<<`, `=======`, `>>>>>>>`) y deja solo el código final que quieres:

```html
<body>
  <h1>Bienvenido a nuestro marketplace online</h1>
</body>
```

**Paso 4:** Marca el conflicto como resuelto y haz el commit del merge:

```bash
git add index.html
git commit -m "merge: integrar feature, resolver conflicto en título"
```

> **En GitHub Desktop:** La interfaz te muestra los conflictos de forma visual y te guía para resolverlos con botones, sin necesidad de editar las marcas manualmente.

---

### Ejercicio Práctico 1

**Lee el siguiente diagrama y responde: ¿Hacia dónde apunta `HEAD`? ¿Cuántos commits tiene cada rama?**

```
  A ── B ── C ── D        (main)
            \
             E ── F ── G  (feature/login)
                     ↑
                   HEAD
```

**[Solución]**
```bash
# HEAD apunta al commit F, que está en la rama "feature/login".
# Esto significa que actualmente estamos "parados" en la rama feature/login,
# específicamente en el commit F.
#
# ¡ESPERA! HEAD apunta a F pero G existe después de F. Esto es un caso
# de "Detached HEAD": HEAD está apuntando directamente a un commit (F)
# en vez de al final de la rama (G). Esto puede pasar si hicimos
# git checkout <hash-de-F> en vez de git switch feature/login.
#
# Si HEAD apuntara a la rama feature/login normalmente, estaría en G.
#
# Commits por rama:
# - main: 4 commits (A, B, C, D)
# - feature/login: 5 commits (A, B, E, F, G) — hereda A y B de main
```

---

### Ejercicio Práctico 2

**Lee el siguiente archivo con un conflicto de merge y escribe cómo quedaría si decides combinar ambas versiones:**

```python
def calcular_descuento(precio):
<<<<<<< HEAD
    descuento = precio * 0.10
    return precio - descuento
=======
    if precio > 100:
        return precio * 0.85
    return precio
>>>>>>> feature/descuentos
```

**[Solución]**
```python
# Una resolución que combina ambas ideas podría ser:

def calcular_descuento(precio):
    if precio > 100:
        descuento = precio * 0.15    # 15% para compras grandes
        return precio - descuento
    else:
        descuento = precio * 0.10    # 10% estándar
        return precio - descuento

# La versión de HEAD aplicaba un 10% siempre.
# La versión de feature/descuentos aplicaba un 15% solo si el precio > 100.
# La resolución combinada mantiene AMBAS lógicas: 15% para precios
# mayores a 100, y 10% para el resto.
#
# Lo importante es que TODAS las marcas de conflicto (<<<, ===, >>>)
# fueron eliminadas. Si dejas alguna marca, el código se rompe.
```

---

### Ejercicio Práctico 3

**¿Qué comandos necesitarías ejecutar para: crear una rama llamada `fix/navbar`, moverte a ella, y luego volver a `main`?**

**[Solución]**
```bash
# Opción 1: Dos comandos separados
git branch fix/navbar        # Crear la rama (sin moverte)
git switch fix/navbar         # Moverte a la rama

# Opción 2: Un solo comando (crear + mover)
git switch -c fix/navbar      # Crear Y moverte en un paso

# Para volver a main:
git switch main

# Verificar en qué rama estás:
git branch
# * main
#   fix/navbar
```
