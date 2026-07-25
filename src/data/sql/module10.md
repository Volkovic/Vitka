## Agregación con GROUP BY (Parte 2)

En el módulo anterior, las funciones de agregación operaban sobre **todas las filas** de la tabla a la vez. Pero, ¿qué pasa si quieres saber cuántas películas hizo **cada director** por separado? Para eso necesitas la cláusula `GROUP BY`.

---

### La Cláusula GROUP BY

`GROUP BY` agrupa las filas que comparten el mismo valor en la columna especificada, formando subconjuntos independientes. Luego, las funciones de agregación se aplican **a cada grupo** por separado:

```sql
SELECT columna_agrupada, AGG_FUNC(columna_b)
FROM nombre_tabla
WHERE condicion
GROUP BY columna_agrupada;
```

---

### Ejemplo Concreto

```sql
-- ¿Cuántas películas dirigió cada director?
SELECT director, COUNT(*) AS num_movies
FROM movies
GROUP BY director;
```

Esta consulta produce una fila **por cada director único**. Si hay 8 directores diferentes, el resultado tendrá 8 filas, cada una con el nombre del director y la cantidad de películas que dirigió.

---

### Múltiples Agregaciones por Grupo

Puedes usar varias funciones de agregación sobre el mismo grupo:

```sql
-- Por cada director: cuántas películas, duración promedio y total
SELECT director,
       COUNT(*) AS num_movies,
       AVG(length_minutes) AS avg_duration,
       SUM(length_minutes) AS total_minutes
FROM movies
GROUP BY director;
```

---

### Filtrando Grupos con HAVING

¿Qué pasa si después de agrupar solo quieres ver los directores que tengan **más de 3 películas**?

No puedes usar `WHERE` porque `WHERE` filtra filas individuales **antes** de que se formen los grupos. Para filtrar los grupos **después** de que ya fueron calculados, usas `HAVING`:

```sql
SELECT director, COUNT(*) AS num_movies
FROM movies
GROUP BY director
HAVING COUNT(*) > 3;
```

---

### WHERE vs HAVING: La Regla de Oro

```sql
-- WHERE:  Filtra FILAS individuales ANTES de agrupar
-- HAVING: Filtra GRUPOS calculados DESPUÉS de agrupar

-- Ejemplo combinado:
SELECT director, COUNT(*) AS num_movies
FROM movies
WHERE year > 2000            -- Primero: solo considerar películas post-2000
GROUP BY director            -- Después: agrupar por director
HAVING COUNT(*) >= 2;        -- Finalmente: solo directores con 2+ películas
```

---

### Ejercicio Práctico 1

**Ordena estas cláusulas SQL en su estricto orden de ejecución lógica:**
`GROUP BY, WHERE, ORDER BY, SELECT, FROM, HAVING`

**[Solución]**
```sql
-- 1. FROM        (Localiza la tabla de origen)
-- 2. WHERE       (Filtra filas individuales crudas)
-- 3. GROUP BY    (Agrupa las filas que sobrevivieron)
-- 4. HAVING      (Filtra los grupos que no sirven)
-- 5. SELECT      (Proyecta las columnas y calcula expresiones)
-- 6. ORDER BY    (Ordena el resultado final)

-- Esto explica por qué no puedes usar un alias del SELECT en el WHERE:
-- el SELECT se ejecuta DESPUÉS del WHERE.
```

---

### Ejercicio Práctico 2

**¿Por qué este código genera un error?**

```sql
SELECT director, title, COUNT(*) AS num_movies
FROM movies
GROUP BY director;
```

**[Solución]**
```sql
-- Error: la columna "title" no está en el GROUP BY ni es una agregación.
-- Cuando usas GROUP BY, el resultado tiene UNA fila por grupo (por director).
-- Cada director puede tener muchos "titles" diferentes. SQL no sabe cuál
-- de todos los títulos mostrar en esa única fila de resumen.
-- Regla: toda columna en el SELECT que NO sea una función de agregación
-- DEBE estar listada en el GROUP BY.
```