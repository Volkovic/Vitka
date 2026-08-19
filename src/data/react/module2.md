# 🧱 Componentes y Props

La verdadera magia de React es su capacidad para dividir interfaces complejas en pequeñas piezas de Lego independientes, reutilizables y fáciles de probar. A esto le llamamos **Componentes**.

---

## 🧩 ¿Qué es un Componente?

Técnicamente hablando (en el React moderno), un componente es simplemente una **Función de JavaScript que retorna JSX** (HTML).

Para que React sepa que es un Componente y no una función normal, **debes iniciar su nombre con Mayúscula**.

```tsx
// Definición del Componente (Empieza con mayúscula)
export default function BotonPersonalizado() {
  return (
    <button className="bg-blue-500 text-white p-2">
      Haz Clic
    </button>
  );
}
```

Luego, puedes usarlo en otro archivo como si fuera una etiqueta HTML nativa:
`<BotonPersonalizado />`

---

## 📦 Props: Pasando Datos hacia Abajo

Los componentes serían inútiles si siempre mostraran lo mismo. Las **Props** (Propiedades) permiten que un componente padre le pase información al componente hijo (igual que los atributos `src` o `href` en HTML).

Aquí es donde entra el poder de **TypeScript**. Debemos usar *Interfaces* para definir exactamente qué props espera nuestro componente.

```tsx
// 1. Definimos la Interfaz
interface CardProps {
  titulo: string;
  subtitulo?: string; // Opcional
}

// 2. Destructuramos las props y le asignamos el tipo
export default function Card({ titulo, subtitulo }: CardProps) {
  return (
    <div className="border p-4">
      <h2>{titulo}</h2>
      {/* Mostramos subtitulo solo si existe */}
      <p>{subtitulo}</p>
    </div>
  );
}
```

Ahora, si otro programador intenta hacer `<Card />` sin pasarle un `titulo`, TypeScript lanzará un error y Vite se negará a compilar la app. ¡Magia!

---

## 🛠️ Ejercicio In-line

**Pregunta:** Un componente Hijo recibe una prop llamada `nombre` desde su componente Padre. El Hijo intenta modificar esa prop internamente, por ejemplo, convirtiéndola a mayúsculas y reasignándola: `nombre = "DANO"`. ¿Es esto legal en React?

**Respuesta y Justificación:**
**¡No, es absolutamente ilegal!**
Las Props son de **Solo Lectura (Read-Only)**. El flujo de datos en React es estrictamente unidireccional (de arriba hacia abajo). Un hijo nunca puede mutar las props que le da su padre. Si un dato necesita cambiar con el tiempo interactuando con el usuario, no se usan Props; se usa el **Estado (State)**, que veremos en el próximo módulo.
