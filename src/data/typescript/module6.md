# 📘 TypeScript: Clases y OOP (Programación Orientada a Objetos)

JavaScript introdujo `class` en ES6, pero carece de características clásicas de OOP como encapsulamiento real o implementación de interfaces formales. TypeScript implementa todas estas piezas ausentes.

---

## 🔐 Modificadores de Acceso

En JS, todas las propiedades de una clase son públicas (hasta hace poco con los campos `#`). En TS, controlamos la visibilidad estrictamente con modificadores de acceso:

- `public` (Por defecto): Accesible desde cualquier lugar.
- `private`: Accesible **solo** dentro de la clase en la que se definió.
- `protected`: Accesible en la clase y en sus subclases (herencia).

```typescript
class CuentaBancaria {
    public titular: string;
    private saldo: number; // No se puede leer/escribir desde fuera

    constructor(titular: string, saldoInicial: number) {
        this.titular = titular;
        this.saldo = saldoInicial;
    }

    public depositar(monto: number) {
        this.saldo += monto;
    }
}

const miCuenta = new CuentaBancaria("Dano", 1000);
// console.log(miCuenta.saldo); // Error de compilación: property 'saldo' is private
```

---

## 🎩 Atajo en Constructores (Parameter Properties)

Escribir `this.propiedad = parametro` repetitivamente es tedioso. TS ofrece un atajo (Syntactic Sugar) para declarar y asignar propiedades directamente en el constructor.

```typescript
// Equivalente exacto a la clase anterior, pero en 3 líneas
class CuentaBancariaPro {
    constructor(public titular: string, private saldo: number) {}
}
```

---

## 🛠️ Ejercicio In-line

**Pregunta:** Tienes una Interfaz y una Clase. ¿Qué palabra clave se usa para obligar a una Clase a cumplir el "contrato" definido por una Interfaz?

```typescript
interface Volador {
    volar(): void;
}

// Rellena la palabra faltante:
class Avion _______ Volador {
    volar() {
        console.log("Despegando");
    }
}
```

**Respuesta y Justificación:**
La palabra clave es `implements`. Las interfaces dictan la *forma*, y las clases que las *implementan* se ven obligadas por el compilador a definir los métodos y propiedades exactas de ese contrato.

```typescript
class Avion implements Volador { ... }
```

---

## 🧬 Clases Abstractas

Una clase abstracta actúa como una plantilla pura. **No puede instanciarse** (no puedes hacer `new ClaseAbstracta()`), solo puede ser heredada.

```typescript
abstract class Empleado {
    constructor(public nombre: string) {}

    // Método que las subclases ESTÁN OBLIGADAS a implementar
    abstract calcularSalario(): number; 
}

class Desarrollador extends Empleado {
    calcularSalario() {
        return 3000;
    }
}

// const emp = new Empleado("Juan"); // Error: no se puede instanciar
```
