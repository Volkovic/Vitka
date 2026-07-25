## Creando Tablas (CREATE TABLE)

Hasta ahora trabajamos con tablas que ya existían. Ahora entramos a **DDL (Data Definition Language)**: los comandos para crear y definir la **estructura** de las tablas.

---

### La Sintaxis de CREATE TABLE

Cuando creas una nueva tabla, necesitas definir el **esquema**: el nombre de cada columna, su tipo de dato, y opcionalmente las **restricciones** (constraints) que debe cumplir:

```sql
CREATE TABLE nombre_tabla (
    columna1 tipo_dato restriccion_opcional DEFAULT valor_default,
    columna2 tipo_dato restriccion_opcional,
    columna3 tipo_dato restriccion_opcional
);
```

Si la tabla ya existe previamente en la base de datos, el comando `CREATE TABLE` lanzará un error. Para evitarlo, puedes usar la cláusula de seguridad `IF NOT EXISTS`:

```sql
CREATE TABLE IF NOT EXISTS nombre_tabla (
    columna1 tipo_dato,
    columna2 tipo_dato
);
```

---

### Tipos de Datos Comunes

Cada motor de base de datos soporta tipos ligeramente diferentes, pero estos son los más universales:

```sql
-- Tipos Numéricos:
-- INTEGER / INT       Número entero (sin decimales)
-- FLOAT / REAL        Número con decimales (punto flotante)
-- BOOLEAN             Verdadero (1) o Falso (0)

-- Tipos de Texto:
-- TEXT                 Cadena de texto de longitud variable
-- VARCHAR(n)          Cadena de texto con máximo de n caracteres
-- CHAR(n)             Cadena de texto de exactamente n caracteres

-- Tipos de Fecha:
-- DATE                Fecha (YYYY-MM-DD)
-- DATETIME            Fecha y hora
-- TIMESTAMP           Marca temporal (segundos desde epoch)
```

---

### Restricciones de Tabla (Constraints)

Las restricciones son reglas que el motor impone sobre los datos para mantener su **integridad**:

```sql
-- PRIMARY KEY   Identifica de forma única cada fila. No puede ser NULL ni 
--               repetirse. Cada tabla debería tener exactamente una.

-- NOT NULL      Prohíbe que la columna acepte valores NULL.
--               Obliga a que siempre se inserte un valor real.

-- UNIQUE        Garantiza que no haya valores duplicados en esa columna.
--               (similar a PRIMARY KEY pero puede haber múltiples columnas UNIQUE)

-- DEFAULT       Define un valor automático si el INSERT no proporciona uno.
--               Ejemplo: DEFAULT 0, DEFAULT CURRENT_TIMESTAMP

-- FOREIGN KEY   Referencia a la PRIMARY KEY de otra tabla, creando una relación.
--               Garantiza integridad referencial (no puedes referenciar algo 
--               que no existe).

-- CHECK         Valida que el valor cumpla una expresión personalizada.
--               Ejemplo: CHECK (age > 0)
```

---

### Ejemplo Completo

```sql
CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    director TEXT,
    year INTEGER DEFAULT 2000,
    length_minutes INTEGER,
    FOREIGN KEY (director) REFERENCES directors(name)
);
```

Esta tabla:
- Tiene un `id` que identifica cada película de forma única.
- Exige que `title` no sea NULL (toda película debe tener nombre).
- Permite que `director` sea NULL (podría ser desconocido).
- Si no se especifica `year`, asume el valor 2000 por defecto.
- La columna `director` referencia a la tabla `directors`.

---

### Ejercicio Práctico 1

**Lee el siguiente esquema y detecta los problemas arquitectónicos:**

```sql
CREATE TABLE posts (
    titulo VARCHAR(50)
);
```

**[Solución]**
```sql
-- Problemas detectados:
-- 1. No tiene PRIMARY KEY (id). Las filas serán irreconocibles: no podrás 
--    hacer UPDATE ni DELETE a un post específico sin identificador único.
-- 2. VARCHAR(50) es extremadamente corto para un título de post (explotará 
--    con títulos largos y el INSERT fallará).
-- 3. No tiene NOT NULL en titulo, permitiendo insertar posts sin título.
-- 4. No tiene columnas de metadata (fecha_creacion, autor, etc.)
--
-- Versión mejorada:
-- CREATE TABLE posts (
--     id INTEGER PRIMARY KEY,
--     titulo VARCHAR(255) NOT NULL,
--     contenido TEXT,
--     fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
-- );
```

---

### Ejercicio Práctico 2

**¿Qué hace la restricción `FOREIGN KEY` y qué error produce si intentas violarla?**

```sql
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    total FLOAT,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Luego intentas:
INSERT INTO orders (id, customer_id, total) VALUES (1, 999, 50.00);
```

**[Solución]**
```sql
-- La FOREIGN KEY garantiza que customer_id DEBE existir como id en la tabla 
-- customers. Es un "contrato de integridad referencial".
-- Si el cliente con id 999 NO existe en la tabla customers, el INSERT fallará
-- con un error de violación de clave foránea.
-- Esto previene "datos huérfanos": órdenes apuntando a clientes inexistentes.
```