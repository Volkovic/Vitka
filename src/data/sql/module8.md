## Consultas con Expresiones

Además de simplemente leer los datos crudos de las columnas, SQL permite usar **expresiones** para escribir lógica más compleja directamente en la consulta. Las expresiones pueden ser matemáticas, de texto, o transformaciones de datos que se calculan al vuelo.

---

### Expresiones en el SELECT

Cada columna del `SELECT` puede ser una expresión que se calcula **para cada fila** del resultado:

```sql
SELECT columna_a, columna_b, columna_a + columna_b AS suma
FROM nombre_tabla;
```

Esto crea una "columna virtual" calculada que no existe físicamente en la tabla, pero que aparece en el resultado con su valor computado.

---

### Expresiones Matemáticas

Puedes usar los operadores aritméticos estándar (`+`, `-`, `*`, `/`) directamente en las consultas:

```sql
-- Calcular los años desde que un empleado fue contratado
SELECT name, 
       hire_year, 
       2025 - hire_year AS years_employed
FROM employees;

-- Calcular el precio con IVA
SELECT product, 
       price, 
       price * 1.21 AS price_with_tax
FROM products;
```

---

### Expresiones en el WHERE

Las expresiones no están limitadas al `SELECT`. También puedes usarlas en la cláusula `WHERE` para crear filtros más sofisticados:

```sql
-- Encontrar empleados que llevan más de 10 años en la empresa
SELECT name, hire_year
FROM employees
WHERE 2025 - hire_year > 10;
```

---

### Alias con AS

La palabra clave `AS` permite asignar un **nombre temporal** (alias) a las columnas o expresiones del resultado. Esto hace que los reportes sean más legibles:

```sql
SELECT title AS "Título de la Película",
       length_minutes / 60.0 AS "Duración en Horas"
FROM movies;
```

Los alias son puramente cosméticos: **no modifican** la tabla original ni crean columnas nuevas en el disco. Solo cambian la cabecera que aparece en el resultado de la consulta.

---

### Alias para Tablas

Los alias también se pueden usar para acortar los nombres de las tablas, especialmente útil cuando trabajas con JOINs:

```sql
-- Sin alias (verboso)
SELECT employees.name, buildings.capacity
FROM employees INNER JOIN buildings ON employees.building = buildings.name;

-- Con alias (limpio)
SELECT e.name, b.capacity
FROM employees e INNER JOIN buildings b ON e.building = b.name;
```

El alias de tabla **no** necesita la palabra `AS`; basta con poner el alias después del nombre de la tabla separado por un espacio.

---

### Ejercicio Práctico 1

**¿Qué produce esta consulta si la tabla `movies` tiene una columna `domestic_sales` y otra `international_sales`?**

```sql
SELECT title, 
       (domestic_sales + international_sales) / 1000000 AS earnings_millions
FROM movies
ORDER BY earnings_millions DESC
LIMIT 3;
```

**[Solución]**
```sql
-- Produce las 3 películas con mayores ganancias totales (domésticas + 
-- internacionales), mostrando el monto en millones (dividido por 1,000,000).
-- Ordenadas de la que más ganó a la que menos.
-- Ejemplo de resultado:
--   "Toy Story 3"  |  1063.2
--   "Finding Nemo"  |  940.3
--   "Up"            |  731.4
-- El alias "earnings_millions" SÍ se puede usar en ORDER BY (es una excepción
-- especial de SQL, ya que ORDER BY se ejecuta después del SELECT).
```

---

### Ejercicio Práctico 2

**Detecta el error en este código:**

```sql
SELECT name, salary * 12 AS annual_salary
FROM employees
WHERE annual_salary > 50000;
```

**[Solución]**
```sql
-- Error: No puedes usar un alias definido en el SELECT dentro del WHERE.
-- Esto se debe al ORDEN DE EJECUCIÓN de SQL: el WHERE se procesa ANTES 
-- que el SELECT, por lo tanto "annual_salary" aún no existe cuando el 
-- motor evalúa el filtro.
-- Correcto: WHERE salary * 12 > 50000 (repetir la expresión completa).
```