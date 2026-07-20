Vamos a desglosar las herramientas que SQL nos da para modificar textos al momento de extraerlos. Piensa en estas funciones como herramientas de formato automático:

- **UPPER() y LOWER()**: Actúan como un botón de mayúsculas o minúsculas. Si tienes un nombre escrito de forma desordenada (ej. 'jUaN'), `UPPER` lo transforma a 'JUAN' y `LOWER` a 'juan'.
- **LENGTH() o LEN()**: Es un simple contador de caracteres. Te dice cuántas letras tiene un texto.
- **CONCAT()**: Es como pegamento. Te permite unir diferentes columnas o textos. Por ejemplo, unir el `nombre` y el `apellido` con un espacio en el medio.
- **SUBSTRING() o SUBSTR()**: Funciona como unas tijeras. Te permite recortar y extraer solo un pedacito del texto, desde la posición que le indiques.
- **TRIM()**: Es como una aspiradora de espacios. Limpia los espacios en blanco innecesarios que quedan al principio o al final de un texto (ej. transforma '   hola   ' en 'hola').
- **REPLACE()**: Funciona como la herramienta de "Buscar y Reemplazar" de Word. Cambia todas las apariciones de un texto por otro masivamente (ej. cambiar todos los '.com' por '.org').

```sql
SELECT 
  UPPER(TRIM(nombre)) AS NombreMayusculaLimpio,
  SUBSTRING(apellido, 1, 3) AS Abreviacion,
  CONCAT(nombre, ' ', apellido) AS NombreCompleto
FROM clientes;
```

---

Las fechas y los números tienen sus propias herramientas matemáticas en SQL. Son muy útiles para no tener que hacer estos cálculos en el código de tu aplicación:

**Fechas:**
- **NOW() o CURRENT_TIMESTAMP**: Es un reloj. Te devuelve la fecha y hora exacta del sistema en este instante.
- **EXTRACT(parte FROM fecha)**: Actúa como unas pinzas. Si tienes una fecha completa, puedes usarlo para "arrancar" solo el AÑO (YEAR) o el MES (MONTH) ignorando el resto.
- **DATEDIFF()**: Es una calculadora de distancia temporal. Te dice exactamente cuántos días de diferencia hay entre dos fechas distintas.

**Números y Conversiones:**
- **ROUND(numero, decimales)**: Redondea un número a la cantidad de decimales que le pidas, matemáticamente correcto (hacia arriba o hacia abajo según corresponda).
- **CEIL() y FLOOR()**: Son redondeos forzados. `CEIL()` siempre redondea hacia el techo (arriba) y `FLOOR()` siempre redondea hacia el piso (abajo).
- **CAST(valor AS tipo) o CONVERT()**: Es un traductor de tipos de datos. Si tienes un texto como '2026-10-15' y quieres que la base de datos lo trate como una fecha real o un número, usas esta función para forzar la conversión.

```sql
SELECT 
  EXTRACT(YEAR FROM NOW()) AS AnioActual,
  ROUND(salario * 1.21, 2) AS SalarioConImpuestos,
  CAST('2026-10-15' AS DATE) AS FechaFalsa
FROM empleados;
```

---

Piensa en el `CASE WHEN` como un policía de tránsito que dirige los datos según ciertas reglas. Es la forma en que SQL hace un `if / else if / else`. 

Evalúa las filas una por una. En el siguiente ejemplo, si el salario es menor a 2000, le asigna la etiqueta 'Junior'. Si está entre 2000 y 5000, le asigna 'Mid'. Y si no cumple ninguna de esas reglas (la cláusula `ELSE`), le asigna 'Senior'.

**⚠️ El peligro de olvidar el ELSE:** Si omites la parte final (`ELSE`) y una fila no cumple ninguna de las condiciones `WHEN`, SQL simplemente devolverá un valor vacío (`NULL`). Esto es un error muy común que puede romper la información que muestras en pantalla.

```sql
SELECT nombre, salario,
  CASE
    WHEN salario < 2000 THEN 'Junior'
    WHEN salario BETWEEN 2000 AND 5000 THEN 'Mid'
    ELSE 'Senior'
  END AS RangoSalarial
FROM empleados;
```

---

A veces las bases de datos tienen información faltante, lo que en SQL se conoce como un valor `NULL` (vacío absoluto). Mostrar un `NULL` en tu aplicación web se ve feo o puede causar errores. Aquí es donde entra tu plan de respaldo.

La función **`COALESCE()`** (el estándar oficial, preferido sobre funciones como `IFNULL`) es como un salvavidas. Evalúa si el dato existe. Si el dato es `NULL`, entonces escupe automáticamente el segundo parámetro que le pases como "plan B".

En este código, si el usuario no tiene teléfono (`NULL`), en lugar de devolver vacío, la base de datos devolverá el texto 'Sin registrar'.

```sql
SELECT nombre, COALESCE(telefono, 'Sin registrar') AS Tel FROM usuarios;
```

---

Veamos algunos trucos avanzados y errores críticos que debes evitar al usar todas estas funciones:

**Combinar y Anidar funciones:**
Puedes meter una función dentro de otra, como en las matemáticas. En `UPPER(TRIM(nombre))`, SQL evalúa **de adentro hacia afuera**: primero aspira los espacios con `TRIM` y luego sube el resultado a mayúsculas con `UPPER`.

**Funciones en Agrupaciones:**
Es totalmente legal agrupar datos (con `GROUP BY`) usando el resultado de una función. Por ejemplo, agrupar a los usuarios por el año extraído de su fecha de nacimiento: `GROUP BY EXTRACT(YEAR FROM fecha_nacimiento)`.

**Contar usando Condiciones (Agregación Condicional):**
Puedes mezclar un `SUM` con un `CASE WHEN` para contar cosas específicas dentro de un grupo de una sola vez. Por ejemplo: `SUM(CASE WHEN sexo='M' THEN 1 ELSE 0 END)`. Esto suma 1 si es masculino, y 0 si no lo es, filtrando los datos rápidamente.

**Aleatoriedad y Peso Físico:**
- **ORDER BY RANDOM()**: En lugar de ordenar de la A a la Z, asigna un valor temporal y baraja los resultados de forma aleatoria (útil para sacar un "ganador al azar").
- **OCTET_LENGTH()**: A diferencia de `LENGTH` que cuenta letras, esta función te dice cuánto espacio físico en *bytes* ocupa ese texto en el disco duro.

**🚨 Gotcha Crítico: Funciones en el WHERE**
**Nunca** uses estas funciones directamente sobre la columna en la cláusula `WHERE` (ej. `WHERE YEAR(fecha) = 2026`). Al modificar el dato en la condición, la base de datos no puede usar sus índices rápidos (pierde la capacidad "SARGable") y se ve obligada a escanear toda la tabla lentamente. Lo correcto es comparar la columna original con un rango de fechas.