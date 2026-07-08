# Día 10 - Bucles

## Bucles

La vida está llena de ciclos. En programación realizamos muchas tareas repetitivas. Los lenguajes de programación usan bucles para gestionar tareas repetitivas; en Python hay principalmente dos tipos de bucles:
1. Bucle while
2. Bucle for


---

### Bucle while

Usamos la palabra clave `while` para crear un bucle while. Repite un bloque de código mientras la condición se cumpla. Cuando la condición se vuelve falsa, el bucle termina y se ejecuta el código que sigue.

```python
# Sintaxis
while condition:
    # código
```

**Ejemplo:**

```python
count = 0
while count < 5:
    print(count)
    count = count + 1
# prints from 0 to 4
```

En el bucle anterior, cuando count llegue a 5 la condición se vuelve falsa y el bucle se detiene.

Si queremos ejecutar un bloque cuando la condición sea falsa, podemos usar la palabra clave `else`.

```python
  # syntax
while condition:
    code goes here
else:
    code goes here
```


---

**Ejemplo:**

```python
count = 0
while count < 5:
    print(count)
    count = count + 1
else:
    print(count)
```

Cuando count sea 5 la condición será falsa, el bucle terminará y se ejecutará el bloque else; por tanto se imprimirá 5.


---

### break y continue - parte 1

* break: cuando queremos salir del bucle usamos la palabra clave \break`.`

```python
# syntax
while condition:
    code goes here
    if another_condition:
        break
```

**Example:**

```python
count = 0
while count < 5:
    print(count)
    count = count + 1
    if count == 3:
        break
```
El while anterior solo imprimirá 0, 1, 2; cuando count llegue a 3 el bucle terminará.
- Continue: cuando queremos saltarnos la iteración actual y continuar con la siguiente usamos la palabra clave `continue`.

```python
  # syntax
while condition:
    code goes here
    if another_condition:
        continue
```


---

**Ejemplo:**

```python
count = 0
while count < 5:
    if count == 3:
        count = count + 1
        continue
    print(count)
    count = count + 1
```

El while anterior imprimirá 0, 1, 2, 4 (3 se saltó).


---

### Bucle for

La palabra clave `for` se usa para crear bucles for. Es similar a otros lenguajes, pero con diferencias sintácticas. Se usa para iterar sobre secuencias (listas, tuplas, diccionarios, conjuntos, cadenas, etc.).

- Bucle for para listas

```python
# syntax
for iterator in lst:
    code goes here
```

**Ejemplo:**

```python
numbers = [0, 1, 2, 3, 4, 5]
for number in numbers: # number es un nombre temporal que referencia el elemento de la lista dentro del bucle
    print(number)       # number se imprimirá línea por línea, de 0 a 5
```

- Bucle for para cadenas

```python
# syntax
for iterator in string:
    code goes here
```


---

**Ejemplo:**

```python
language = 'Python'
for letter in language:
    print(letter)

for i in range(len(language)):
    print(language[i])
```

- Bucle for para tuplas

```python
# syntax
for iterator in tpl:
    code goes here
```

**Ejemplo:**

```python
numbers = (0, 1, 2, 3, 4, 5)
for number in numbers:
    print(number)
```

- Bucle for para diccionarios
  Al iterar, se recorrerán las claves del diccionario.

```python
  # syntax
for iterator in dct:
    code goes here
```


---

**Ejemplo:**

```python
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_marred':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
}
for key in person:
    print(key) # sólo imprime las claves

for key, value in person.items():
    print(key, value) # así podemos acceder a claves y valores durante la iteración
```

- Bucle for para conjuntos

```python
# syntax
for iterator in st:
    code goes here
```


---

**Ejemplo:**

```python
it_companies = {'Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon'}
for company in it_companies:
    print(company)
```


---

### break y continue - parte 2

Pista:
_break_: cuando queremos terminar el bucle antes de completarlo usamos `break`.

```python
# syntax
for iterator in sequence:
    code goes here
    if condition:
        break
```

**Ejemplo:**

```python
numbers = (0,1,2,3,4,5)
for number in numbers:
    print(number) # imprime 0, 1, 2, 3
    if number == 3:
        break
```
En el ejemplo anterior, cuando number sea 3 el bucle terminará.

_continue_: cuando queremos saltarnos la iteración actual y continuar con la siguiente usamos la palabra clave `continue`.

```python
  # syntax
for iterator in sequence:
    code goes here
    if condition:
        continue
```


---

**Ejemplo:**

```python
numbers = (0,1,2,3,4,5)
for number in numbers:
    print(number)
    if number == 3:
        continue
    print('Next number should be ', number + 1) if number != 5 else print("loop's end") # En resumen: para condiciones cortas se puede usar if y else en línea
print('outside the loop')
```
En el ejemplo anterior, cuando number es 3, las instrucciones posteriores dentro del bucle se saltan y si hay más elementos por recorrer, continúa con la siguiente iteración.


---

### Función range()

La función `range()` genera una secuencia de números. La forma _range(start, end, step)_ acepta tres parámetros: inicio, fin y paso. Por defecto inicio es 0 y el paso es 1. Se necesita al menos un parámetro (el valor de fin).

Usando `range()` para generar secuencias

```python
lst = list(range(11)) 
print(lst) # [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
st = set(range(1, 11))    # start y stop, paso por defecto 1
print(st) # {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

lst = list(range(0,11,2))
print(lst) # [0, 2, 4, 6, 8, 10]
st = set(range(0,11,2))
print(st) #  {0, 2, 4, 6, 8, 10}
```

```python
# syntax
for iterator in range(start, end, step):
```


---

**Ejemplo:**

```python
for number in range(11):
    print(number)   # imprime 0 a 10, no incluye 11.
```

### Bucles for anidados

Podemos anidar un bucle dentro de otro; a esto se le llama bucle anidado.

```python
# syntax
for x in y:
    for t in x:
        print(t)
```

**Ejemplo:**

```python
person = {
    'first_name': 'Asabeneh',
    'last_name': 'Yetayeh',
    'age': 250,
    'country': 'Finland',
    'is_marred': True,
    'skills': ['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address': {
        'street': 'Space street',
        'zipcode': '02210'
    }
}
for key in person:
    if key == 'skills':
        for skill in person['skills']:
            print(skill)
```


---

### for y else

Si queremos ejecutar un bloque de código al terminar el bucle, podemos usar la palabra clave `else`.

```python
# syntax
for iterator in range(start, end, step):
    do something
else:
    print('The loop ended')
```

**Ejemplo:**

```python
for number in range(11):
    print(number)   # prints 0 to 10, not including 11
else:
    print('The loop stops at', number)
```


---

### Sentencia pass

En Python, cuando se requiere una instrucción (por ejemplo después de `:`) pero no queremos ejecutar código, usamos `pass` para evitar errores. También sirve como marcador para rellenar más adelante.

**Ejemplo:**

```python
for number in range(6):
    pass
```



---