# 🔌 El Cliente de Supabase en React

Para conectar nuestra aplicación de React con la base de datos PostgreSQL alojada en Supabase, necesitamos utilizar el **Cliente de JavaScript** oficial de Supabase.

---

## 🔑 Las Llaves de Acceso

Cuando creas un proyecto en el panel web de Supabase, se te otorgan dos credenciales vitales:
1. **Project URL:** La dirección web donde vive tu API (ej. `https://xyz.supabase.co`).
2. **API Key (anon / public):** Una llave pública diseñada específicamente para ser embebida en el código del Frontend (React).

*(Nota: También te dan una `service_role` key. Esta es secreta y **NUNCA** debe llegar al Frontend, da acceso total como administrador sin reglas de seguridad).*

---

## 🏗️ Inicializando el Cliente

Lo primero que haríamos en un proyecto Vite es instalar la librería:
`npm install @supabase/supabase-js`

Y luego, creamos un archivo (ej. `src/lib/supabase.js`) donde inicializamos la conexión una sola vez para que toda la App la reutilice:

```javascript
import { createClient } from '@supabase/supabase-js';

// Estas variables usualmente se sacan de un archivo oculto .env
const supabaseUrl = 'https://TU_URL.supabase.co';
const supabaseKey = 'TU_ANON_KEY';

// Creamos la instancia y la exportamos
export const supabase = createClient(supabaseUrl, supabaseKey);
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Un colega te dice que es peligrosísimo poner la clave `ANON_KEY` en el código frontend (y en GitHub), porque cualquiera podría leer el código fuente de tu React, copiar la llave y hacer consultas a tu Base de Datos PostgreSQL. ¿Tiene razón en preocuparse?

**Respuesta y Justificación:**
Tiene razón en que cualquiera puede robar esa llave, **¡pero está equivocado en que sea peligroso!**
Por diseño, la llave `anon` está hecha para ser pública. Supabase utiliza una tecnología de PostgreSQL llamada **RLS (Row Level Security)** que aprenderemos más adelante. RLS asegura que, aunque un hacker tenga tu URL y tu llave Anon, la base de datos le rechazará categóricamente todas las consultas a menos que ese hacker inicie sesión válidamente en tu plataforma o que tú decidas abrir las tablas públicamente. La seguridad está a nivel de tabla, no a nivel de llave.
