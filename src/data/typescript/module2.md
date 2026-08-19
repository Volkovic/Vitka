# 📘 TypeScript: Interfaces y Types

En JS, los objetos son estructuras dinámicas que pueden contener cualquier clave o valor. En TS, necesitamos describir la "forma" que debe tener un objeto para que el compilador nos ayude a evitar errores de sintaxis (typos) o acceso a propiedades inexistentes.

Hay dos formas principales de hacer esto: `interface` y `type`.

---

## 🧩 Usando `interface`

La palabra clave `interface` se utiliza casi exclusivamente para definir la forma de objetos.

```typescript
interface Usuario {
  id: number;
  nombre: string;
  isPremium: boolean;
}

const user1: Usuario = {
  id: 1,
  nombre: "Dano",
  isPremium: true
  // Si agregas una propiedad extra o te falta una, TS arrojará error.
};
```

---

## ❓ Propiedades Opcionales y de Solo Lectura

A veces, no todos los campos son obligatorios. Usamos `?` para propiedades opcionales.
Si no queremos que una propiedad pueda modificarse después de ser creada, usamos `readonly`.

```typescript
interface Producto {
  readonly id: string; // Una vez creado, no se puede cambiar
  nombre: string;
  precio: number;
  descuento?: number; // Es opcional. Puede ser number o undefined
}

const prod: Producto = { id: "P-1", nombre: "PC", precio: 1000 };
// prod.id = "P-2"; // Error: id es readonly
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tienes la siguiente interfaz y objeto. ¿Qué error marcará TS?

```typescript
interface Coche {
  marca: string;
  modelo?: string;
  readonly anio: number;
}

const miCoche: Coche = {
  marca: "Toyota",
  anio: 2020
};

miCoche.modelo = "Corolla";
miCoche.anio = 2021;
```

**Respuesta y Justificación:**
TS marcará error en `miCoche.anio = 2021;` porque la propiedad `anio` está definida como `readonly` en la interfaz `Coche`. Asignar `modelo` es válido, ya que es opcional y por defecto modificable.

---

## ⚖️ `type` vs `interface`

También puedes usar `type` para definir formas de objetos (y muchas cosas más).

```typescript
type UsuarioType = {
  nombre: string;
  edad: number;
};
```

**¿Cuál usar?** 
- Usa `interface` cuando modeles la forma de objetos de datos o clases, ya que son extensibles (puedes hacer que una interfaz herede de otra con `extends`).
- Usa `type` para uniones, tuplas y tipos primitivos complejos. (Lo veremos en el siguiente módulo).
Hoy en día, para objetos, ambas son casi intercambiables.
