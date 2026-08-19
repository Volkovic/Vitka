# 🛡️ Row Level Security (RLS)

Si tu aplicación de React se conecta directamente a la Base de Datos usando la llave pública `anon`, ¿qué impide que un usuario malicioso abra la consola del navegador y ejecute `supabase.from('usuarios').delete()` borrando absolutamente a todos tus usuarios?

La respuesta es **Row Level Security (RLS)** o Seguridad a Nivel de Fila. Es la característica más importante al usar Supabase.

---

## 🛑 El Principio de Negación por Defecto

Cuando creas una tabla nueva en Supabase, te preguntará si quieres "Habilitar RLS".
**Siempre debes habilitarlo.**

Al hacerlo, la tabla queda **completamente sellada** para las peticiones públicas (Frontend). Si intentas hacer un `SELECT *`, Supabase te devolverá un array vacío `[]`. Si intentas hacer un `INSERT`, te devolverá error.

Para permitir el acceso, debes escribir explícitamente "Políticas" (Policies).

---

## 📜 Las Políticas (Policies)

Una Política es una regla SQL que evalúa si la petición actual está autorizada para afectar una fila específica de la base de datos.

Imagina que estás construyendo una App de Notas (To-Do List). Quieres que el usuario solo pueda leer **SUS propias notas**, no las de los demás.

**La Política de SELECT (SQL en el panel de Supabase):**
```sql
CREATE POLICY "Permitir lectura solo a dueños" 
ON notas 
FOR SELECT 
USING (
  -- Comprueba si el ID del creador de la nota coincide con el ID de la sesión del usuario actual
  auth.uid() = user_id
);
```

Cuando el frontend de React ejecute `supabase.from('notas').select('*')`, Supabase interceptará la petición, revisará quién está logueado (`auth.uid()`), y **filtrará en tiempo real** devolviendo únicamente las filas donde la condición sea `true`.

---

## 🛠️ Ejercicio In-line

**Pregunta:** Construyes un Blog público. Los administradores pueden crear Posts, pero quieres que *cualquier visitante* de internet pueda leerlos, sin necesidad de iniciar sesión. Tienes RLS habilitado en la tabla `posts`. ¿Qué condición SQL pondrías en el bloque `USING` de tu Política de lectura para lograr esto?

**Respuesta y Justificación:**
Pondrías la condición `true` en el panel de reglas de RLS.
```sql
CREATE POLICY "Lectura pública universal" ON posts FOR SELECT USING (true);
```
Al poner `true`, le estás diciendo a la base de datos que la autorización es universal para la operación SELECT. Ojo: Solo creas la política para SELECT. Así, todos leen (anónimos o logueados), pero nadie puede insertar o borrar porque no creaste políticas para INSERT o DELETE.
