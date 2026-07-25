## Filtrando Datos con WHERE (Parte 1)

Ya sabemos cómo seleccionar columnas específicas de una tabla, pero si tuvieras una tabla con **100 millones de filas**, leerlas todas sería imposible e ineficiente.

Para filtrar y recuperar solo ciertas filas del resultado, necesitamos usar la cláusula `WHERE` en nuestra consulta.

```sql
SELECT columna1, columna2
FROM nombre_tabla
WHERE condicion;
```

La cláusula `WHERE` se aplica a **cada fila** de la tabla, evaluando los valores de sus columnas para determinar si esa fila debe incluirse en los resultados o no.

---

### Operadores Numéricos

Puedes construir condiciones más complejas combinando múltiples filtros con las palabras clave lógicas `AND` y `OR`:

```sql
SELECT columna1, columna2
FROM nombre_tabla
WHERE condicion1
    AND/OR condicion2
    AND/OR ...;
```

A continuación, los operadores disponibles para datos numéricos (enteros o decimales):

```sql
-- Operadores estándar de comparación:
-- =         Igual a                        →  columna = 4
-- != o <>   Diferente a                    →  columna != 4
-- <         Menor que                      →  columna < 4
-- <=        Menor o igual que              →  columna <= 4
-- >         Mayor que                      →  columna > 4
-- >=        Mayor o igual que              →  columna >= 4

-- Operadores de rango:
-- BETWEEN ... AND ...       Dentro de un rango (inclusivo)
--                           →  columna BETWEEN 1.5 AND 10.5

-- NOT BETWEEN ... AND ...   Fuera de un rango (inclusivo)
--                           →  columna NOT BETWEEN 1 AND 10

-- Operadores de lista:
-- IN (...)                  Existe en una lista de valores
--                           →  columna IN (2, 4, 6)

-- NOT IN (...)              No existe en una lista de valores
--                           →  columna NOT IN (1, 3, 5)
```

---

### Ejemplo Práctico: Tabla Movies

Imagina una tabla `movies` con las columnas `id`, `title`, `director`, `year` y `length_minutes`:

```sql
-- Encontrar la película con id 6
SELECT * FROM movies WHERE id = 6;

-- Encontrar películas lanzadas entre 2000 y 2010 (ambos incluidos)
SELECT title, year FROM movies 
WHERE year BETWEEN 2000 AND 2010;

-- Encontrar películas que NO se lanzaron entre 2000 y 2010
SELECT title, year FROM movies 
WHERE year NOT BETWEEN 2000 AND 2010;
```

---

### ¿Sabías que...?

SQL **no requiere** que escribas las palabras clave en mayúsculas. Sin embargo, como convención universal, se escriben en mayúsculas (`SELECT`, `WHERE`, `FROM`) para distinguirlas visualmente de los nombres de tablas y columnas, haciendo la consulta más fácil de leer.

---

### La Potencia de WHERE para el Rendimiento

Además de hacer los resultados más manejables para el humano, las cláusulas `WHERE` también permiten que la consulta se ejecute **más rápido**, ya que reducen la cantidad de datos innecesarios que el motor debe procesar y devolver.

---

### Ejercicio Práctico 1

**¿Qué salida produce este código?**
```sql
SELECT * FROM productos WHERE precio = 50 AND precio = 100;
```

**[Solución]**
```sql
-- Devolverá 0 filas (resultado vacío).
-- Es lógicamente IMPOSIBLE que un único valor sea exactamente 50 
-- y al mismo tiempo exactamente 100. El operador AND exige que AMBAS
-- condiciones se cumplan simultáneamente en la misma fila. 
-- Probablemente el programador quería usar OR, o bien BETWEEN 50 AND 100.
```

---

### Ejercicio Práctico 2

**Reescribe esta consulta verbosa usando un solo operador más elegante:**
```sql
SELECT nombre FROM empleados 
WHERE departamento_id = 1 
   OR departamento_id = 3 
   OR departamento_id = 5 
   OR departamento_id = 7;
```

**[Solución]**
```sql
SELECT nombre FROM empleados 
WHERE departamento_id IN (1, 3, 5, 7);

-- El operador IN hace exactamente lo mismo que múltiples OR encadenados,
-- pero de forma mucho más limpia, legible y fácil de mantener.
-- Si mañana necesitas agregar el departamento 9, solo lo añades a la lista.
```
