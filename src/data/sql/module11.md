## Orden de Ejecución de una Consulta

Ahora que hemos aprendido los componentes principales de una consulta `SELECT`, es crucial entender el **orden real** en que SQL los procesa internamente. Este orden NO es el mismo en que los escribimos.

---

### La Consulta Completa

Una consulta SELECT completa, con todas sus cláusulas opcionales, se escribe así:

```sql
SELECT DISTINCT columna, AGG_FUNC(columna_o_expresion), ...
FROM nombre_tabla
    JOIN otra_tabla ON nombre_tabla.columna = otra_tabla.columna
WHERE condicion_de_restriccion
GROUP BY columna
HAVING condicion_de_restriccion
ORDER BY columna ASC/DESC
LIMIT cantidad OFFSET inicio;
```

---

### Orden de Ejecución Real

Aunque escribimos `SELECT` primero en la sintaxis, **no** es lo primero que el motor procesa. El orden real de ejecución interna es:

```sql
-- 1. FROM y JOINs
--    El motor localiza las tablas y las combina si hay JOINs.

-- 2. WHERE
--    Filtra filas individuales que no cumplen las condiciones.

-- 3. GROUP BY
--    Agrupa las filas sobrevivientes por los valores especificados.

-- 4. HAVING
--    Filtra los grupos que no cumplen las condiciones de agregación.

-- 5. SELECT
--    Calcula las expresiones y proyecta las columnas solicitadas.

-- 6. DISTINCT
--    Elimina filas duplicadas del resultado.

-- 7. ORDER BY
--    Ordena las filas finales.

-- 8. LIMIT / OFFSET
--    Recorta las filas al rango solicitado.
```

---

### ¿Por Qué Importa Saber Esto?

Este orden de ejecución explica **muchas** de las restricciones y errores que ya has encontrado:

```sql
-- ¿Por qué no puedes usar un alias del SELECT en el WHERE?
-- → Porque WHERE se ejecuta ANTES que SELECT.

-- ¿Por qué HAVING puede usar funciones de agregación pero WHERE no?
-- → Porque HAVING se ejecuta DESPUÉS de GROUP BY (los grupos ya existen),
--   mientras que WHERE se ejecuta ANTES (las filas aún no están agrupadas).

-- ¿Por qué puedes usar un alias del SELECT en el ORDER BY?
-- → Porque ORDER BY se ejecuta DESPUÉS del SELECT.
```

---

### Implicaciones Prácticas

Cada paso del proceso descarta filas que no necesita, por lo que las cláusulas que aparecen **más arriba** en el orden de ejecución ayudan a reducir la carga de trabajo de los pasos siguientes. Un `WHERE` eficiente que descarte millones de filas antes del `GROUP BY` hará que tu consulta sea dramáticamente más rápida.

---

### Ejercicio Práctico 1

**Lee este código. ¿Por qué falla?**

```sql
SELECT director, COUNT(*) AS total
FROM movies
GROUP BY director
WHERE total > 3;
```

**[Solución]**
```sql
-- Falla por DOS razones:
-- 1. Orden de sintaxis incorrecto: WHERE debe ir ANTES de GROUP BY, no después.
-- 2. Incluso si lo reordenas, "total" es un alias del SELECT que no existe 
--    aún cuando se evalúa WHERE (WHERE se ejecuta antes de SELECT).
-- 
-- Correcto:
-- SELECT director, COUNT(*) AS total
-- FROM movies
-- GROUP BY director
-- HAVING COUNT(*) > 3;
-- Usamos HAVING porque filtramos DESPUÉS de agrupar.
```

---

### Ejercicio Práctico 2

**¿En qué orden procesa SQL esta consulta internamente?**

```sql
SELECT DISTINCT department, AVG(salary) AS avg_sal
FROM employees
JOIN departments ON employees.dept_id = departments.id
WHERE hire_year > 2015
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY avg_sal DESC
LIMIT 5;
```

**[Solución]**
```sql
-- 1. FROM employees JOIN departments (combina las dos tablas)
-- 2. WHERE hire_year > 2015 (descarta empleados contratados antes de 2015)
-- 3. GROUP BY department (agrupa los empleados restantes por departamento)
-- 4. HAVING AVG(salary) > 50000 (descarta grupos con promedio ≤ 50000)
-- 5. SELECT DISTINCT department, AVG(salary) (calcula y proyecta columnas)
-- 6. DISTINCT (elimina departamentos duplicados, si los hubiera)
-- 7. ORDER BY avg_sal DESC (ordena de mayor a menor salario promedio)
-- 8. LIMIT 5 (toma solo los primeros 5 resultados)
```