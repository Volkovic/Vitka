# Día 11 - Funciones

## Funciones

Hasta ahora hemos aprendido muchas funciones integradas de Python. En esta sección nos centraremos en funciones definidas por el usuario. ¿Qué es una función? Antes de crear funciones, entendamos qué es y por qué las necesitamos.

### Definir funciones

Una función es un bloque de código reutilizable o una sentencia de programación que realiza una tarea específica. Para definir o declarar una función, Python provee la palabra clave def. La sintaxis para definir funciones es la siguiente. El código dentro de la función solo se ejecuta cuando la llamamos o la invocamos.


---

### Declarar y llamar a una función

Cuando creamos una función, decimos que la declaramos. Cuando la usamos, decimos que la llamamos o invocamos. Las funciones pueden tener parámetros o no.

```py
# Sintaxis
# Declarar una función
def function_name():
    codes
    codes
# Llamar a una función
function_name()
```


---

### Función sin parámetros

Una función puede declararse sin parámetros.

**Ejemplo:**

```py
def generate_full_name ():
    first_name = 'Asabeneh'
    last_name = 'Yetayeh'
    space = ' '
    full_name = first_name + space + last_name
    print(full_name)
generate_full_name () # Llamar a una función

def add_two_numbers ():
    num_one = 2
    num_two = 3
    total = num_one + num_two
    print(total)
add_two_numbers()
```


---

### Funciones que retornan valores - Parte 1

Una función también puede devolver un valor; si una función no tiene return, devuelve None. Reescribamos las funciones anteriores usando return. A partir de ahora, cuando llamemos a la función y la imprimamos, obtendremos un valor.

```py
def generate_full_name ():
    first_name = 'Asabeneh'
    last_name = 'Yetayeh'
    space = ' '
    full_name = first_name + space + last_name
    return full_name
print(generate_full_name())

def add_two_numbers ():
    num_one = 2
    num_two = 3
    total = num_one + num_two
    return total
print(add_two_numbers())
```


---

### Funciones con parámetros

En una función podemos pasar diferentes tipos de datos (números, cadenas, booleanos, listas, tuplas, diccionarios o sets) como parámetros.

- Parámetro único: si una función necesita un parámetro, la llamamos con un argumento.

```py
  # Sintaxis
  # Declarar una función
  def function_name(parameter):
    codes
    codes
  # Llamar a la función
  print(function_name(argument))
```

**Ejemplo:**

```py
def greetings (name):
    message = name + ', welcome to Python for Everyone!'
    return message

print(greetings('Asabeneh'))

def add_ten(num):
    ten = 10
    return num + ten
print(add_ten(90))

def square_number(x):
    return x * x
print(square_number(2))

def area_of_circle (r):
    PI = 3.14
    area = PI * r ** 2
    return area
print(area_of_circle(10))

def sum_of_numbers(n):
    total = 0
    for i in range(n+1):
        total+=i
    print(total)
print(sum_of_numbers(10)) # 55
print(sum_of_numbers(100)) # 5050
```

- Dos parámetros: una función puede no tener parámetros o tener uno o varios. Si necesita dos parámetros, la llamamos con dos argumentos.

```py
  # Sintaxis
  # Declarar una función
  def function_name(para1, para2):
    codes
    codes
  # Llamar a la función
  print(function_name(arg1, arg2))
```


---

**Ejemplo:**

```py
def generate_full_name (first_name, last_name):
    space = ' '
    full_name = first_name + space + last_name
    return full_name
print('Full Name: ', generate_full_name('Asabeneh','Yetayeh'))

def sum_two_numbers (num_one, num_two):
    sum = num_one + num_two
    return sum
print('Sum of two numbers: ', sum_two_numbers(1, 9))

def calculate_age (current_year, birth_year):
    age = current_year - birth_year
    return age;

print('Age: ', calculate_age(2021, 1819))

def weight_of_object (mass, gravity):
    weight = str(mass * gravity)+ ' N' # El valor necesita convertirse a cadena primero
    return weight
print('Weight of an object in Newtons: ', weight_of_object(100, 9.81))
```


---

### Pasar argumentos por clave y valor

Si pasamos argumentos por clave=valor, el orden de los parámetros no importa.

```py
# Sintaxis
# Declarar una función
def function_name(para1, para2):
    codes
    codes
# Llamar a la función
print(function_name(para1 = 'John', para2 = 'Doe')) # el orden de los parámetros no importa
```

**Ejemplo:**

```py
def print_fullname(firstname, lastname):
    space = ' '
    full_name = firstname  + space + lastname
    print(full_name)
print(print_fullname(firstname = 'Asabeneh', lastname = 'Yetayeh'))

def add_two_numbers (num1, num2):
    total = num1 + num2
    print(total)
print(add_two_numbers(num2 = 3, num1 = 2)) # el orden no importa
```


---

### Funciones que retornan valores - Parte 2

Si no retornamos un valor en una función, por defecto devuelve _None_. Para devolver un valor usamos la palabra clave _return_ seguida de la variable a retornar. Podemos devolver cualquier tipo de dato desde una función.

- Devolver cadenas:
  **Ejemplo:**

```py
def print_name(firstname):
    return firstname
print_name('Asabeneh') # Asabeneh

def print_full_name(firstname, lastname):
    space = ' '
    full_name = firstname  + space + lastname
    return full_name
print_full_name(firstname='Asabeneh', lastname='Yetayeh')
```

- Devolver números:

**Ejemplo:**

```py
def add_two_numbers (num1, num2):
    total = num1 + num2
    return total
print(add_two_numbers(2, 3))

def calculate_age (current_year, birth_year):
    age = current_year - birth_year
    return age;
print('Age: ', calculate_age(2019, 1819))
```

- Devolver booleanos:
  **Ejemplo:**

```py
def is_even (n):
    if n % 2 == 0:
        print('even')
        return True    # la instrucción return detiene la ejecución adicional en la función
    return False
print(is_even(10)) # True
print(is_even(7)) # False
```

- Devolver listas:
  **Ejemplo:**

```py
def find_even_numbers(n):
    evens = []
    for i in range(n + 1):
        if i % 2 == 0:
            evens.append(i)
    return evens
print(find_even_numbers(10))
```


---

### Funciones con parámetros por defecto

A veces pasamos valores por defecto a los parámetros. Si no proporcionamos un argumento al llamar la función, se usa el valor por defecto.

```py
# Sintaxis
# Declarar una función
def function_name(param = value):
    codes
    codes
# Llamar a la función
function_name()
function_name(arg)
```

**Ejemplo:**

```py
def greetings (name = 'Peter'):
    message = name + ', welcome to Python for Everyone!'
    return message
print(greetings())
print(greetings('Asabeneh'))

def generate_full_name (first_name = 'Asabeneh', last_name = 'Yetayeh'):
    space = ' '
    full_name = first_name + space + last_name
    return full_name

print(generate_full_name())
print(generate_full_name('David','Smith'))

def calculate_age (birth_year,current_year = 2021):
    age = current_year - birth_year
    return age;
print('Age: ', calculate_age(1821))

def weight_of_object (mass, gravity = 9.81):
    weight = str(mass * gravity)+ ' N' # gravedad promedio en la superficie de la Tierra
    return weight
print('Weight of an object in Newtons: ', weight_of_object(100)) # 9.81 - gravedad promedio en la Tierra
print('Weight of an object in Newtons: ', weight_of_object(100, 1.62)) # gravedad en la Luna
```


---

### Número arbitrario de argumentos

Si no sabemos cuántos argumentos se pasarán a la función, podemos usar un parámetro con * para aceptar un número arbitrario de argumentos.

```py
# Sintaxis
# Declarar una función
def function_name(*args):
    codes
    codes
# Llamar a la función
function_name(param1, param2, param3,..)
```

**Ejemplo:**

```py
def sum_all_nums(*nums):
    total = 0
    for num in nums:
        total += num     # equivalente a total = total + num
    return total
print(sum_all_nums(2, 3, 5)) # 10
```


---

### Parámetros por defecto y arbitrarios en funciones

```py
def generate_groups (team,*args):
    print(team)
    for i in args:
        print(i)
print(generate_groups('Team-1','Asabeneh','Brook','David','Eyob'))
```


---

### Función como parámetro de otra función

```py
# Puedes pasar una función como argumento
def square_number (n):
    return n * n
def do_something(f, x):
    return f(x)
print(do_something(square_number, 3)) # 27
```



---

---

## 💻 Ejercicios Prácticos (Funciones)

**Consigna 1:** Escribe una función `area_of_circle` que reciba un radio y retorne el área del círculo (usa `math.pi`).
**[Solución]**
```python
import math

def area_of_circle(r):
    return math.pi * r * r

print(area_of_circle(10)) # 314.159...
```

**Consigna 2:** Crea una función llamada `add_all_nums` que reciba un número arbitrario de argumentos usando `*args` y retorne la suma de todos ellos.
**[Solución]**
```python
def add_all_nums(*nums):
    total = 0
    for num in nums:
        total += num
    return total

print(add_all_nums(1, 2, 3, 4, 5)) # 15
```

**Consigna 3:** Crea una función llamada `capitalize_list_items` que reciba una lista de strings y retorne una nueva lista con cada elemento en mayúscula.
**[Solución]**
```python
def capitalize_list_items(items):
    capitalized = []
    for item in items:
        capitalized.append(item.upper())
    return capitalized

print(capitalize_list_items(['manzana', 'banana'])) # ['MANZANA', 'BANANA']
```
