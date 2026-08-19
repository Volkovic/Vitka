# 📐 Sistemas de Diseño Restringidos

Uno de los problemas más invisibles, pero más dañinos en un equipo de desarrollo, es el uso de **"Números Mágicos"**.

Imagina abrir un archivo CSS tradicional y ver esto:
```css
.boton { padding: 13px 21px; color: #f7a8b2; }
.alerta { margin-top: 17px; background: #f8abb4; }
```
A lo largo de los años, diferentes programadores añadieron píxeles y colores "a ojo". El resultado es una interfaz inconsistente que se siente barata y descuidada, con 40 tonos de rojo distintos.

---

## ⚖️ Restricción Matemática

Tailwind CSS no es solo una librería, es un **Sistema de Diseño (Design System)** restrictivo. Te obliga a elegir dentro de una escala matemática predefinida.

En lugar de inventar un margen de `17px`, Tailwind te da una escala basada en unidades relativas (`rem`):
- `m-1` = 0.25rem (4px)
- `m-2` = 0.50rem (8px)
- `m-4` = 1.00rem (16px)

**No existe el `m-17px` en Tailwind por defecto.** 
Esta restricción es intencional. Al obligar a todo el equipo a usar la misma escala (múltiplos de 4px generalmente), la aplicación adquiere automáticamente un ritmo vertical consistente. La UI se siente profesional, simétrica y limpia, sin que los desarrolladores tengan que ser diseñadores expertos.

---

## 🎨 Paletas de Color Deterministas

Lo mismo ocurre con los colores. Tailwind no asume que tú inventarás una paleta. Proporciona una paleta de colores curada por diseñadores, que va desde el peso `50` (el más claro) hasta el `950` (el más oscuro).

Si quieres un fondo rojo, usarás `bg-red-500`. Si quieres un borde más oscuro, `border-red-700`.
Esta restricción erradica por completo la existencia de colores "huérfanos" (el infame `#f7a8b2`) en la aplicación.

---

## 🛠️ Ejercicio In-line

**Pregunta:** Estás construyendo un clon de una marca muy específica (ej. Spotify), y tu diseñador insiste en que el botón debe medir *exactamente* 23px de alto y tener el color de la marca (un verde exótico `#1DB954`). Pero Tailwind restringe el diseño. ¿Cómo resuelves arquitectónicamente esta desviación en el paradigma restrictivo de Tailwind?

**Respuesta y Justificación:**
La restricción de Tailwind es fuerte por defecto, pero **Altamente Configurable**.
La arquitectura dicta que no debes usar "números mágicos" directamente en el JSX. La solución es extender la configuración en el archivo global `tailwind.config.js`. Allí puedes registrar tu propio color (ej. `spotify-green: '#1DB954'`) o tu propio tamaño específico. Al hacerlo, Tailwind compilará dinámicamente las clases `bg-spotify-green` y `h-[23px]`, permitiendo la flexibilidad sin perder la trazabilidad de los estilos en toda la aplicación.
