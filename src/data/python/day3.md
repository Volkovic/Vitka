# Día 3 - Operadores

_Lectura aproximada: 12 min_

## Boolean

El tipo booleano representa uno de dos valores: _True_ o _False_. Cuando comencemos a usar operadores de comparación su uso quedará claro. La primera letra **T** representa True y **F** representa False; a diferencia de JavaScript, en Python las palabras booleanas deben escribirse con la primera letra en mayúscula.

**Ejemplo: valores booleanos**

```py
print(True)
print(False)
```


---

## Operadores

Python soporta varios tipos de operadores. En esta sección nos centraremos en algunos de ellos.

### Operadores de asignación

Los operadores de asignación se usan para asignar valores a las variables. Tomemos = como ejemplo: en matemáticas el signo igual indica que dos valores son iguales, pero en Python indica que estamos almacenando un valor en una variable; esto se llama asignación. La tabla siguiente muestra los diferentes operadores de asignación en Python (tomada de [w3schools](https://www.w3schools.com/python/python_operators.asp)).

![Assignment Operators](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/assignment_operators.png)

### Operadores aritméticos:

- Suma (+): a + b
- Resta (-): a - b
- Multiplicación (*): a * b
- División (/): a / b
- Módulo (%): a % b
- División entera (//): a // b
- Exponenciación (**): a ** b

![Arithmetic Operators](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/arithmetic_operators.png)

**Ejemplo: enteros**

```py
# Operadores aritméticos en Python
# Enteros

print('Addition: ', 1 + 2)        # 3
print('Subtraction: ', 2 - 1)     # 1
print('Multiplication: ', 2 * 3)  # 6
print ('Division: ', 4 / 2)       # 2.0  la división en Python devuelve float
print('Division: ', 6 / 2)        # 3.0         
print('Division: ', 7 / 2)        # 3.5
print('Division without the remainder: ', 7 // 2)   # 3, devuelve la parte entera del cociente
print ('Division without the remainder: ',7 // 3)   # 2
print('Modulus: ', 3 % 2)         # 1, devuelve el resto
print('Exponentiation: ', 2 ** 3) # 8 representa 2 * 2 * 2
```

**Ejemplo: flotantes**

```py
# Flotantes
print('Floating Point Number, PI', 3.14)
print('Floating Point Number, gravity', 9.81)
```

**Ejemplo: números complejos**

```py
# Números complejos
print('Complex number: ', 1 + 1j)
print('Multiplying complex numbers: ',(1 + 1j) * (1 - 1j))
```

Declararemos una variable y le asignaremos un valor numérico. En el ejemplo uso nombres de una sola letra, pero no acostumbres a nombrar variables así; los nombres deben ser siempre fáciles de recordar.


---

**Ejemplo:**

```python
# Primero declaramos las variables

a = 3 # a es un nombre de variable, 3 es un valor entero
b = 2 # b es un nombre de variable, 2 es un valor entero

# Realizamos operaciones aritméticas y asignamos los resultados a variables
total = a + b
diff = a - b
product = a * b
division = a / b
remainder = a % b
floor_division = a // b
exponential = a ** b

# Deberíamos usar sum en lugar de total, pero sum es una función integrada — evita sobrescribirla
print(total) # Si no imprimimos etiquetas, no sabremos qué representa cada valor
print('a + b = ', total)
print('a - b = ', diff)
print('a * b = ', product)
print('a / b = ', division)
print('a % b = ', remainder)
print('a // b = ', floor_division)
print('a ** b = ', exponentiation)
```


---

**Ejemplo:**

```py
print('== Addition, Subtraction, Multiplication, Division, Modulus ==')

# Declaramos las variables
num_one = 3
num_two = 4

# Operaciones aritméticas
total = num_one + num_two
diff = num_two - num_one
product = num_one * num_two
div = num_two / num_one
remainder = num_two % num_one

# Imprimimos con etiquetas
print('total: ', total)
print('difference: ', diff)
print('product: ', product)
print('division: ', div)
print('remainder: ', remainder)
```

Comencemos a usar números con decimales y pongamos en práctica lo aprendido para calcular áreas, volúmenes, densidades, pesos, perímetros, distancias y fuerzas.


---

**Ejemplo:**

```py
# Calcular el área de un círculo
radius = 10                                 # radio del círculo
area_of_circle = 3.14 * radius ** 2         # dos * indican exponente o potencia
print('Area of a circle:', area_of_circle)

# Calcular el área del rectángulo
length = 10
width = 20
area_of_rectangle = length * width
print('Area of rectangle:', area_of_rectangle)

# Calcular el peso de un objeto
mass = 75
gravity = 9.81
weight = mass * gravity
print(weight, 'N')                         # añadimos la unidad para la fuerza

# Calcular la densidad de un líquido
mass = 75 # unidad: Kg
volume = 0.075 # unidad: m³
density = mass / volume # 1000 Kg/m³

```


---

### Operadores de comparación

En programación usamos operadores de comparación para comparar dos valores. Comprobamos si un valor es mayor, menor o igual a otro. La tabla siguiente muestra los operadores de comparación en Python (tomada de [w3schools](https://www.w3schools.com/python/python_operators.asp)).

![Comparison Operators](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/comparison_operators.png)
**Ejemplo: operadores de comparación**

```py
print(3 > 2)     # True, porque 3 es mayor que 2
print(3 >= 2)    # True, porque 3 es mayor o igual que 2
print(3 < 2)     # False,  porque 3 no es menor que 2
print(2 < 3)     # True, porque 2 es menor que 3
print(2 <= 3)    # True, porque 2 es menor o igual que 3
print(3 == 2)    # False, porque 3 no es igual a 2
print(3 != 2)    # True, porque 3 no es igual a 2
print(len('mango') == len('avocado'))  # False
print(len('mango') != len('avocado'))  # True
print(len('mango') < len('avocado'))   # True
print(len('milk') != len('meat'))      # False
print(len('milk') == len('meat'))      # True
print(len('tomato') == len('potato'))  # True
print(len('python') > len('dragon'))   # False


# Las comparaciones devuelven True o False

print('True == True: ', True == True)
print('True == False: ', True == False)
print('False == False:', False == False)
```

Además de los operadores de comparación anteriores, Python también utiliza：

- _is_: devuelve True si los objetos son idénticos (x is y)
- _is not_: devuelve True si los objetos no son idénticos (x is not y)
- _in_: devuelve True si un elemento está en una secuencia (x in y)
- _not in_: devuelve True si un elemento no está en una secuencia (x not in y)

```py
print('1 is 1', 1 is 1)                   # True - porque los objetos son idénticos
print('1 is not 2', 1 is not 2)           # True - porque los objetos no son idénticos
print('A in Asabeneh', 'A' in 'Asabeneh') # True - la cadena contiene 'A'
print('B in Asabeneh', 'B' in 'Asabeneh') # False - no hay 'B' mayúscula
print('coding' in 'coding for all') # True - 'coding' está en 'coding for all'
print('a in an:', 'a' in 'an')      # True
print('4 is 2 ** 2:', 4 is 2 ** 2)   # True
```


---

### Operadores lógicos

A diferencia de otros lenguajes de programación, Python usa las palabras clave _and_, _or_ y _not_ como operadores lógicos. Los operadores lógicos se utilizan para combinar expresiones condicionales:

![Logical Operators](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/logical_operators.png)

```py
print(3 > 2 and 4 > 3) # True - porque ambas expresiones son True
print(3 > 2 and 4 < 3) # False - porque una de las expresiones es False
print(3 < 2 and 4 < 3) # False - porque ambas expresiones son False
print('True and True: ', True and True)
print(3 > 2 or 4 > 3)  # True - porque una o ambas expresiones son True
print(3 > 2 or 4 < 3)  # True - porque una de las expresiones es True
print(3 < 2 or 4 < 3)  # False - porque ambas expresiones son False
print('True or False:', True or False)
print(not 3 > 2)     # False - 3 > 2 es True, not True es False
print(not True)      # False - not convierte True en False
print(not False)     # True
print(not not True)  # True
print(not not False) # False

```



---