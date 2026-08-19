# 🗄️ Almacenamiento (Supabase Storage)

Hasta ahora hemos guardado información estructurada (texto, números, booleanos) en las tablas de PostgreSQL. Pero, ¿qué pasa si el usuario quiere subir su foto de perfil, un PDF o un video? 

**Nunca debes guardar un archivo binario directamente en una base de datos.** Ocupará demasiado espacio, ralentizará tus búsquedas y aumentará drásticamente tus costos de servidor.

Para eso usamos **Storage** (Almacenamiento de Objetos), soportado por el ecosistema de Supabase, que se asemeja al famoso AWS S3.

---

## 🪣 Los Buckets (Cubetas)

En Storage, los archivos se organizan en contenedores masivos llamados **Buckets**.
Puedes crear un bucket llamado `avatars`. Al igual que las tablas en la Base de Datos, puedes asignarle Políticas RLS a tu Bucket (ej. "Solo usuarios logueados pueden subir archivos", "Todo el mundo puede descargar archivos").

---

## 📤 Subiendo un Archivo desde React

A través del cliente JS de Supabase, manejar un elemento `<input type="file">` es trivial:

```javascript
// Asume que obtuviste este 'file' desde el evento onChange de un input HTML
const archivo = file; 
// Generamos un nombre único (ej. usando la fecha actual o el ID del usuario) para no sobreescribir
const nombreUnico = `avatar_${Date.now()}.png`;

const { data, error } = await supabase
  .storage
  .from('avatars') // Seleccionamos el Bucket
  .upload(`public/${nombreUnico}`, archivo); // Ruta y archivo
```

---

## 🔗 Obteniendo la URL Pública

Una vez que la imagen está subida, necesitas mostrársela a tus usuarios en una etiqueta `<img />`. Supabase te da una URL permanente y gratuita:

```javascript
const { data } = supabase
  .storage
  .from('avatars')
  .getPublicUrl('public/avatar_123.png'); // Pasamos la ruta del archivo que acabamos de subir

console.log(data.publicUrl); // "https://tu-url.supabase.co/storage/v1/object/public/avatars/public/avatar_123.png"
```

Por lo general, guardarás ese string (la `publicUrl`) **en tu tabla de Base de Datos** de usuarios, bajo la columna `avatar_url`, cerrando así el ciclo perfecto de arquitectura de información.

---

## 🛠️ Ejercicio In-line

**Pregunta:** Un usuario sube su foto de perfil a tu aplicación usando el código `.upload('foto.png', file)`. Meses después, el mismo usuario quiere cambiar su foto por una nueva, así que carga un archivo diferente y usas el mismo código: `.upload('foto.png', file)`. ¿Qué ocurrirá?

**Respuesta y Justificación:**
Supabase te devolverá un **Error**. 
Por defecto, el método `.upload()` bloquea sobrescribir archivos que ya existen en esa ruta exacta para prevenir pérdidas accidentales de datos. Si quieres reemplazar intencionalmente un archivo que tiene el mismo nombre, debes pasar un tercer argumento de opciones: `.upload('foto.png', file, { upsert: true })`. Esto le dirá a Storage que borre la vieja imagen y la reemplace por la nueva.
