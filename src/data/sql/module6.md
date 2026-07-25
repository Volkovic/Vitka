## OUTER JOINs

Como vimos en el módulo anterior, el `INNER JOIN` solo incluye filas que tienen una coincidencia en **ambas** tablas. Pero si los datos de las dos tablas no están perfectamente sincronizados (cosa que pasa constantemente en el mundo real), perderás información valiosa.

Los **OUTER JOINs** resuelven este problema permitiendo que filas **sin pareja** sobrevivan en el resultado.

---

### LEFT JOIN (LEFT OUTER JOIN)

El `LEFT JOIN` retorna **todas las filas de la tabla izquierda** (la que escribes en el `FROM`), e intenta emparejarlas con filas de la tabla derecha (la del `JOIN`).

Si una fila de la izquierda no encuentra pareja en la derecha, **no se descarta**: simplemente los campos de la tabla derecha se rellenan con `NULL`.

```sql
SELECT columna1, columna2
FROM tabla_a
LEFT JOIN tabla_b
    ON tabla_a.id = tabla_b.tabla_a_id
WHERE condicion;
```

---

### Ejemplo Visual

Dadas las tablas `employees` y `buildings`:

```sql
SELECT e.name, e.building, b.capacity
FROM employees e
LEFT JOIN buildings b
    ON e.building = b.building_name;
```

**Resultado:** Verás a TODOS los empleados. Si un empleado no tiene edificio asignado (o su edificio no existe en la tabla `buildings`), verás su nombre pero la columna `capacity` mostrará `NULL`.

---

### RIGHT JOIN (RIGHT OUTER JOIN)

Es exactamente lo mismo que el `LEFT JOIN`, pero dándole el privilegio de supervivencia a la **tabla derecha** (la del `JOIN`):

```sql
SELECT e.name, b.building_name, b.capacity
FROM employees e
RIGHT JOIN buildings b
    ON e.building = b.building_name;
```

**Resultado:** Verás TODOS los edificios. Si un edificio no tiene ningún empleado asignado, las columnas del empleado se rellenan con `NULL`.

*Nota de la industria: En la práctica, los programadores rara vez usan `RIGHT JOIN`. Prefieren reescribir la misma lógica invirtiendo el orden de las tablas y usando un `LEFT JOIN`, por convención visual.*

---

### FULL OUTER JOIN

Devuelve **absolutamente TODAS** las filas de ambas tablas, hayan encontrado pareja o no. Es la unión más completa:

```sql
SELECT e.name, b.building_name
FROM employees e
FULL OUTER JOIN buildings b
    ON e.building = b.building_name;
```

- Si un empleado no tiene edificio → se muestra con NULLs en las columnas del edificio.
- Si un edificio no tiene empleados → se muestra con NULLs en las columnas del empleado.

---

### Comparación Rápida

```sql
-- INNER JOIN:       Solo las filas con pareja en AMBAS tablas
-- LEFT JOIN:        TODAS las de la izquierda + sus parejas (o NULL)
-- RIGHT JOIN:       TODAS las de la derecha + sus parejas (o NULL)
-- FULL OUTER JOIN:  TODAS las de ambos lados (NULLs donde no hay pareja)
```

---

### Ejercicio Práctico 1

**¿Qué tipo de JOIN usarías para obtener la lista de TODOS los edificios, incluyendo aquellos que actualmente están vacíos (sin empleados)?**

**[Solución]**
```sql
-- Necesitas un RIGHT JOIN (o un LEFT JOIN con las tablas invertidas):
SELECT b.building_name, e.name
FROM employees e
RIGHT JOIN buildings b
    ON e.building = b.building_name;

-- O equivalentemente (más común en la industria):
SELECT b.building_name, e.name
FROM buildings b
LEFT JOIN employees e
    ON b.building_name = e.building;

-- Los edificios vacíos aparecerán con NULL en la columna e.name.
```

---

### Ejercicio Práctico 2

**Lee este código. ¿Qué técnica usa para encontrar a los empleados que NO tienen edificio asignado?**

```sql
SELECT e.name, e.role
FROM employees e
LEFT JOIN buildings b
    ON e.building = b.building_name
WHERE b.building_name IS NULL;
```

**[Solución]**
```sql
-- Usa la técnica conocida como "Anti-Join":
-- 1. El LEFT JOIN garantiza que TODOS los empleados aparezcan.
-- 2. Los empleados sin edificio tendrán NULL en b.building_name.
-- 3. El WHERE IS NULL filtra SOLO esas filas huérfanas.
-- Resultado: una lista limpia de empleados "sin hogar" laboral.
-- Esta es una de las técnicas más usadas para detectar datos huérfanos.
```