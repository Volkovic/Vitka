## GitHub Flow — El Estándar de la Industria

En las empresas modernas, **casi nadie** hace push directamente a la rama `main`. En su lugar, se sigue un flujo de trabajo llamado **GitHub Flow**, que garantiza que todo código sea revisado antes de integrarse al proyecto principal.

### Los 5 pasos del GitHub Flow:

```
  1. CREAR RAMA    →   2. HACER COMMITS   →   3. ABRIR PULL REQUEST
       ↑                                              ↓
  5. MERGE A MAIN  ←   4. CODE REVIEW     ←   (discusión y revisión)
```

1. **Crear una rama** desde `main` para tu funcionalidad o fix.
2. **Hacer commits** con tu trabajo en esa rama.
3. **Abrir un Pull Request** en GitHub para proponer tus cambios.
4. **Code Review:** Tus compañeros revisan el código, dejan comentarios y sugieren cambios.
5. **Merge a `main`:** Una vez aprobado, se integra el código a la rama principal.

Este flujo asegura que ningún código llega a producción sin ser revisado por al menos otra persona.

---

## ¿Qué es un Pull Request (PR)?

Un **Pull Request** es una propuesta formal para integrar los cambios de una rama a otra. No es un concepto de Git en sí, sino una funcionalidad de **GitHub** (y plataformas similares como GitLab y Bitbucket).

Cuando abres un PR, estás diciendo: *"Terminé mi trabajo en esta rama. Por favor, revisen mis cambios antes de mergearlos a main."*

Un PR contiene:
- **El diff completo:** Todas las líneas que agregaste, eliminaste o modificaste.
- **Un título y descripción** explicando qué se hizo y por qué.
- **Una conversación:** Donde los revisores pueden dejar comentarios y preguntas.
- **El estado de los checks automáticos** (si tienes GitHub Actions configurado).

---

### Cómo Abrir un Pull Request

**Desde GitHub Desktop:**
1. Haz push de tu rama a GitHub.
2. GitHub Desktop te mostrará un botón azul: **"Create Pull Request"**.
3. Te redirige a la web de GitHub con el formulario del PR.

**Desde la web de GitHub:**
1. Después de hacer push, GitHub muestra un banner amarillo: *"tu-rama had recent pushes. Compare & pull request"*.
2. Haz clic en **"Compare & pull request"**.
3. Completa el formulario.

---

### Anatomía de un Buen Pull Request

Un PR profesional debe incluir:

```markdown
## Título del PR
feat: agregar sistema de autenticación con OAuth

## Descripción
### ¿Qué se hizo?
- Integrar login con Google OAuth 2.0
- Agregar middleware de verificación de sesión
- Crear página de callback para la redirección

### ¿Por qué?
Los usuarios actualmente necesitan crear una cuenta manual. Con OAuth,
pueden loguearse con un clic usando su cuenta de Google existente.

### ¿Cómo probarlo?
1. Ejecutar `npm run dev`
2. Ir a http://localhost:3000/login
3. Hacer clic en "Iniciar sesión con Google"
4. Verificar que se redirige al dashboard después del login

### Screenshots (si aplica)
[Captura de la página de login con el botón de Google]
```

> **Regla de oro:** Si un revisor tiene que abrir el código para entender *qué* hace tu PR, la descripción es insuficiente. El revisor debería entender el "qué" y el "por qué" antes de leer una sola línea de código.

---

## Draft Pull Requests

A veces quieres abrir un PR **antes de terminar** tu trabajo, para:
- Pedir feedback temprano sobre tu enfoque.
- Mostrar tu progreso al equipo.
- Discutir una idea antes de invertir más tiempo.

Para esto existen los **Draft PRs** (borradores):

1. Al crear el PR, en lugar de "Create Pull Request", haz clic en la flecha y selecciona **"Create draft pull request"**.
2. El PR se marca con una etiqueta gris de "Draft".
3. **No se puede mergear** mientras esté en draft.
4. Cuando termines, haz clic en **"Ready for review"** para convertirlo en PR normal.

---

## Code Review — Revisando el Código de Otros

El **Code Review** es el proceso de revisar los cambios de un compañero antes de que se integren al proyecto. Es una de las prácticas más valiosas en el desarrollo de software:

### ¿Por qué importa?

- **Atrapa bugs** antes de que lleguen a producción.
- **Comparte conocimiento:** Todos aprenden del código de los demás.
- **Mejora la calidad:** Dos ojos ven más que uno.
- **Documenta decisiones:** La conversación del PR queda como registro.

---

### Cómo Revisar un PR

En la pestaña **"Files changed"** de un PR puedes:

1. **Ver el diff completo** con líneas en verde (añadidas) y rojo (eliminadas).
2. **Dejar comentarios en líneas específicas:** Haz clic en el ícono `+` al lado de cualquier línea para dejar un comentario o sugerencia.
3. **Sugerir cambios con código:**
```suggestion
// En lugar de:
const data = fetch(url).then(r => r.json())
// Sugerir:
const response = await fetch(url);
const data = await response.json();
```
4. **Hacer Submit Review** con una de estas opciones:

- ****Comment**:** Dejas comentarios sin aprobar ni bloquear
- ****Approve**:** ✅ Apruebas los cambios. Listos para merge.
- ****Request Changes**:** ❌ Pides cambios. El autor debe corregir antes del merge.

---

### Buenas Prácticas del Code Review

```bash
# ✅ Lo que SÍ hacer:
- Ser constructivo: "¿Qué te parece si usamos un enum aquí?" en vez de "Esto está mal"
- Explicar el por qué: "Este enfoque podría causar un memory leak porque..."
- Reconocer lo bueno: "Excelente manejo del error handling aquí 👏"
- Sugerir alternativas, no solo señalar problemas

# ❌ Lo que NO hacer:
- Comentarios vagos: "No me gusta esto"
- Ataques personales: "¿Cómo no sabes que esto no funciona?"
- Bikeshedding: Perder 20 comentarios debatiendo el nombre de una variable
  mientras se ignora un bug crítico
```

---

## Issues — El Sistema de Tickets de GitHub

Los **Issues** son el sistema de seguimiento de tareas integrado en GitHub. Funcionan como tickets donde reportas bugs, propones nuevas funcionalidades o documentas tareas pendientes.

### Crear un Issue

Un buen Issue incluye:
- **Título claro:** `Bug: El botón de login no funciona en Safari`
- **Descripción detallada:** Pasos para reproducir, comportamiento esperado vs actual.
- **Labels:** Etiquetas como `bug`, `enhancement`, `help wanted`, `good first issue`.
- **Assignee:** ¿Quién se encarga de resolverlo?
- **Milestone:** ¿A qué versión o sprint pertenece?

---

### Vincular Issues con Pull Requests

Puedes vincular automáticamente un Issue con un PR usando palabras clave en el mensaje del commit o en la descripción del PR:

```bash
# En un mensaje de commit:
git commit -m "fix: corregir redirección después del login. Fixes #23"

# En la descripción del PR:
"Este PR resuelve el issue #23 agregando una validación de sesión."
# Palabras clave: Fixes, Closes, Resolves (seguidas de #número)
```

Cuando el PR se mergea a `main`, **GitHub cierra automáticamente el Issue #23**. Esto crea un vínculo trazable entre el problema reportado y el código que lo resolvió.

---

## GitHub Projects — Tableros Kanban

**GitHub Projects** es una herramienta de gestión visual integrada que te permite organizar Issues y PRs en tableros estilo **Kanban**:

```
  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
  │  📋 Backlog  │  │  🔄 In Progress│  │  👀 Review   │  │  ✅ Done     │
  │              │  │              │  │              │  │              │
  │  Issue #15   │  │  Issue #23   │  │  PR #31      │  │  Issue #8    │
  │  Issue #18   │  │  PR #29      │  │              │  │  Issue #12   │
  │  Issue #22   │  │              │  │              │  │  PR #25      │
  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

Cada tarjeta es un Issue o PR que se mueve entre columnas a medida que avanza el trabajo.

---

## Branch Protection Rules — Protegiendo `main`

Las **Branch Protection Rules** son configuraciones de seguridad en GitHub que previenen errores accidentales en ramas críticas como `main`.

### Reglas más importantes:

- ****Require a pull request before merging**:** Nadie puede hacer push directo a `main`. Todo debe pasar por un PR.
- ****Require approvals**:** El PR necesita al menos N aprobaciones antes del merge (ej. 1 o 2 revisores).
- ****Require status checks to pass**:** Si tienes GitHub Actions ejecutando tests, el PR no se puede mergear si los tests fallan.
- ****Require conversation resolution**:** Todos los comentarios del Code Review deben estar resueltos antes del merge.
- ****Restrict who can push**:** Solo ciertos usuarios o equipos pueden hacer push a la rama protegida.

### ¿Cómo configurarlas?

En GitHub: **Settings → Branches → Add branch protection rule** → Seleccionar la rama `main` y activar las reglas deseadas.

Con estas reglas activadas, el flujo forzado es:
1. Crear rama → 2. Hacer PR → 3. Pasar tests → 4. Obtener aprobación → 5. Merge.

**Nadie puede saltarse estos pasos**, ni siquiera el dueño del repositorio (si así lo configura).

