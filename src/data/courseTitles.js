export const pythonTitles = [
  'Introducción', 'Variables y Funciones', 'Operadores', 'Cadenas (Strings)', 
  'Listas', 'Tuplas', 'Sets', 'Diccionarios', 'Condicionales', 
  'Bucles (Loops)', 'Funciones', 'Módulos', 'List Comprehension', 
  'Funciones de Orden Superior, Closures y Decoradores', 'Tipos de Errores', 'Módulo Datetime', 
  'Manejo de Excepciones', 'Expresiones Regulares', 'Manejo de Archivos', 
  'Gestor de Paquetes (PIP)', 'Clases y Objetos', 'Web Scraping', 
  'Entornos Virtuales', 'Estadísticas', 'Pandas', 'Web con Python', 
  'Python con MongoDB', 'API', 'Creando una API', 'Conclusiones'
];

export const javascriptTitles = [
  'Introducción', 'Tipos de Datos', 'Booleanos y Operadores', 'Condicionales', 
  'Arreglos (Arrays)', 'Bucles (Loops)', 'Funciones', 'Objetos', 'Funciones de Orden Superior', 
  'Sets y Maps', 'Desestructuración y Spread', 'Expresiones Regulares', 'Objeto Console', 
  'Manejo de Errores', 'Clases', 'JSON', 'Web Storage', 'Promesas', 
  'Closures', 'Código Limpio', 'DOM', 'Manipulación del DOM', 
  'Event Listeners'
];

export const sqlTitles = [
  '¿Qué es SQL?', 'Filtrando Datos con WHERE (Parte 1)', 'Filtrando Datos con WHERE (Parte 2): Texto',
  'Filtrando y Ordenando Resultados', 'Consultas Multi-tabla con JOINs', 'OUTER JOINs',
  'Una Nota sobre NULLs', 'Consultas con Expresiones', 'Funciones de Agregación (Parte 1)',
  'Agregación con GROUP BY (Parte 2)', 'Orden de Ejecución de una Consulta', 'Insertando Filas (INSERT INTO)',
  'Actualizando y Eliminando Filas', 'Creando Tablas (CREATE TABLE)', 'Modificando y Eliminando Tablas',
  'Fase Integración: Supabase y BaaS', 'El Cliente de Supabase en React', 'CRUD sin escribir SQL',
  'Autenticación de Usuarios (Auth)', 'Row Level Security (RLS)', 'Bases de Datos en Tiempo Real',
  'Almacenamiento (Supabase Storage)'
];

export const gitTitles = [
  'Fundamentos y Configuración', 'Ciclo de Vida del Código', 'Ramas, HEAD y Merging',
  'Trabajo Remoto y Sincronización', 'Pull Requests y Code Review',
  'Salvavidas: Deshacer Errores', 'Rebase, Squash y Releases',
  'GitHub Actions y CI/CD'
];

export const typescriptTitles = [
  'Introducción y Tipado Básico', 'Interfaces y Types', 'Union e Intersection Types',
  'Tipado de Funciones', 'Arrays, Tuplas y Enums', 'Clases y OOP en TS',
  'Genéricos (Generics)', 'Tipos de Utilidad (Utility Types)'
];

export const nodeTitles = [
  '¿Qué es Node.js?', 'NPM y package.json', 'Sistemas de Módulos', 'Vite y Bundlers'
];

export const reactTitles = [
  'Componentes y Clases',
  'Props',
  'Map, Listas y Keys',
  'Estados (useState)',
  'Renderizado Condicional',
  'Eventos',
  'Formularios',
  'Inputs Controlados vs No Controlados',
  'Higher Order Components (HOC)',
  'React Router',
  'Fetch y Axios',
  'Hooks y Ciclo de Vida',
  'Formularios con Hooks',
  'Fetching con Hooks',
  'Custom Hooks',
  'Context API',
  'useRef'
];

export const tailwindTitles = [
  'El Paradigma Utility-First', 'Sistemas de Diseño Restringidos',
  'El Compilador JIT (Just-In-Time) y Estados', 'La Filosofía shadcn/ui: La Anti-Librería',
  'Arquitectura Headless y Accesibilidad'
];

export function getModuleTitle(courseId, moduleId) {
  const index = parseInt(moduleId, 10) - 1;
  if (courseId === 'python') return pythonTitles[index] || `Módulo ${moduleId}`;
  if (courseId === 'javascript') return javascriptTitles[index] || `Módulo ${moduleId}`;
  if (courseId === 'sql') return sqlTitles[index] || `Módulo ${moduleId}`;
  if (courseId === 'git') return gitTitles[index] || `Módulo ${moduleId}`;
  if (courseId === 'typescript') return typescriptTitles[index] || `Módulo ${moduleId}`;
  if (courseId === 'node') return nodeTitles[index] || `Módulo ${moduleId}`;
  if (courseId === 'react') return reactTitles[index] || `Módulo ${moduleId}`;
  if (courseId === 'tailwind') return tailwindTitles[index] || `Módulo ${moduleId}`;
  return `Módulo ${moduleId}`;
}

export function getCourseTotalModules(courseId) {
  if (courseId === 'python') return pythonTitles.length;
  if (courseId === 'javascript') return javascriptTitles.length;
  if (courseId === 'sql') return sqlTitles.length;
  if (courseId === 'git') return gitTitles.length;
  if (courseId === 'typescript') return typescriptTitles.length;
  if (courseId === 'node') return nodeTitles.length;
  if (courseId === 'react') return reactTitles.length;
  if (courseId === 'tailwind') return tailwindTitles.length;
  return 0;
}
