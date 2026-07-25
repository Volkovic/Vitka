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
  'Introducción a SQL y SELECT', 'Filtros con WHERE (Pt. 1)', 'Filtros con WHERE (Pt. 2)', 
  'Ordenamiento, Límites y Únicos', 'Multi-tabla con JOINs', 'OUTER JOINs', 
  'NULLs en SQL', 'Expresiones y Alias', 'Funciones de Agregación (Pt. 1)', 
  'Agregación con GROUP BY', 'Orden de Ejecución', 'INSERT INTO', 
  'UPDATE y DELETE', 'CREATE TABLE', 'ALTER y DROP TABLE'
];

export function getModuleTitle(courseId, moduleId) {
  const index = parseInt(moduleId, 10) - 1;
  if (courseId === 'python') return pythonTitles[index] || `Módulo ${moduleId}`;
  if (courseId === 'javascript') return javascriptTitles[index] || `Módulo ${moduleId}`;
  if (courseId === 'sql') return sqlTitles[index] || `Módulo ${moduleId}`;
  return `Módulo ${moduleId}`;
}
