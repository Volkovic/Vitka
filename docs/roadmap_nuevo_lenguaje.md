# Roadmap: Integración de un Nuevo Lenguaje

Este documento formaliza los pasos necesarios, lógicos y estructurales, para añadir un nuevo lenguaje de programación o tecnología (ej. SQL, TypeScript, Go) a nuestra plataforma de aprendizaje interactiva, garantizando que cumpla con los estándares de calidad y retención de usuarios que ya establecimos para Python y JavaScript.

**Filosofía Principal del Proyecto:** El objetivo central de la plataforma es enseñar a los usuarios a **entender y leer el código**. En la actualidad, las IAs se encargan de la escritura y generación bruta de código; por tanto, nuestro enfoque educativo no debe ser la memorización sintáctica para escribir, sino el desarrollo del pensamiento crítico: entender las estructuras, asimilar los conceptos profundos y comprender el "por qué" de cada pieza arquitectónica.

---

## Fase 1: Recolección y Limpieza de Material (`Source`)
1. **Extracción:** Inyectar el material de código base desde la fuente o repositorio seleccionado (ej. repetición del patrón `30-Days-Of-...`).
2. **Purga de Contenido:** Eliminar introducciones genéricas, firmas del autor original, enlaces muertos, y textos celebratorios redundantes (ej. "¡Felicidades, llegaste al final!"). 
3. **Formateo Base:** Asegurar que todos los bloques de código tengan su correcto identificador de lenguaje (ej. ````sql`) para el resaltado de sintaxis (Syntax Highlighting). **REGLA ESTRICTA:** No cortar ni dividir bajo ningún concepto los bloques de código originarios al momento de segmentar la teoría.

## Fase 2: Segmentación y Micro-Aprendizaje
1. **División por Días (Módulos):** Segmentar el material completo en "Días" lógicos. La cantidad de días (ej. 20, 23 o 30) se deja a criterio dependiendo de la densidad y complejidad del temario.
2. **División por Slides:** Dentro de cada Día, trocear el contenido largo en *Slides* interactivos para fomentar el micro-aprendizaje y evitar la fatiga visual del usuario.
3. **Inyección de Ejercicios In-line:** 
   - Intercalar ejercicios prácticos dentro del contenido teórico.
   - Estos ejercicios deben estar encapsulados en bloques de código e incluir su respuesta/justificación para que el usuario pueda razonarlos sobre la marcha.
   - **Regla UI:** Cada bloque de ejercicios debe forzarse a iniciar en un nuevo Slide limpio, sin mezclarse con la teoría precedente.

## Fase 3: Banco de Pruebas (Quizzes Dinámicos)
1. **Creación del Archivo de Evaluación:** Generar un archivo maestro `quizzes.json` aislado para el nuevo lenguaje.
2. **Volumen de Preguntas:** Crear exactamente **20 preguntas por cada Día/Módulo**.
3. **Enfoque de Razonamiento:** Las preguntas deben alejarse de la mera teoría; deben obligar al estudiante a analizar lógicamente. Los formatos requeridos son:
   - **"¿Qué salida produce este código?"** (Lectura mental de ejecución).
   - **Preguntas Conceptuales Profundas** (El "por qué" de las herramientas).
   - **"Rellena el siguiente código"** (Detectar qué pieza arquitectónica falta).
   - **Detección de "Gotchas" o errores comunes.**
4. **Estructura Estricta:** Cada pregunta debe incluir `id`, `question`, 4 `options` (Multiple Choice), 1 `correctAnswer` (índice), y una `justification` exhaustiva que explique el porqué técnico de la respuesta.

## Fase 4: Lógica de Motor de Evaluación
1. **Aleatoriedad:** El componente de examen (Quiz) tomará el array de 20 preguntas del día y seleccionará de manera aleatoria **10 preguntas** para el intento actual, garantizando exámenes diferentes si el usuario necesita reintentarlo.
2. **Criterio de Aprobación:** El umbral de éxito estricto será del **80% de respuestas correctas** (8/10).
3. **Desbloqueo de Progreso:** Solo si el usuario alcanza o supera el 80%, el sistema (mediante LocalStorage / Estado Global) marcará el módulo como "Completado" y destruirá el candado, habilitando el acceso físico y lógico al siguiente Día.

## Fase 5: Integración en la Interfaz (UI) y Router
1. **Assets Visuales:** Definir el color temático (ej. Azul para SQL) e importar el logo vectorial/ícono correspondiente para inyectarlo en el Dashboard principal.
2. **Rutas (Routing):** Habilitar las rutas dinámicas en React Router (ej. `/learn/[nuevo-lenguaje]/...`) para que la app pueda resolver el contenido.
3. **Registro de Estado:** Asegurarse de que el motor de progreso del usuario genere una rama aislada en la memoria para el nuevo lenguaje (para no sobreescribir el progreso de Python o JS).

## Fase 6: QA y Testing Final
1. **Prueba de Renderizado:** Navegar manualmente para confirmar que el Markdown, el carrusel de Slides y los bloques de código se ven perfectos estéticamente.
2. **Prueba de Candados:** Jugar el día 1, fallar el Quiz a propósito (comprobar que no se desbloquea el día 2), y luego aprobarlo (comprobar la apertura exitosa de rutas).
