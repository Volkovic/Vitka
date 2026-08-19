# 🏛️ Arquitectura Single Page Application (SPA)

Si alguna vez navegaste por un sitio web tradicional (como los hechos en PHP o WordPress clásico), notarás que cada vez que haces clic en un enlace de navegación, el navegador se pone en blanco por medio segundo y recarga todos los archivos pesados (HTML, CSS, JS) desde cero.

React vino a resolver esto popularizando el concepto de **Single Page Application (SPA)**.

---

## ⚡ El Concepto SPA

En una SPA, el servidor físico te envía **un solo archivo HTML** en toda tu vida (generalmente el `index.html` que está vacío salvo por un `<div id="root">`). Todo el código de tu sitio se descarga en ese primer instante gracias al Bundler (Vite).

A partir de ahí, **React toma el control absoluto del navegador**. Cuando el usuario hace clic en "Ir a Perfil", no se contacta al servidor para pedir otra página web. React intercepta el clic, oculta inmediatamente el Componente Home, e inyecta el Componente Perfil en milisegundos usando JavaScript (Virtual DOM).

La navegación es instantánea. Parece una App de celular nativa.

---

## 🚏 React Router

React por sí solo no trae herramientas de enrutamiento. Para simular que estamos cambiando de URLs (ej. pasando de `/inicio` a `/perfil`) sin recargar la página, la industria utiliza la librería estándar **React Router**.

```tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Perfil from './Perfil';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        {/* En lugar de usar la etiqueta nativa <a> que recargaría la página, usamos <Link> */}
        <Link to="/">Inicio</Link>
        <Link to="/perfil">Mi Perfil</Link>
      </nav>

      {/* Aquí definimos qué componente se renderiza según la URL real del navegador */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tienes una SPA funcional y de repente un usuario escribe manualmente en la barra del navegador `tusitio.com/dashboard/ventas` y presiona Enter. ¿El archivo HTML de esa página existe físicamente en el servidor backend para que se lo devuelvan? ¿Cómo se soluciona esto en despliegue?

**Respuesta y Justificación:**
¡No, ese archivo HTML no existe! Como es una SPA, el servidor solo tiene el archivo `index.html` en la raíz. Si el usuario pide `/dashboard/ventas` al servidor directamente, el backend arrojará un error 404 (No Encontrado).
**Solución:** Al subir una app de React a producción (Vercel, AWS, Nginx), se debe configurar una "Regla de Re-escritura" que diga: *Cualquier ruta que el usuario pida y que no exista en disco, devuélvele siempre el index.html original*. De esta forma, el navegador carga el `index.html`, React despierta, lee que la URL dice `/dashboard/ventas` y dibuja el componente correcto instantáneamente.
