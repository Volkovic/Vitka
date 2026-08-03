# Vitka

Plataforma de aprendizaje interactiva de programación. Cursos modulares con teoría en diapositivas, quizzes con temporizador y un asistente de IA integrado como tutor.

![Vista previa del dashboard](docs/preview.png)

## Stack Tecnológico

| Categoría | Tecnología |
|---|---|
| Frontend | React 19 · Vite 8 · React Router 7 |
| Estilos | Tailwind CSS 4 · `@tailwindcss/typography` |
| Íconos | Lucide React |
| Markdown | `react-markdown` · `rehype-raw` · `rehype-slug` |
| Backend (BaaS) | Supabase (Auth · PostgreSQL · Edge Functions) |
| IA | Google Gemini API · OpenAI · Anthropic (BYOK) |
| Deploy | Vercel |

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Volkovic/Vitka.git
cd Vitka

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear un archivo .env en la raíz con:
# VITE_SUPABASE_URL=tu_url_de_supabase
# VITE_SUPABASE_ANON_KEY=tu_anon_key

# Iniciar el servidor de desarrollo
npm run dev
```

## Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
│   ├── AiChat.jsx    # Chat con IA (tutor) — streaming SSE, multi-proveedor
│   ├── CourseCard.jsx # Card de curso con barra de progreso
│   ├── Quiz.jsx      # Evaluación con temporizador y puntaje mínimo
│   └── SlideView.jsx # Visor de diapositivas con navegación por teclado
├── context/
│   └── AuthContext.jsx  # Autenticación con Google vía Supabase
├── data/
│   ├── courseTitles.js  # Títulos de módulos por curso
│   ├── python/          # 30 módulos (.md) + quizzes.json
│   ├── javascript/      # 23 módulos (.md) + quizzes.json
│   ├── sql/             # 15 módulos (.md) + quizzes.json
│   └── git/             # 8 módulos (.md) + quizzes.json
├── layouts/
│   └── MainLayout.jsx   # Layout principal con navbar
├── lib/
│   └── supabase.js      # Cliente de Supabase
├── pages/
│   ├── Dashboard.jsx    # Roadmap con fases y cursos
│   ├── CoursePath.jsx   # Vista de módulos de un curso
│   ├── ModuleView.jsx   # Visor de módulo (slides + chat + quiz)
│   └── Login.jsx        # Pantalla de login
├── App.jsx              # Rutas principales
└── main.jsx             # Entry point
```

## Cursos Disponibles

| Curso | Módulos | Estado |
|---|---|---|
| Python | 30 | ✅ Disponible |
| JavaScript | 23 | ✅ Disponible |
| SQL | 15 | ✅ Disponible |
| Git/GitHub | 8 | ✅ Disponible |
| TypeScript | — | 🔒 Próximamente |
| React | — | 🔒 Próximamente |
| Supabase | — | 🔒 Próximamente |
| Docker | — | 🔒 Próximamente |

## Funcionalidades Principales

- **Teoría por diapositivas**: Contenido Markdown dividido por `---`, navegable con flechas del teclado.
- **Quizzes cronometrados**: 10 preguntas (5 min) por módulo, 30 preguntas (15 min) en examen final. Puntaje mínimo para avanzar.
- **Asistente IA**: Chat contextual por diapositiva. Soporta OpenAI, Anthropic y Google Gemini con API key propia del usuario.
- **Progreso persistente**: Tracking de módulos completados guardado en Supabase.
- **Auth con Google**: Login con un click vía Supabase Auth.

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
```

## Licencia

Proyecto personal de aprendizaje.
