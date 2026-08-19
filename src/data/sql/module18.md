# 📝 CRUD sin escribir SQL (El ORM JS)

Ya inicializamos el cliente. Ahora, en lugar de abrir una terminal y escribir consultas SQL manualmente, usaremos métodos de JavaScript que Supabase traducirá automáticamente a SQL por detrás.

Esto es similar a un **ORM** (Object-Relational Mapping).

---

## 📖 SELECT (Leer Datos)

**Tu cerebro en SQL:**
```sql
SELECT id, nombre FROM usuarios WHERE edad >= 18;
```

**Tu código en React:**
```javascript
const { data, error } = await supabase
  .from('usuarios')
  .select('id, nombre')
  .gte('edad', 18); // gte = Greater Than or Equal (>=)
```
Supabase devuelve la información estructurada directamente en un **Array de Objetos JSON** en la variable `data`, listos para usar en un `.map()` de React.

---

## ➕ INSERT (Crear Datos)

**Tu cerebro en SQL:**
```sql
INSERT INTO usuarios (nombre, edad) VALUES ('Dano', 25);
```

**Tu código en React:**
```javascript
const { error } = await supabase
  .from('usuarios')
  .insert([
    { nombre: 'Dano', edad: 25 }
  ]);
```

---

## ✏️ UPDATE y DELETE

**Actualizar (UPDATE):**
```javascript
const { error } = await supabase
  .from('usuarios')
  .update({ nombre: 'Daniel' }) // Qué modificar
  .eq('id', 1); // Condición WHERE (eq = Equals)
```

**Borrar (DELETE):**
```javascript
const { error } = await supabase
  .from('usuarios')
  .delete()
  .eq('id', 1); // ¡OBLIGATORIO! Sin el .eq, borrarías toda la tabla.
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tienes dos tablas unidas por una clave foránea (Foreign Key). La tabla `usuarios` y la tabla `posts` (donde `posts.user_id` referencia a `usuarios.id`).
¿Cómo crees que el cliente JS de Supabase haría el equivalente a un **INNER JOIN** para obtener los posts y el nombre de su creador?

**Respuesta y Justificación:**
¡Supabase hace que los JOINs sean ridículamente fáciles gracias a PostgREST!
Como PostgreSQL ya sabe que existe una Foreign Key entre ambas tablas, en JS solo debes hacer esto:
```javascript
const { data } = await supabase
  .from('posts')
  .select('titulo, usuarios (nombre)');
```
Esa simple sintaxis `tabla_foranea (columnas)` instruye a Supabase para que haga el JOIN automáticamente y devuelva los posts anidando el objeto del usuario correspondiente en la respuesta JSON.
