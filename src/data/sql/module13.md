## Actualizando y Eliminando Filas

Ya sabemos insertar datos. Ahora aprenderemos a **modificar** filas existentes con `UPDATE` y a **eliminar** filas con `DELETE`. Ambos comandos comparten un mismo principio crítico: **la importancia del WHERE**.

---

## UPDATE: Actualizando Filas

El comando `UPDATE` modifica los valores de columnas en filas que **ya existen** en la tabla:

```sql
UPDATE nombre_tabla
SET columna1 = valor1,
    columna2 = valor2
WHERE condicion;
```

La cláusula `SET` especifica qué columnas cambiar y a qué valores. La cláusula `WHERE` determina **cuáles filas** serán afectadas.

---

### Ejemplo Práctico

```sql
-- Corregir el año y el director de la película "A Bug's Life"
UPDATE movies
SET director = "John Lasseter",
    year = 1998
WHERE title = "A Bug's Life";

-- Cambiar el título de la película con id 2
UPDATE movies
SET title = "Toy Story 2: El Regreso"
WHERE id = 2;
```

---

### ⚠️ Peligro Crítico: UPDATE sin WHERE

Si olvidas la cláusula `WHERE`, el `UPDATE` modificará **ABSOLUTAMENTE TODAS** las filas de la tabla sin discriminar:

```sql
-- ¡CATÁSTROFE! Esto cambia el director de TODAS las películas
UPDATE movies
SET director = "John Lasseter";
```

Después de ejecutar esto, cada película en la base de datos mostrará a "John Lasseter" como director, destruyendo la información original de forma irreversible.

---

### Buena Práctica con UPDATE

Antes de ejecutar un `UPDATE`, es recomendable primero verificar que tu cláusula `WHERE` selecciona las filas correctas ejecutando un `SELECT` con el mismo filtro:

```sql
-- Primero: verificar qué filas serán afectadas
SELECT * FROM movies WHERE id = 2;

-- Después: si el resultado es correcto, ejecutar el UPDATE
UPDATE movies SET title = "Toy Story 2: El Regreso" WHERE id = 2;
```

---

## DELETE: Eliminando Filas

El comando `DELETE` elimina filas completas de la tabla:

```sql
DELETE FROM nombre_tabla
WHERE condicion;
```

---

### Ejemplo Práctico

```sql
-- Eliminar la película con id 4
DELETE FROM movies WHERE id = 4;

-- Eliminar todas las películas anteriores a 1995
DELETE FROM movies WHERE year < 1995;
```

---

### ⚠️ Peligro Crítico: DELETE sin WHERE

Al igual que `UPDATE`, si olvidas el `WHERE`, borrarás **TODAS** las filas de la tabla:

```sql
-- ¡APOCALIPSIS! Esto vacía la tabla completamente
DELETE FROM movies;
```

La tabla seguirá existiendo (su estructura y columnas se mantienen), pero todas las filas de datos serán eliminadas permanentemente.

---

### Ejercicio Práctico 1

**¿Qué catástrofe produce exactamente este código?**

```sql
UPDATE empleados SET salario = 5000;
```

**[Solución]**
```sql
-- Al omitir el WHERE, la base de datos obedece la instrucción de forma GLOBAL.
-- Irá fila por fila y asignará el salario de 5000 a TODOS los empleados: 
-- desde el pasante hasta el CEO. 
-- Resultado: la contabilidad y la nómina completa quedan destruidas.
-- Correcto: UPDATE empleados SET salario = 5000 WHERE id = 42;
```

---

### Ejercicio Práctico 2

**¿Cuál es la diferencia entre estas dos operaciones?**

```sql
-- Operación A
DELETE FROM productos;

-- Operación B
DROP TABLE productos;
```

**[Solución]**
```sql
-- Operación A (DELETE sin WHERE):
-- Elimina TODAS las filas de datos, pero la tabla sigue existiendo vacía.
-- La estructura (columnas, tipos, restricciones) se conserva intacta.
-- Puedes seguir haciendo INSERT INTO productos después.

-- Operación B (DROP TABLE):
-- Destruye la tabla COMPLETA: estructura, datos, índices, restricciones, todo.
-- La tabla deja de existir. Un INSERT INTO productos daría error:
-- "Table 'productos' doesn't exist".
```