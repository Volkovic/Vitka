## Funciones de Agregación (Parte 1)

SQL tiene funciones incorporadas llamadas **funciones de agregación** que permiten resumir información de **múltiples filas** y devolver un único valor calculado. Son esenciales para generar reportes, estadísticas y análisis de datos.

---

### Funciones Comunes de Agregación

```sql
-- COUNT(*)        Cuenta el número total de filas del grupo
-- COUNT(columna)  Cuenta filas donde la columna NO es NULL
-- MIN(columna)    Devuelve el valor más bajo de la columna
-- MAX(columna)    Devuelve el valor más alto de la columna
-- AVG(columna)    Calcula el promedio (average) de la columna
-- SUM(columna)    Suma todos los valores numéricos de la columna
```

---

### Usando Funciones de Agregación

Cada función de agregación se aplica sobre **todas las filas** del resultado (o del grupo, como veremos en el próximo módulo):

```sql
-- ¿Cuántas películas hay en la base de datos?
SELECT COUNT(*) AS total_movies FROM movies;

-- ¿Cuál es el año de la película más antigua y la más nueva?
SELECT MIN(year) AS oldest, MAX(year) AS newest FROM movies;

-- ¿Cuál es la duración promedio de todas las películas?
SELECT AVG(length_minutes) AS avg_length FROM movies;

-- ¿Cuántos minutos suman todas las películas juntas?
SELECT SUM(length_minutes) AS total_minutes FROM movies;
```

---

### Combinando Agregaciones

Puedes usar múltiples funciones de agregación en el mismo `SELECT`:

```sql
SELECT COUNT(*) AS total_movies,
       MIN(year) AS first_year,
       MAX(year) AS last_year,
       AVG(length_minutes) AS avg_duration,
       SUM(length_minutes) AS total_duration
FROM movies;
```

Esta consulta devuelve **una sola fila** con todos los resúmenes estadísticos calculados simultáneamente.

---

### Agregaciones con WHERE

Puedes combinar funciones de agregación con `WHERE` para restringir sobre qué filas se calcula el resumen:

```sql
-- Duración promedio solo de películas lanzadas después del 2000
SELECT AVG(length_minutes) AS avg_recent
FROM movies
WHERE year > 2000;

-- ¿Cuántas películas dirigió John Lasseter?
SELECT COUNT(*) AS lasseter_movies
FROM movies
WHERE director = "John Lasseter";
```

---

### Ejercicio Práctico 1

**¿Cuál es la diferencia entre estas dos consultas?**

```sql
-- Consulta A
SELECT COUNT(*) FROM employees;

-- Consulta B
SELECT COUNT(building) FROM employees;
```

**[Solución]**
```sql
-- Consulta A: Cuenta TODAS las filas de la tabla, sin importar los valores.
-- Si hay 50 empleados, devuelve 50.

-- Consulta B: Cuenta solo las filas donde "building" NO es NULL.
-- Si 8 empleados no tienen edificio (building = NULL), devuelve 42.

-- La diferencia es que COUNT(columna) ignora los NULLs automáticamente,
-- mientras que COUNT(*) cuenta filas completas sin discriminar.
```

---

### Ejercicio Práctico 2

**¿Qué pasa si ejecutas `SELECT nombre, MAX(salario) FROM empleados;` sin GROUP BY?**

**[Solución]**
```sql
-- Genera un error (o un resultado impredecible según el motor).
-- No puedes mezclar una columna individual ("nombre") con una función 
-- de agregación ("MAX(salario)") en el mismo SELECT sin GROUP BY.
-- MAX(salario) colapsa todas las filas en un solo valor, pero "nombre" 
-- intenta devolver múltiples filas. SQL no sabe qué nombre asociar 
-- a ese único salario máximo. Es una contradicción lógica.
```