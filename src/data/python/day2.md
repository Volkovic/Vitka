# Día 2 - Variables y Funciones

_Lectura aproximada: 12 min_

En este día, aprenderemos sobre las funciones integradas en Python y cómo declarar variables para almacenar datos en la memoria. 

Prepárate para interactuar con los fundamentos del lenguaje.

---

## Funciones integradas

Python proporciona muchas funciones integradas (built-in). Están disponibles a nivel global, lo que significa que puedes usarlas sin importar o configurar nada.

Algunas de las más comunes son: `print()`, `len()`, `type()`, `int()`, `float()`, `str()`, `input()`, `list()`, `dict()`, `min()`, `max()`, `sum()`.

---

Veamos algunas de ellas en acción directamente desde el intérprete interactivo. Por ejemplo, imprimiendo textos básicos:

```py
print('Hello, World!') # El texto es un argumento
print('Hello',',', 'World','!') # Puede tomar múltiples argumentos
print(len('Hello, World!')) # len() calcula la longitud del texto
```

---

Otras funciones útiles sirven para pedir ayuda al sistema o listar propiedades:

```py
help('keywords') # Muestra las palabras reservadas de Python
help(print) # Muestra documentación sobre cómo funciona print
dir(str) # Lista todos los métodos disponibles para las cadenas
```

Como vimos con `help('keywords')`, Python tiene **palabras reservadas**. No podemos usarlas para nombrar nuestras variables o funciones.

---

## Variables

Las variables almacenan datos en la memoria del ordenador. En muchos lenguajes se recomienda usar nombres mnemotécnicos (fáciles de recordar y asociar). 

Una variable hace referencia a la dirección de memoria donde se almacena el dato.

**Reglas para nombres de variables en Python:**
- Deben comenzar con una letra o un guion bajo `_`
- No pueden comenzar con un número.
- Sólo pueden contener caracteres alfanuméricos y guiones bajos (A-z, 0-9 y _).
- Distinguen mayúsculas de minúsculas (`age` es distinto a `Age`).

---

### Convención de Nombres

Usaremos la convención de nombres estándar de Python: **snake_case**.
Para variables con varias palabras, usamos guiones bajos entre las palabras.

Nombres válidos: `first_name`, `age`, `country`, `year_2021`.
Nombres inválidos: `first-name`, `1num`, `first@name`.

---

Cuando asignamos un valor a una variable, decimos que la estamos **declarando**.

El signo igual `=` es el operador de asignación. Asignar significa almacenar un dato en una variable, y no tiene el mismo significado que en matemáticas puras.

```py
# Variables en Python
first_name = 'Asabeneh'
last_name = 'Yetayeh'
country = 'Finland'
age = 250
is_married = True
```

---

Imprimamos y calculemos la longitud de las variables que acabamos de declarar usando `print()` y `len()`:

```py
print('First name:', first_name)
print('First name length:', len(first_name))
print('Age: ', age)
print('Married: ', is_married)
```

---

### Declarar varias variables en una línea

También se pueden declarar múltiples variables en la misma línea, lo cual es útil para ahorrar espacio:

```py
first_name, last_name, country, age = 'Asabeneh', 'Yetayeh', 'Finland', 250

print(first_name, last_name, country, age)
```

---

### Función Input

Usa la función integrada `input()` para obtener entrada directamente del usuario mediante el teclado.

```py
first_name = input('What is your name: ') 
age = input('How old are you? ')

print(first_name)
print(age)
```

---

## Tipos de datos

En programación, todo está relacionado con los tipos de datos. Para identificar el tipo de un dato usamos la función integrada `type()`.

```py
print(type('Asabeneh'))     # str (Cadena de texto)
print(type(10))             # int (Entero)
print(type(3.14))           # float (Decimal)
print(type(True))           # bool (Booleano)
print(type([1, 2, 3]))      # list (Lista)
```

---

## Conversión de tipos de datos

A veces necesitamos convertir un dato de un tipo a otro (Casting). Usamos funciones como `int()`, `float()`, `str()`, `list()`.

```py
# De entero a float
num_int = 10
num_float = float(num_int)
print(num_float)   # 10.0

# De float a entero
gravity = 9.81
print(int(gravity))             # 9
```

---

Otro caso muy común es recibir un número como texto (String) desde la función `input()`, y convertirlo a Entero para hacer matemáticas:

```py
# De cadena a entero o float
num_str = '10.6'
print(int('10'))      # 10
print(float(num_str))  # 10.6

# De cadena a lista
print(list('Python'))  # ['P', 'y', 't', 'h', 'o', 'n']
```

---

## Números

Diferentes tipos numéricos en Python:

- **Integer**: números enteros (negativos, 0 y positivos). Ej: `..., -2, -1, 0, 1, 2, ...`
- **Float**: números de punto flotante. Ej: `..., -1.0, 0.0, 1.1, 2.2, ...`
- **Complex**: números complejos. Ej: `1 + 1j, 2 + 4j`

---

---

## 💻 Ejercicios Prácticos (Variables y Funciones Integradas)

**Consigna 1:** Declara una variable llamada `full_name` y asígnale un nombre completo. Imprime el valor y el tipo de dato utilizando la función `type()`.
**[Solución]**
```python
full_name = "Asabeneh Yetayeh"
print("Nombre:", full_name)
print("Tipo:", type(full_name))
```

**Consigna 2:** Declara dos variables, `num_one = 5` y `num_two = 4`. Suma ambas variables y asigna el resultado a una variable `total`, luego imprímela.
**[Solución]**
```python
num_one = 5
num_two = 4
total = num_one + num_two
print("La suma es:", total) # 9
```

**Consigna 3:** Solicita al usuario su edad utilizando la función `input()`, conviértela a entero y muestra cuántos años tendrá en 10 años.
**[Solución]**
```python
# age_input = input("Ingresa tu edad: ")
# age = int(age_input)
age = 20 # Valor simulado para el ejemplo
print("En 10 años tendrás:", age + 10)
```
