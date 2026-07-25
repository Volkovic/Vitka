## Filtrando y Ordenando Resultados

Aunque la cláusula `WHERE` nos permite filtrar filas específicas, SQL tiene más herramientas para **refinar** la presentación final de los datos: eliminar duplicados, ordenar resultados y limitar la cantidad devuelta.

---

### Valores Únicos con DISTINCT

A veces las tablas contienen filas con valores duplicados en ciertas columnas. Para eliminar esas filas duplicadas y obtener solo los valores **únicos**, usamos `DISTINCT`:

```sql
SELECT DISTINCT columna1, columna2
FROM nombre_tabla
WHERE condicion;
```

`DISTINCT` descarta ciegamente las filas donde **todas** las columnas especificadas tengan valores duplicados. Es un mecanismo directo para eliminar copias exactas.

---

### Ordenando Resultados con ORDER BY

A diferencia de una hoja de cálculo donde puedes hacer clic en una columna para ordenar, SQL usa la cláusula `ORDER BY` para especificar en qué columna y dirección ordenar los resultados:

```sql
SELECT columna1, columna2
FROM nombre_tabla
WHERE condicion
ORDER BY columna1 ASC/DESC;
```

- **`ASC`** (Ascendente): De menor a mayor (A→Z, 0→9). Es el valor por defecto si no especificas nada.
- **`DESC`** (Descendente): De mayor a menor (Z→A, 9→0).

Cuando un `ORDER BY` se aplica, cada fila se ordena alfanuméricamente basándose en el valor de la columna especificada.

---

### Limitando Resultados con LIMIT y OFFSET

Las cláusulas `LIMIT` y `OFFSET` trabajan juntas para controlar **cuántas filas** devuelve la consulta y **desde dónde** empezar a contarlas. Son cláusulas que generalmente se aplican **al final** de la consulta:

```sql
SELECT columna1, columna2
FROM nombre_tabla
WHERE condicion
ORDER BY columna1 ASC
LIMIT num_limite OFFSET num_offset;
```

- **`LIMIT`**: Reduce el número de filas devueltas al máximo especificado.
- **`OFFSET`**: Indica cuántas filas **saltar** desde el inicio antes de empezar a devolver resultados.

---

### LIMIT y OFFSET en la Vida Real

Si una web tiene 1000 productos pero muestra 20 por página:

```sql
-- Página 1: los primeros 20 productos
SELECT * FROM productos ORDER BY id LIMIT 20 OFFSET 0;

-- Página 2: los siguientes 20 (salta los primeros 20)
SELECT * FROM productos ORDER BY id LIMIT 20 OFFSET 20;

-- Página 3: los siguientes 20 (salta los primeros 40)
SELECT * FROM productos ORDER BY id LIMIT 20 OFFSET 40;
```

Así es como las aplicaciones web implementan la **paginación**.

---

### Ejercicio Práctico 1

**¿Qué devuelve esta consulta sobre una tabla `movies` con las columnas `title` y `director`?**
```sql
SELECT DISTINCT director FROM movies 
ORDER BY director ASC;
```

**[Solución]**
```sql
-- Devuelve una lista de TODOS los directores únicos (sin repeticiones),
-- ordenados alfabéticamente de la A a la Z.
-- Si John Lasseter dirigió 5 películas, solo aparecerá 1 vez en la lista.
-- DISTINCT elimina los duplicados PRIMERO, y ORDER BY ordena DESPUÉS.
```

---

### Ejercicio Práctico 2

**¿Cuál es el error lógico en esta consulta que intenta obtener "las 5 películas más recientes"?**
```sql
SELECT title, year FROM movies 
LIMIT 5;
```

**[Solución]**
```sql
-- Falta ORDER BY year DESC.
-- Sin un ORDER BY explícito, SQL no garantiza en qué orden devuelve las filas.
-- Esta consulta simplemente devuelve 5 filas "cualesquiera" (probablemente las 
-- primeras que el motor encuentre en disco), NO necesariamente las más recientes.
-- Correcto: SELECT title, year FROM movies ORDER BY year DESC LIMIT 5;
```