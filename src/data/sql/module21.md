# ⚡ Bases de Datos en Tiempo Real (Realtime)

Imagina que estás construyendo un clon de WhatsApp o un Dashboard de control de precios de criptomonedas. Si el precio cambia en la Base de Datos, quieres que el gráfico en el Frontend de React se actualice instantáneamente.

Antiguamente, el Frontend tendría que hacer *Polling* (hacer un `fetch` cada 3 segundos preguntando "hay cambios?"). Esto destruye la batería, la red y la Base de Datos. Supabase resuelve esto con la tecnología de **WebSockets** y **Realtime**.

---

## 📡 Suscripciones a Canales

Supabase permite que el cliente de React se "suscriba" (subscribe) para escuchar los eventos internos del motor de PostgreSQL en tiempo real (`INSERT`, `UPDATE`, `DELETE`).

```javascript
import { useEffect, useState } from 'react';

function Chat() {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    // 1. Nos suscribimos al canal de la tabla 'mensajes'
    const canal = supabase
      .channel('sala_publica')
      .on(
        'postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'mensajes' }, 
        (payload) => {
          // 2. Cada vez que ALGUIEN inserte un dato, se ejecuta este callback
          console.log("¡Nuevo mensaje recibido!", payload.new);
          // Actualizamos el estado de React añadiendo el mensaje nuevo
          setMensajes((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    // 3. Limpiamos la suscripción si el componente se destruye
    return () => { supabase.removeChannel(canal) };
  }, []);

  return <div>{/* Renderizamos mensajes */}</div>;
}
```

---

## ⚠️ Cuidado con la Memoria

Escuchar una tabla en tiempo real significa mantener una conexión de red (WebSocket) abierta permanentemente. Si te suscribes a tablas masivas que se actualizan miles de veces por segundo, tu navegador consumirá muchísima memoria y puede colapsar.

Asegúrate de suscribirte usando **filtros** si es necesario (ej. `filter: 'sala_id=eq.10'`) para que Supabase solo te envíe los eventos que realmente importan a esa pantalla.

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tienes una tabla llamada `ventas`. Tienes el "Realtime" encendido en el panel web de Supabase y te suscribiste a eventos de tipo `'UPDATE'` en React. Modificas una venta manualmente desde el panel de administrador, pero el evento nunca se dispara en tu consola de React. Has revisado y el código es correcto. ¿Por qué ocurre esto?

**Respuesta y Justificación:**
Probablemente olvidaste **habilitar el "Realtime" para esa tabla en específico** en PostgreSQL (activar la replicación lógica).
Por defecto, Supabase NO envía las modificaciones de las tablas al módulo de tiempo real, ya que esto consumiría enormes recursos del servidor. Para que una tabla emita eventos a través de los WebSockets, debes ir a la configuración de la tabla y tildar la opción "Enable Realtime". Solo entonces el servidor comenzará a publicar las mutaciones (inserts/updates/deletes) hacia los clientes suscritos.
