## Una Nota sobre NULLs

En SQL, `NULL` es un concepto crucial que representa la **ausencia total de valor**. No es cero, no es un string vacío `""`, no es `false`. Es literalmente "no hay dato almacenado aquí".

Es imposible evitar los valores `NULL` en las bases de datos: una columna puede ser `NULL` cuando el dato es inaplicable (un empleado sin teléfono asignado), desconocido (un paquete cuya fecha de entrega aún no se definió), o simplemente no fue ingresado.

---

### El Problema con NULL en Expresiones

Debido a que `NULL` representa la ausencia de valor, **no puede ser comparado** con los operadores normales de igualdad o desigualdad. La comparación contra `NULL` **siempre** produce un resultado indeterminado (ni verdadero ni falso):

```sql
-- ⚠️ Estos NO funcionan como esperarías:
WHERE columna = NULL    -- NUNCA es verdadero
WHERE columna != NULL   -- NUNCA es verdadero
```

---

### IS NULL e IS NOT NULL

Para evaluar correctamente si un campo contiene o no contiene `NULL`, SQL tiene operadores especiales:

```sql
-- Encontrar filas DONDE el valor ES nulo
SELECT columna1, columna2
FROM nombre_tabla
WHERE columna IS NULL;

-- Encontrar filas DONDE el valor NO ES nulo
SELECT columna1, columna2
FROM nombre_tabla
WHERE columna IS NOT NULL;
```

---

### Ejemplo Práctico

Si tienes una tabla `employees` donde la columna `building` puede estar vacía para empleados que trabajan remotamente:

```sql
-- Encontrar todos los empleados que NO tienen un edificio asignado
SELECT name, role FROM employees
WHERE building IS NULL;

-- Encontrar todos los empleados que SÍ tienen un edificio asignado
SELECT name, role, building FROM employees
WHERE building IS NOT NULL;
```

---

### Gotchas Comunes con NULL

Los NULLs se propagan de formas inesperadas en las operaciones:

```sql
-- Aritmética con NULL: cualquier operación con NULL produce NULL
-- 5 + NULL  =  NULL
-- NULL * 10 =  NULL

-- Comparaciones con NULL: siempre dan resultado indeterminado
-- NULL = NULL   →  indeterminado (¡NO da verdadero!)
-- NULL != NULL  →  indeterminado (¡NO da verdadero!)

-- Funciones de agregación: ignoran los NULLs
-- COUNT(*) cuenta todas las filas (incluidas las NULL)
-- COUNT(columna) solo cuenta filas donde columna NO es NULL
```

---

### Ejercicio Práctico 1

**¿Cuántas filas devuelve esta consulta si la tabla tiene 100 empleados, de los cuales 15 tienen `building = NULL`?**

```sql
SELECT COUNT(*) FROM employees WHERE building = NULL;
```

**[Solución]**
```sql
-- Devuelve 0 (cero filas).
-- Este es el gotcha más clásico de SQL: usar = para comparar con NULL 
-- NUNCA funciona. La expresión "building = NULL" siempre evalúa a 
-- indeterminado, no a verdadero, por lo tanto ninguna fila pasa el filtro.
-- La forma correcta es: WHERE building IS NULL (devolvería 15 filas).
```

---

### Ejercicio Práctico 2

**Lee el código. ¿Qué diferencia produce usar `COUNT(*)` vs `COUNT(bonus)` si 8 de los 50 empleados tienen `bonus = NULL`?**

```sql
-- Consulta A
SELECT COUNT(*) FROM employees;

-- Consulta B
SELECT COUNT(bonus) FROM employees;
```

**[Solución]**
```sql
-- Consulta A devuelve: 50 (cuenta todas las filas sin excepción)
-- Consulta B devuelve: 42 (cuenta solo las filas donde bonus NO es NULL)

-- COUNT(*) cuenta filas completas sin importar los valores.
-- COUNT(columna) automáticamente IGNORA las filas donde esa columna es NULL.
-- Esta diferencia es sutil pero crítica: si la usas mal, tus reportes
-- de "empleados con bonus" tendrán números incorrectos.
```