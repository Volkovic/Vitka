# Día 13 - Comprensiones de listas

## Comprensiones de listas

En Python, las comprensiones de listas son una forma concisa de crear listas a partir de secuencias. Es una manera corta de crear nuevas listas a partir de secuencias. Las comprensiones de listas son más rápidas que iterar sobre listas con un bucle for.

```py
# sintaxis
[i for i in iterable if expresión]
```

**Ejemplo 1**

Por ejemplo, si quieres convertir una cadena en una lista de caracteres, puedes hacerlo de varias formas. Veamos algunas:

```py
# un método
language = 'Python'
lst = list(language)  # convertir la cadena en lista
print(type(lst))      # list
print(lst)            # ['P', 'y', 't', 'h', 'o', 'n']

# segunda forma: comprensión de listas
lst = [i for i in language]
print(type(lst))      # list
print(lst)            # ['P', 'y', 't', 'h', 'o', 'n']
```

**Ejemplo 2**

Por ejemplo, si quieres generar una lista de números:

```py
# generar números
numbers = [i for i in range(11)]  # genera números de 0 a 10
print(numbers)                    # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# también puedes hacer operaciones matemáticas durante la iteración
squares = [i * i for i in range(11)]
print(squares)                    # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# también se pueden generar listas de tuplas
numbers = [(i, i * i) for i in range(11)]
print(numbers)                    # [(0, 0), (1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]
```

**Ejemplo 3**

Las comprensiones de listas pueden combinarse con expresiones if:

```py
# generar números pares
even_numbers = [i for i in range(21) if i % 2 == 0]  # genera pares de 0 a 20
print(even_numbers)                    # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# generar números impares
odd_numbers = [i for i in range(21) if i % 2 != 0]  # genera impares de 0 a 20
print(odd_numbers)                      # [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

# filtrar números: obtengamos los pares positivos
numbers = [-8, -7, -3, -1, 0, 1, 3, 4, 5, 7, 6, 8, 10]
positive_even_numbers = [i for i in range(21) if i % 2 == 0 and i > 0]
print(positive_even_numbers)           # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# aplanar una lista 2D
list_of_lists = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened_list = [number for row in list_of_lists for number in row]
print(flattened_list)                  # [1, 2, 3, 4, 5, 6, 7, 8, 9]
```


---

## Funciones lambda

Las funciones lambda son pequeñas funciones anónimas sin nombre. Pueden aceptar cualquier número de argumentos, pero solo una expresión. Las funciones lambda son similares a las funciones anónimas en JavaScript. Son útiles cuando necesitamos una función anónima dentro de otra función.

### Crear una función lambda

Para crear una función lambda usamos la palabra clave lambda, seguido de uno o más parámetros y luego una expresión. La función lambda no usa return explícito; devuelve la expresión implícitamente.

```py
# sintaxis
x = lambda param1, param2, param3: param1 + param2 + param3
print(x(arg1, arg2, arg3))
```

**Ejemplo:**

```py
# función nombrada
def add_two_nums(a, b):
    return a + b

print(add_two_nums(2, 3))  # 5

# con lambda
add_two_nums = lambda a, b: a + b
print(add_two_nums(2, 3))  # 5

# lambda autoejecutable
print((lambda a, b: a + b)(2, 3))  # 5

square = lambda x: x ** 2
print(square(3))    # 9
cube = lambda x: x ** 3
print(cube(3))      # 27

# múltiples variables
multiple_variable = lambda a, b, c: a ** 2 - 3 * b + 4 * c
print(multiple_variable(5, 5, 3))  # 22
```


---

### Funciones lambda dentro de otra función

Uso de lambda dentro de otra función:

```py
def power(x):
    return lambda n: x ** n

cube = power(2)(3)   # la función power ahora se usa con dos pares de paréntesis
print(cube)          # 8
two_power_of_five = power(2)(5)
print(two_power_of_five)  # 32
```



---

---

## 

**Consigna 1:** Tienes la lista `numbers = [1, 2, 3, 4, 5]`. Utiliza List Comprehension para crear una nueva lista con todos los números elevados al cuadrado.
**[Solución]**
```python
numbers = [1, 2, 3, 4, 5]
squares = [num ** 2 for num in numbers]
print(squares) # [1, 4, 9, 16, 25]
```

**Consigna 2:** Tienes la lista de tuplas `list_of_tuples = [(1, 1, 1), (2, 4, 8), (3, 9, 27)]`. Utiliza List Comprehension para aplanarla en una lista 1D.
**[Solución]**
```python
list_of_tuples = [(1, 1, 1), (2, 4, 8), (3, 9, 27)]
flattened = [num for row in list_of_tuples for num in row]
print(flattened) # [1, 1, 1, 2, 4, 8, 3, 9, 27]
```

**Consigna 3:** Crea una lista de números pares del 0 al 10 utilizando List Comprehension con una condición `if`.
**[Solución]**
```python
pares = [i for i in range(11) if i % 2 == 0]
print(pares) # [0, 2, 4, 6, 8, 10]
```

---

## 💻 Ejercicios Prácticos (List Comprehension)

**Consigna 1:** Tienes la lista `numbers = [1, 2, 3, 4, 5]`. Utiliza List Comprehension para crear una nueva lista con todos los números elevados al cuadrado.
**[Solución]**
```python
numbers = [1, 2, 3, 4, 5]
squares = [num ** 2 for num in numbers]
print(squares) # [1, 4, 9, 16, 25]
```

**Consigna 2:** Tienes la lista de tuplas `list_of_tuples = [(1, 1, 1), (2, 4, 8), (3, 9, 27)]`. Utiliza List Comprehension para aplanarla en una lista 1D.
**[Solución]**
```python
list_of_tuples = [(1, 1, 1), (2, 4, 8), (3, 9, 27)]
flattened = [num for row in list_of_tuples for num in row]
print(flattened) # [1, 1, 1, 2, 4, 8, 3, 9, 27]
```

**Consigna 3:** Crea una lista de números pares del 0 al 10 utilizando List Comprehension con una condición `if`.
**[Solución]**
```python
pares = [i for i in range(11) if i % 2 == 0]
print(pares) # [0, 2, 4, 6, 8, 10]
```
