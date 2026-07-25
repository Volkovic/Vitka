## Insertando Filas (INSERT INTO)

Hasta ahora hemos aprendido a **consultar** datos (DQL - Data Query Language). Ahora entramos al mundo de la **manipulación de datos** (DML - Data Manipulation Language): cómo agregar, modificar y eliminar registros.

---

### ¿Qué es un Schema?

Una **schema** (esquema) de tabla describe la estructura de cada tabla: qué columnas tiene y qué **tipo de dato** acepta cada una. Por ejemplo, la tabla `movies` podría tener este esquema:

```sql
-- movies:
--   id            INTEGER     (número entero)
--   title         TEXT        (cadena de texto)
--   director      TEXT        (cadena de texto)
--   year          INTEGER     (número entero)
--   length_minutes INTEGER    (número entero)
```

El esquema define las "reglas" de la tabla. No puedes insertar texto en una columna de tipo INTEGER, ni un número en una columna de tipo TEXT (el motor lanzará un error).

---

### INSERT INTO: Sintaxis Básica

Para insertar una nueva fila en una tabla, usamos `INSERT INTO` seguido de los valores que corresponden a cada columna del esquema:

```sql
INSERT INTO movies
VALUES (4, "Toy Story 4", "Josh Cooley", 2019, 100);
```

En este caso, los valores deben coincidir **exactamente** con el número y orden de las columnas definidas en la tabla.

---

### INSERT con Columnas Explícitas

Si no tienes datos para todas las columnas, o quieres ser explícito sobre a qué columna corresponde cada valor, puedes listar las columnas:

```sql
INSERT INTO movies (title, director, year)
VALUES ("Toy Story 4", "Josh Cooley", 2019);
```

Las columnas no listadas recibirán su **valor por defecto** (si tienen uno definido) o `NULL` si no tienen restricciones que lo impidan.

---

### Inserción Múltiple (Bulk Insert)

Puedes insertar **varias filas** en una sola sentencia separándolas con comas. Esto es mucho más eficiente que ejecutar múltiples `INSERT INTO` individuales:

```sql
INSERT INTO movies (title, director, year, length_minutes)
VALUES ("Toy Story 4", "Josh Cooley", 2019, 100),
       ("Soul", "Pete Docter", 2020, 101),
       ("Luca", "Enrico Casarosa", 2021, 95);
```

---

### Ejercicio Práctico 1

**¿Por qué falla este INSERT?**

```sql
INSERT INTO movies
VALUES ("Coco", "Lee Unkrich", 2017, 105);
```

**[Solución]**
```sql
-- Falla porque la tabla movies tiene 5 columnas (id, title, director, year,
-- length_minutes) pero el INSERT solo proporciona 4 valores.
-- Cuando NO listas las columnas explícitamente, SQL espera que proporciones
-- un valor para CADA columna del esquema, en el orden exacto.
-- Solución A: INSERT INTO movies VALUES (99, "Coco", "Lee Unkrich", 2017, 105);
-- Solución B: INSERT INTO movies (title, director, year, length_minutes) 
--             VALUES ("Coco", "Lee Unkrich", 2017, 105);
```

---

### Ejercicio Práctico 2

**Lee el código. ¿Qué valor tendrá la columna `length_minutes` en la fila insertada?**

```sql
INSERT INTO movies (id, title, director, year)
VALUES (99, "Elemental", "Peter Sohn", 2023);
```

**[Solución]**
```sql
-- La columna length_minutes tendrá NULL (si la columna lo permite)
-- o su valor DEFAULT (si tiene uno definido en el esquema de la tabla).
-- Al no incluir length_minutes en la lista de columnas del INSERT,
-- SQL la omite y aplica el valor por defecto. Si la columna tiene una 
-- restricción NOT NULL y no hay DEFAULT, el INSERT FALLARÁ con un error.
```