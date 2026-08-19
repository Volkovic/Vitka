# 🔐 Autenticación de Usuarios (Auth)

El sistema de autenticación de Supabase es uno de los módulos más robustos de la plataforma. Configurar sistemas de Login seguros, encriptar contraseñas (Hashing), y mantener el estado de la sesión (Tokens JWT) tomaría semanas si lo hicieras desde cero. Supabase lo hace en tres líneas.

---

## 👤 Registro y Login

Supabase Auth soporta múltiples proveedores (Google, GitHub, Apple), pero veamos el registro clásico por email y contraseña.

**Registrar Usuario (Sign Up):**
```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'usuario@ejemplo.com',
  password: 'MiSuperPasswordSeguro'
});
```
Automáticamente, Supabase encriptará esa contraseña con `bcrypt`, insertará al usuario en una tabla interna oculta llamada `auth.users`, y le enviará un correo de confirmación (si lo configuras así).

**Iniciar Sesión (Sign In):**
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'usuario@ejemplo.com',
  password: 'MiSuperPasswordSeguro'
});
```

---

## 📡 Persistencia de Sesión (El estado en React)

Cuando el usuario inicia sesión exitosamente, Supabase guarda silenciosamente un Token de acceso en el `localStorage` del navegador.

Tu trabajo en React es "escuchar" si hay un usuario logueado usando un `useEffect` para cambiar la Interfaz (ej. ocultar el botón "Login" y mostrar "Cerrar Sesión").

```javascript
import { useEffect, useState } from 'react';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 1. Preguntamos la sesión actual
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    // 2. Nos suscribimos a futuros cambios (login, logout, token expirado)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session ? <PanelControl /> : <PantallaLogin />;
}
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Un usuario se registra en tu app usando `supabase.auth.signUp()`. Vas a tu tabla pública de PostgreSQL llamada `public.usuarios` para ver sus datos, pero la tabla está completamente vacía. ¿Dónde se guardó la información de este nuevo usuario?

**Respuesta y Justificación:**
Se guardó en el esquema privado `auth.users`. 
Por diseño estricto de seguridad, Supabase maneja toda la autenticación (emails, contraseñas, confirmaciones) en un esquema bloqueado al que tú no debes acceder directamente con CRUD.
Si quieres tener una tabla pública `usuarios` para poner la "Foto de perfil" o "Bio", debes configurarlo (usualmente mediante un *Trigger* (Disparador) de SQL) para que cuando se inserte una fila en `auth.users`, automáticamente inserte una fila espejo con el mismo ID en tu tabla pública `usuarios`.
