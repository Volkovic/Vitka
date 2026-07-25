## Filtrando Datos con WHERE (Parte 2): Texto

Cuando trabajamos con columnas que contienen texto (strings), SQL soporta un conjunto adicional de operadores específicos para hacer cosas como **comparación insensible a mayúsculas** y **búsqueda de patrones con comodines**.

---

### Operadores para Texto

```sql
-- =              Comparación exacta (sensible a mayúsculas/minúsculas)
--                →  columna = "abc"

-- != o <>        Desigualdad exacta (sensible a mayúsculas/minúsculas)
--                →  columna != "abcd"

-- LIKE           Comparación exacta INSENSIBLE a mayúsculas/minúsculas
--                →  columna LIKE "ABC"

-- NOT LIKE       Desigualdad INSENSIBLE a mayúsculas/minúsculas
--                →  columna NOT LIKE "ABCD"

-- IN (...)       El texto existe en una lista de valores
--                →  columna IN ("A", "B", "C")

-- NOT IN (...)   El texto NO existe en una lista de valores
--                →  columna NOT IN ("D", "E", "F")
```

---

### Comodines (Wildcards) con LIKE

Los comodines son caracteres especiales que solo funcionan con el operador `LIKE` (o `NOT LIKE`):

**`%` (Porcentaje):** Representa **cero, uno o múltiples** caracteres cualesquiera.

```sql
-- Coincide con "AT", "ATIC", "CAT", "BATS"
WHERE columna LIKE "%AT%"
```

**`_` (Guión bajo):** Representa **exactamente un** carácter cualquiera.

```sql
-- Coincide con "AND", "ANT", pero NO con "AN" (faltan caracteres)
WHERE columna LIKE "AN_"
```

---

### Regla Importante sobre Strings

Todos los strings en SQL deben ir **entre comillas** para que el parser pueda distinguir las palabras del texto de las palabras clave del lenguaje SQL.

---

### Ejemplos Prácticos con la Tabla Movies

```sql
-- Encontrar todas las películas de "Toy Story" (Toy Story, Toy Story 2, Toy Story 3...)
SELECT title FROM movies 
WHERE title LIKE "Toy Story%";

-- Encontrar todas las películas dirigidas por John Lasseter
SELECT title FROM movies 
WHERE director = "John Lasseter";

-- Encontrar películas y directores que NO fueron dirigidas por John Lasseter
SELECT title, director FROM movies 
WHERE director != "John Lasseter";

-- Encontrar todas las películas WALL-* (WALL-E, WALL-G, etc.)
SELECT title FROM movies 
WHERE title LIKE "WALL-_";
```

---

### Nota sobre Búsqueda de Texto Avanzada

Aunque la mayoría de motores de base de datos son bastante eficientes con estos operadores, la **búsqueda de texto completo** (full-text search) se delega mejor a librerías especializadas como **Apache Lucene** o **Elasticsearch**. Estas librerías están diseñadas específicamente para búsquedas de texto, soportando internacionalización y consultas avanzadas con mayor rendimiento.

---

### Ejercicio Práctico 1

**¿Cuál es la diferencia entre estas dos consultas?**
```sql
-- Consulta A
SELECT * FROM usuarios WHERE nombre = "maría";

-- Consulta B
SELECT * FROM usuarios WHERE nombre LIKE "maría";
```

**[Solución]**
```sql
-- La Consulta A usa el operador = que es SENSIBLE a mayúsculas/minúsculas.
-- Solo encontrará registros donde el nombre sea exactamente "maría" (minúscula).
-- NO encontrará "María", "MARÍA" ni "maRía".

-- La Consulta B usa LIKE sin comodines, que es INSENSIBLE a mayúsculas.
-- Encontrará "maría", "María", "MARÍA" y cualquier variación de capitalización.

-- Gotcha: LIKE sin comodines (% o _) funciona como un "= insensible a case".
```

---

### Ejercicio Práctico 2

**Lee el código. ¿Qué emails encontrará esta consulta?**
```sql
SELECT email FROM usuarios 
WHERE email LIKE "%@gmail.%";
```

**[Solución]**
```sql
-- Encontrará TODOS los emails que contengan "@gmail." en cualquier posición:
-- "juan@gmail.com"     ✅
-- "ana@gmail.es"       ✅  
-- "pedro@gmail.co.uk"  ✅
-- "info@hotmail.com"   ❌ (no contiene "@gmail.")
-- "gmail@yahoo.com"    ❌ (tiene "gmail" pero no "@gmail.")

-- El % antes y después actúa como "cualquier cosa puede ir aquí".
-- Es un patrón muy útil para segmentar usuarios por proveedor de email.
```
