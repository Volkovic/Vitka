## ¿Qué es SQL?

**SQL (Structured Query Language)** es un lenguaje diseñado para permitir tanto a usuarios técnicos como no técnicos consultar, manipular y transformar datos almacenados en una **base de datos relacional**.

Gracias a su simplicidad y potencia, SQL se ha convertido en el estándar universal: millones de sitios web y aplicaciones móviles dependen de bases de datos SQL para almacenar su información de forma segura y escalable.

---

### ¿Sabías que...?

Existen muchos motores de bases de datos SQL populares: **SQLite**, **MySQL**, **PostgreSQL**, **Oracle** y **Microsoft SQL Server**. Todos soportan el estándar común de SQL (que es lo que aprenderás en este curso), aunque cada uno puede diferir en las funcionalidades extra y tipos de almacenamiento que soporta.

---

## Bases de Datos Relacionales

Antes de aprender la sintaxis de SQL, es fundamental entender qué es una base de datos relacional.

Una base de datos relacional organiza la información en **Tablas** bidimensionales (similares a hojas de cálculo de Excel). Cada tabla tiene:

- Un número fijo de **Columnas** (los atributos o propiedades de la tabla).
- Cualquier cantidad de **Filas** (las instancias individuales de datos).

Por ejemplo, si una concesionaria tuviera una base de datos, podrías encontrar una tabla con todos los vehículos registrados:

```sql
-- Tabla: Vehiculos
-- | Id | Marca_Modelo       | Ruedas | Puertas | Tipo       |
-- |----|--------------------| -------|---------|------------|
-- | 1  | Ford Focus         | 4      | 4       | Sedán      |
-- | 2  | Tesla Roadster     | 4      | 2       | Deportivo  |
-- | 3  | Kawasaki Ninja     | 2      | 0       | Motocicleta|
-- | 4  | McLaren Formula 1  | 4      | 0       | Carrera    |
-- | 5  | Tesla S            | 4      | 4       | Sedán      |
```

En la misma base podrías encontrar tablas relacionadas: una lista de conductores registrados, tipos de licencias o infracciones de tránsito.

Al aprender SQL, el objetivo es aprender a **contestar preguntas específicas sobre estos datos**, como: *"¿Qué vehículos tienen menos de 4 ruedas?"* o *"¿Cuántos modelos produce Tesla?"*.

---

## La Declaración SELECT

Para recuperar datos de una base de datos SQL necesitamos escribir sentencias `SELECT`, conocidas coloquialmente como **consultas** (queries).

Una consulta es simplemente una declaración que especifica: **qué datos buscamos**, **dónde encontrarlos** en la base de datos, y opcionalmente **cómo transformarlos** antes de devolverlos.

---

### Seleccionando Columnas Específicas

La consulta más básica selecciona columnas específicas de una tabla:

```sql
SELECT columna1, columna2
FROM nombre_tabla;
```

El resultado será un conjunto bidimensional de filas y columnas: efectivamente una copia de la tabla, pero **solo** con las columnas que solicitamos.

---

### Seleccionando Todas las Columnas

Si queremos recuperar **absolutamente todas** las columnas de una tabla, usamos el asterisco (`*`) como atajo en lugar de listar cada nombre de columna individualmente:

```sql
SELECT *
FROM nombre_tabla;
```

Esta consulta es muy útil para inspeccionar rápidamente una tabla volcando todos sus datos de una sola vez.

---

### Ejercicio Práctico 1

**Dada la tabla `Vehiculos` del ejemplo anterior, ¿qué consulta escribirías para obtener solo la marca/modelo y el tipo de cada vehículo?**

**[Solución]**
```sql
SELECT Marca_Modelo, Tipo
FROM Vehiculos;

-- Seleccionamos únicamente las dos columnas que nos interesan.
-- El resultado mostrará 5 filas (una por cada vehículo), pero solo
-- con las columnas Marca_Modelo y Tipo. Las columnas Id, Ruedas y 
-- Puertas no aparecerán en el resultado.
```

---

### Ejercicio Práctico 2

**Lee el siguiente código y razona: ¿Cuál es la diferencia práctica entre ambas consultas?**
```sql
-- Consulta A
SELECT * FROM Vehiculos;

-- Consulta B
SELECT Id, Marca_Modelo, Ruedas, Puertas, Tipo FROM Vehiculos;
```

**[Solución]**
```sql
-- Ambas devuelven exactamente los mismos datos en este caso, porque
-- la Consulta B lista manualmente TODAS las columnas de la tabla.
-- Sin embargo, la Consulta A (SELECT *) es peligrosa en producción: 
-- si en el futuro alguien agrega una columna nueva a la tabla (ej. "Color"),
-- SELECT * traerá automáticamente esa columna extra sin que tu aplicación 
-- lo espere, potencialmente rompiendo la UI o consumiendo ancho de banda 
-- innecesario. Listar las columnas explícitamente es más seguro y predecible.
```
