## Modificando y Eliminando Tablas

A veces necesitas cambiar la estructura de una tabla que ya existe (agregar una columna nueva, eliminar una obsoleta), o destruir tablas completas que ya no sirven. Para eso SQL tiene `ALTER TABLE` y `DROP TABLE`.

---

## ALTER TABLE: Modificando la Estructura

A diferencia de `UPDATE` (que modifica los **datos** de las filas), `ALTER TABLE` modifica la **estructura** de la tabla misma: sus columnas, tipos de datos y restricciones.

---

### Agregar una Columna

```sql
ALTER TABLE nombre_tabla
ADD columna tipo_dato restriccion_opcional DEFAULT valor_default;
```

Ejemplo:

```sql
-- Agregar una columna de "idioma" a la tabla movies
ALTER TABLE movies
ADD language TEXT DEFAULT "English";
```

Todas las filas existentes recibirán automáticamente el valor por defecto (`"English"`) en la nueva columna. Si no defines un `DEFAULT`, recibirán `NULL`.

---

### Eliminar una Columna

```sql
ALTER TABLE nombre_tabla
DROP columna;
```

Ejemplo:

```sql
-- Eliminar la columna "length_minutes" de la tabla movies
ALTER TABLE movies
DROP length_minutes;
```

Esto destruye la columna y todos los datos que contenía de forma **irreversible**.

**Nota:** Algunos motores de bases de datos (como SQLite) tienen soporte limitado o no permiten eliminar columnas directamente. En esos casos, la solución es crear una tabla nueva, copiar los datos y eliminar la original.

---

### Renombrar una Tabla

```sql
ALTER TABLE nombre_tabla
RENAME TO nuevo_nombre;
```

Ejemplo:

```sql
-- Renombrar la tabla "movies" a "films"
ALTER TABLE movies
RENAME TO films;
```

---

## DROP TABLE: Eliminando Tablas

El comando `DROP TABLE` elimina una tabla **completa** de la base de datos: su estructura, sus datos, sus índices, restricciones, todo.

```sql
DROP TABLE nombre_tabla;
```

A diferencia del `DELETE` (que solo borra filas de datos), `DROP TABLE` destruye la tabla en sí. Es como si nunca hubiera existido.

---

### DROP TABLE IF EXISTS

Si intentas eliminar una tabla que no existe, SQL lanzará un error. Para evitarlo, usa la cláusula de seguridad `IF EXISTS`:

```sql
DROP TABLE IF EXISTS nombre_tabla;
```

Esto es muy usado en scripts de migración: primero se intenta destruir la versión vieja de la tabla (si existe), y luego se crea la nueva.

---

### Dependencias y Restricciones

Si otra tabla tiene una `FOREIGN KEY` que referencia a la tabla que intentas eliminar, el `DROP TABLE` **fallará** para proteger la integridad referencial de los datos. Primero deberías eliminar o modificar las tablas dependientes, o usar `CASCADE` (disponible en algunos motores):

```sql
-- Algunos motores soportan:
DROP TABLE movies CASCADE;
-- Esto elimina la tabla Y automáticamente limpia todas las referencias
-- externas que apuntaban a ella.
```

---

### Ejercicio Práctico 1

**¿Cuál es la diferencia entre estos tres comandos?**

```sql
-- Comando A
DELETE FROM movies;

-- Comando B
DROP TABLE movies;

-- Comando C
ALTER TABLE movies DROP year;
```

**[Solución]**
```sql
-- Comando A (DELETE sin WHERE):
-- Vacía todas las FILAS de la tabla. La tabla sigue existiendo con su 
-- estructura intacta (columnas, tipos, restricciones). Puedes volver a 
-- insertar datos después.

-- Comando B (DROP TABLE):
-- Destruye la tabla COMPLETA: estructura + datos + todo. La tabla deja 
-- de existir en la base de datos. Cualquier consulta posterior a "movies" 
-- producirá error.

-- Comando C (ALTER TABLE DROP):
-- Solo elimina la COLUMNA "year" de la tabla. Las demás columnas y todas 
-- las filas se mantienen intactas, pero pierden permanentemente el campo year.
```

---

### Ejercicio Práctico 2

**¿Qué sucede si ejecutas esto dos veces seguidas?**

```sql
DROP TABLE IF EXISTS temp_data;
```

**[Solución]**
```sql
-- Primera ejecución: Si la tabla "temp_data" existe, la elimina exitosamente.
-- Segunda ejecución: La tabla ya no existe, pero gracias a "IF EXISTS", SQL
-- simplemente no hace nada (ignora la instrucción silenciosamente).
-- Sin el "IF EXISTS", la segunda ejecución lanzaría un error fatal:
-- "Table 'temp_data' doesn't exist".
-- Por eso IF EXISTS es esencial en scripts que se ejecutan múltiples veces.
```