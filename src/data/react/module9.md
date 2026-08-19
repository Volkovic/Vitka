# 🪝 Hooks Personalizados (Custom Hooks)

React viene con Hooks integrados (`useState`, `useEffect`, `useContext`), pero su poder real es que te permite construir **tus propios Hooks** para reutilizar lógica compleja entre múltiples componentes.

---

## ♻️ El Principio DRY (Don't Repeat Yourself)

Supón que tienes dos componentes distintos (ej. Perfil y Productos) que necesitan conectarse a una API, mostrar un loader mientras esperan, y guardar los datos en el estado local una vez que lleguen.

Si escribes el mismo `useState` de "loading" y el mismo `useEffect` con el "fetch" en ambos componentes, estás violando el principio DRY.

---

## 🛠️ Creando un Custom Hook

Un Custom Hook es simplemente una función JavaScript normal, pero con dos reglas de oro:
1. **Su nombre debe empezar con `use`** (ej. `useFetch`, `useAuth`). Esto le indica al linter de React que dentro de esa función vas a invocar Hooks nativos.
2. **Puede usar otros Hooks en su interior.**

```tsx
import { useState, useEffect } from 'react';

// 1. Nombramos la función empezando con "use"
export function useFetch(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Extraemos la lógica repetitiva aquí adentro
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(info => {
        setData(info);
        setLoading(false);
      });
  }, [url]);

  // 3. Retornamos lo que el componente final necesitará usar
  return { data, loading };
}
```

---

## 🚀 Consumiendo nuestro Hook

Ahora, en cualquier componente donde necesitemos datos de una API, reducimos 15 líneas de código a una sola:

```tsx
import { useFetch } from './hooks/useFetch';

export default function Perfil() {
  // Magia pura: Lógica limpia y reutilizable
  const { data, loading } = useFetch('https://api.com/perfil/1');

  if (loading) return <p>Cargando...</p>;
  return <h1>Hola {data.nombre}</h1>;
}
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tienes un Hook llamado `useTemporizador`. Lo importas en dos componentes distintos: `<Header />` y `<Sidebar />`. Si el contador interno del Hook llega a "10" en el `<Header />`, ¿qué valor tendrá el contador en el `<Sidebar />`?

**Respuesta y Justificación:**
¡Tendrá su propio valor independiente (probablemente 0 si acaba de montar)! 
**Los Custom Hooks reutilizan la *lógica* de estado, NO el estado en sí mismo.** Cada vez que invocas un Hook en un componente, obtienes una instancia completamente aislada e independiente de los estados (`useState`) definidos en su interior. Si necesitas compartir el mismo dato exacto entre ellos, debes usar la Context API o Gestores Globales.
