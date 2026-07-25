## Consultas Multi-tabla con JOINs

Hasta ahora hemos trabajado con una sola tabla a la vez. Pero los datos del mundo real se distribuyen en **múltiples tablas relacionadas** entre sí. Esta práctica de diseño se llama **normalización** de bases de datos.

---

### ¿Por qué Múltiples Tablas?

La normalización evita almacenar datos **redundantes y duplicados**. En lugar de repetir la dirección completa de un cliente en cada factura, se almacena una sola vez en la tabla `clientes` y cada factura solo guarda una referencia (un número de ID) que apunta a ese cliente.

Las tablas se vinculan por medio de una **clave primaria** (Primary Key) en una tabla, y una **clave foránea** (Foreign Key) en la otra.

---

### INNER JOIN

El `INNER JOIN` es la herramienta que une dos tablas en una sola consulta. Funciona comparando una columna de la Tabla A con una columna de la Tabla B, y **solo incluye en el resultado las filas que tienen coincidencia en ambas tablas**.

```sql
SELECT columna1, columna2
FROM tabla_a
INNER JOIN tabla_b
    ON tabla_a.id = tabla_b.tabla_a_id
WHERE condicion
ORDER BY columna1 ASC
LIMIT num_limite;
```

La cláusula `ON` especifica **cómo se relacionan** las dos tablas, es decir, qué columna de una tabla corresponde a qué columna de la otra.

---

### Ejemplo Concreto

Imagina dos tablas: `employees` (con columnas `id`, `name`, `building`) y `buildings` (con columnas `building_name`, `capacity`):

```sql
SELECT employees.name, buildings.capacity
FROM employees
INNER JOIN buildings
    ON employees.building = buildings.building_name;
```

Esta consulta produce un resultado combinado donde cada empleado se muestra junto a la capacidad de su edificio. Si un empleado no tiene un edificio asignado (o el valor del edificio no existe en la tabla `buildings`), esa fila será **excluida** del resultado.

---

### ¿Por Qué `tabla.columna`?

Cuando dos tablas tienen columnas con el mismo nombre, debes especificar a cuál te refieres usando el formato `nombre_tabla.nombre_columna`. Sin esto, el motor SQL lanzará un error de **ambigüedad**:

```sql
-- Error: ¿A qué "id" se refiere? ¿employees.id o buildings.id?
SELECT id FROM employees INNER JOIN buildings ON ...

-- Correcto: Especificamos de cuál tabla es el "id"
SELECT employees.id FROM employees INNER JOIN buildings ON ...
```

---

### Ejercicio Práctico 1

**Dado el siguiente JOIN, ¿aparecerá en los resultados un empleado llamado "Carlos" que tiene `building = NULL` en la tabla `employees`?**

```sql
SELECT e.name, b.building_name
FROM employees e
INNER JOIN buildings b
    ON e.building = b.building_name;
```

**[Solución]**
```sql
-- NO. Carlos será excluido completamente del resultado.
-- INNER JOIN es estricto: requiere que exista una coincidencia válida
-- en AMBAS tablas. Si el building de Carlos es NULL, no puede coincidir 
-- con ningún building_name de la tabla buildings, por lo tanto el INNER 
-- JOIN lo descarta silenciosamente sin error ni advertencia.
```

---

### Ejercicio Práctico 2

**Lee el código. ¿Cuántas filas producirá el resultado si la tabla `orders` tiene 50 filas pero solo 30 de ellas tienen un `customer_id` que existe en la tabla `customers`?**

```sql
SELECT c.name, o.total
FROM customers c
INNER JOIN orders o
    ON c.id = o.customer_id;
```

**[Solución]**
```sql
-- Producirá exactamente 30 filas.
-- Las 20 órdenes restantes cuyo customer_id no existe en la tabla 
-- customers son descartadas por el INNER JOIN (sin pareja, sin resultado).
-- De la misma forma, cualquier cliente que no tenga ninguna orden
-- asociada también queda excluido del resultado final.
```