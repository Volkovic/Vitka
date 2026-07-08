# Día 4 - Cadenas

_Lectura aproximada: 20 min_

El texto es un tipo de dato de cadena. Cualquier dato escrito como texto es una cadena. Todo lo que esté entre comillas simples, dobles o triples se considera una cadena. Existen muchos métodos y funciones integradas para trabajar con cadenas. Use la función `len()` para obtener la longitud de una cadena.


---

### Crear cadenas

```py
letter = 'P'                # Una cadena puede ser un carácter o un texto
print(letter)               # P
print(len(letter))          # 1
greeting = 'Hello, World!'  # Las cadenas se crean con comillas simples o dobles, "Hello, World!"
print(greeting)             # Hello, World!
print(len(greeting))        # 13
sentence = "I hope you are enjoying 30 days of Python Challenge"
print(sentence)
```

Las cadenas multilínea se crean utilizando tres comillas simples (`'''`) o tres comillas dobles (`"""`). A continuación un ejemplo:

```py
multiline_string = '''I am a teacher and enjoy teaching.
I didn't find anything as rewarding as empowering people.
That is why I created 30 days of python.'''
print(multiline_string)

# Otra forma
multiline_string = """I am a teacher and enjoy teaching.
I didn't find anything as rewarding as empowering people.
That is why I created 30 days of python."""
print(multiline_string)
```


---

### Concatenación de cadenas

Podemos concatenar cadenas. La unión de cadenas se llama concatenación. Vea el siguiente ejemplo:

```py

first_name = 'Asabeneh'
last_name = 'Yetayeh'
space = ' '
full_name = first_name  +  space + last_name
print(full_name) # Asabeneh Yetayeh
# Uso de `len()` para obtener la longitud de una cadena
print(len(first_name))  # 8
print(len(last_name))   # 7
print(len(first_name) > len(last_name)) # True
print(len(full_name)) # 16
```


---

### Secuencias de escape en cadenas

En Python y otros lenguajes una barra invertida (`\`) seguida de un carácter forma una secuencia de escape. Algunas secuencias comunes son:

- \n: nueva línea
- \t: tabulación (4 espacios)
- \\\\: barra invertida
- \' : comilla simple
- \" : comilla doble

Ahora veamos ejemplos del uso de estas secuencias.

```py
print('I hope everyone is enjoying the Python Challenge.\nAre you ?') # nueva línea
print('Days\tTopics\tExercises') # añade una tabulación
print('Day 1\t5\t5')
print('Day 2\t6\t20')
print('Day 3\t5\t23')
print('Day 4\t1\t35')
print('This is a backslash  symbol (\\)') # imprime barra invertida
print('In every programming language it starts with \"Hello, World!\"') # comillas dobles dentro de comillas simples

# Salida
I hope every one is enjoying the Python Challenge.
Are you ?
Days	Topics	Exercises
Day 1	5	    5
Day 2	6	    20
Day 3	5	    23
Day 4	1	    35
This is a backslash  symbol (\)
In every programming language it starts with "Hello, World!"
```


---

### Formateo de cadenas

#### Formateo clásico (% operador)

En Python existen varias maneras de formatear cadenas. En esta sección veremos algunas de ellas.
El operador '%' se usa para formatear una tupla de variables dentro de una cadena de formato, usando especificadores como '%s', '%d', '%f' y '%.<small>n</small>f'.

- %s - cadena (o cualquier objeto representable como cadena)
- %d - entero
- %f - punto flotante
- "%.<small>n</small>f" - punto flotante con precisión fija (n decimales)

```py
# Solo cadenas
first_name = 'Asabeneh'
last_name = 'Yetayeh'
language = 'Python'
formated_string = 'I am %s %s. I teach %s' %(first_name, last_name, language)
print(formated_string)

# Cadenas y números
radius = 10
pi = 3.14
area = pi * radius ** 2
formated_string = 'The area of circle with a radius %d is %.2f.' %(radius, area) # 2 indica 2 decimales

python_libraries = ['Django', 'Flask', 'NumPy', 'Matplotlib','Pandas']
formated_string = 'The following are python libraries:%s' % (python_libraries)
print(formated_string) # imprime "The following are python libraries:['Django', 'Flask', 'NumPy', 'Matplotlib','Pandas']"
```

#### Formateo moderno (str.format)

Este método de formateo se introdujo en Python 3.

```py

first_name = 'Asabeneh'
last_name = 'Yetayeh'
language = 'Python'
formated_string = 'I am {} {}. I teach {}'.format(first_name, last_name, language)
print(formated_string)
a = 4
b = 3

print('{} + {} = {}'.format(a, b, a + b))
print('{} - {} = {}'.format(a, b, a - b))
print('{} * {} = {}'.format(a, b, a * b))
print('{} / {} = {:.2f}'.format(a, b, a / b)) # limitar a dos decimales
print('{} % {} = {}'.format(a, b, a % b))
print('{} // {} = {}'.format(a, b, a // b))
print('{} ** {} = {}'.format(a, b, a ** b))

# Salida
4 + 3 = 7
4 - 3 = 1
4 * 3 = 12
4 / 3 = 1.33
4 % 3 = 1
4 // 3 = 1
4 ** 3 = 64

# Cadenas y números
radius = 10
pi = 3.14
area = pi * radius ** 2
formated_string = 'The area of a circle with a radius {} is {:.2f}.'.format(radius, area) # mantener dos decimales
print(formated_string)

```

#### Interpolación / f-Strings (Python 3.6+)

Otra forma moderna de formatear cadenas es la interpolación con f-strings. Las cadenas empiezan con `f` y se insertan expresiones entre llaves.

```py
a = 4
b = 3
print(f'{a} + {b} = {a +b}')
print(f'{a} - {b} = {a - b}')
print(f'{a} * {b} = {a * b}')
print(f'{a} / {b} = {a / b:.2f}')
print(f'{a} % {b} = {a % b}')
print(f'{a} // {b} = {a // b}')
print(f'{a} ** {b} = {a ** b}')
```


---

### Las cadenas en Python son secuencias de caracteres

Las cadenas en Python son secuencias de caracteres y comparten los mismos métodos de acceso que otras secuencias como listas y tuplas. La forma más sencilla de extraer caracteres individuales (o elementos de cualquier secuencia) es desempaquetarlos en variables.

#### Desempaquetar caracteres

```
language = 'Python'
a,b,c,d,e,f = language # desempaquetar caracteres y asignarlos a variables
print(a) # P
print(b) # y
print(c) # t
print(d) # h
print(e) # o
print(f) # n
```

#### Obtener caracteres por índice

En programación la indexación comienza en cero. Por tanto, la primera letra está en el índice 0 y la última en la longitud de la cadena menos uno.

![String index](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/string_index.png)

```py
language = 'Python'
first_letter = language[0]
print(first_letter) # P
second_letter = language[1]
print(second_letter) # y
last_index = len(language) - 1
last_letter = language[last_index]
print(last_letter) # n
```

Si queremos contar desde la derecha usamos índices negativos; -1 es el último índice.

```py
language = 'Python'
last_letter = language[-1]
print(last_letter) # n
second_last = language[-2]
print(second_last) # o
```

#### Slicing de cadenas

En Python podemos obtener subcadenas mediante slicing.

```py
language = 'Python'
first_three = language[0:3] # empieza en índice 0, hasta 3 pero sin incluir 3
print(first_three) #Pyt
last_three = language[3:6]
print(last_three) # hon
# Otra forma
last_three = language[-3:]
print(last_three)   # hon
last_three = language[3:]
print(last_three)   # hon
```

#### Invertir cadenas

Podemos invertir fácilmente una cadena.

```py
greeting = 'Hello, World!'
print(greeting[::-1]) # !dlroW ,olleH
```

#### Saltar caracteres al hacer slicing

Al pasar un parámetro de paso en slicing podemos omitir caracteres al extraer subcadenas.


```py
language = 'Python'
pto = language[0:6:2] #
print(pto) # Pto
```


---

### Métodos de cadenas

Hay muchos métodos para manipular y formatear cadenas. A continuación vemos algunos ejemplos:

- capitalize(): convierte el primer carácter de la cadena a mayúscula

```py
challenge = 'thirty days of python'
print(challenge.capitalize()) # 'Thirty days of python' (primera letra en mayúscula)
```

- count(): devuelve el número de ocurrencias de una subcadena: `count(subcadena, start=.., end=..)`. `start` y `end` definen el rango de conteo.

```py
challenge = 'thirty days of python'
print(challenge.count('y')) # 3
print(challenge.count('y', 7, 14)) # 1, cuenta entre índices 7 y 14
print(challenge.count('th')) # 2
```

- endswith(): determina si la cadena termina con la subcadena dada; devuelve `True` o `False`

```py
challenge = 'thirty days of python'
print(challenge.endswith('on'))   # True
print(challenge.endswith('tion')) # False (no termina con 'tion')
```

- expandtabs(): reemplaza tabulaciones por espacios; el tamaño por defecto es 8, acepta parámetro de tamaño.

```py
challenge = 'thirty\tdays\tof\tpython'
print(challenge.expandtabs())   # 'thirty  days    of      python'
print(challenge.expandtabs(10)) # 'thirty    days      of        python' (tabulaciones expandidas a 10 espacios)
```

- find(): devuelve el índice de la primera aparición de una subcadena; si no se encuentra devuelve -1

```py
challenge = 'thirty days of python'
print(challenge.find('y'))  # 5
print(challenge.find('th')) # 0
```

- rfind(): devuelve el índice de la última aparición de una subcadena; si no se encuentra devuelve -1

```py
challenge = 'thirty days of python'
print(challenge.rfind('y'))  # 16
print(challenge.rfind('th')) # 17
```

- format(): formatea una cadena para una salida más legible
Para más información sobre el formateo de cadenas consulte este [enlace](https://www.programiz.com/python-programming/methods/string/format)

```py
first_name = 'Asabeneh'
last_name = 'Yetayeh'
age = 250
job = 'teacher'
country = 'Finland'
sentence = 'I am {} {}. I am a {}. I am {} years old. I live in {}.'.format(first_name, last_name, age, job, country)
print(sentence) # I am Asabeneh Yetayeh. I am 250 years old. I am a teacher. I live in Finland.

radius = 10
pi = 3.14
area = pi * radius ** 2
result = 'The area of a circle with radius {} is {}'.format(str(radius), str(area))
print(result) # The area of a circle with radius 10 is 314
```

- index(): devuelve el índice de la primera aparición de una subcadena; acepta parámetros de inicio y fin (por defecto 0 y longitud de la cadena). Si la subcadena no se encuentra, lanza `ValueError`.

```py
challenge = 'thirty days of python'
sub_string = 'da'
print(challenge.index(sub_string))  # 7
print(challenge.index(sub_string, 9)) # error
```

- rindex(): devuelve el índice de la última aparición de una subcadena; acepta parámetros de inicio y fin (por defecto 0 y longitud de la cadena).

```py
challenge = 'thirty days of python'
sub_string = 'da'
print(challenge.rindex(sub_string))  # 8
print(challenge.rindex(sub_string, 9)) # error
```

- isalnum(): determina si todos los caracteres de la cadena son alfanuméricos

```py
challenge = 'ThirtyDaysPython'
print(challenge.isalnum()) # True

challenge = '30DaysPython'
print(challenge.isalnum()) # True

challenge = 'thirty days of python'
print(challenge.isalnum()) # False, el espacio no es un carácter alfanumérico

challenge = 'thirty days of python 2019'
print(challenge.isalnum()) # False
```

- isalpha(): determina si todos los caracteres de la cadena son letras (a-z y A-Z)

```py
challenge = 'thirty days of python'
print(challenge.isalpha()) # False, el espacio no es una letra
challenge = 'ThirtyDaysPython'
print(challenge.isalpha()) # True
num = '123'
print(num.isalpha())      # False
```

- isdecimal(): determina si todos los caracteres son decimales (0-9)

```py
challenge = 'thirty days of python'
print(challenge.isdecimal())  # False
challenge = '123'
print(challenge.isdecimal())  # True
challenge = '\u00B2'
print(challenge.isdigit())   # False
challenge = '12 3'
print(challenge.isdecimal())  # False, contiene espacios
```

- isdigit(): determina si todos los caracteres son dígitos (0-9 y otros caracteres numéricos Unicode)

```py
challenge = 'Thirty'
print(challenge.isdigit()) # False
challenge = '30'
print(challenge.isdigit())   # True
challenge = '\u00B2'
print(challenge.isdigit())   # True (caracteres numéricos Unicode)
```

- isnumeric(): determina si todos los caracteres son numéricos o están relacionados con números (similar a `isdigit()` pero acepta más símbolos, p. ej. ½)

```py
num = '10'
print(num.isnumeric()) # True
num = '\u00BD' # ½
print(num.isnumeric()) # True
num = '10.5'
print(num.isnumeric()) # False
```

- isidentifier(): comprueba si la cadena es un identificador válido (nombre de variable válido)

```py
challenge = '30DaysOfPython'
print(challenge.isidentifier()) # False, porque empieza por un número
challenge = 'thirty_days_of_python'
print(challenge.isidentifier()) # True
```

- islower(): determina si todas las letras de la cadena están en minúsculas

```py
challenge = 'thirty days of python'
print(challenge.islower()) # True
challenge = 'Thirty days of python'
print(challenge.islower()) # False
```

- isupper(): determina si todas las letras de la cadena están en mayúsculas

```py
challenge = 'thirty days of python'
print(challenge.isupper()) #  False
challenge = 'THIRTY DAYS OF PYTHON'
print(challenge.isupper()) # True
```

- join(): devuelve la cadena resultante tras unir los elementos

```py
web_tech = ['HTML', 'CSS', 'JavaScript', 'React']
result = ' '.join(web_tech)
print(result) # 'HTML CSS JavaScript React' (devuelve la cadena unida)
```

```py
web_tech = ['HTML', 'CSS', 'JavaScript', 'React']
result = '# '.join(web_tech)
print(result) # 'HTML# CSS# JavaScript# React'
```

- strip(): elimina los caracteres dados del inicio y del final de la cadena

```py
challenge = 'thirty days of python'
print(challenge.strip('noth')) # 'irty days of py' (elimina los caracteres dados del inicio y final)
```

- replace(): reemplaza una subcadena por otra dada

```py
challenge = 'thirty days of python'
print(challenge.replace('python', 'coding')) # 'thirty days of coding'
```

- split(): divide una cadena usando un separador dado o espacios

```py
challenge = 'thirty days of python'
print(challenge.split()) # ['thirty', 'days', 'of', 'python']
challenge = 'thirty, days, of, python'
print(challenge.split(', ')) # ['thirty', 'days', 'of', 'python']
```

- title(): devuelve la cadena en formato título (Title Case)

```py
challenge = 'thirty days of python'
print(challenge.title()) # Thirty Days Of Python
```

- swapcase(): convierte mayúsculas a minúsculas y minúsculas a mayúsculas

```py
challenge = 'thirty days of python'
print(challenge.swapcase())   # THIRTY DAYS OF PYTHON
challenge = 'Thirty Days Of Python'
print(challenge.swapcase())  # tHIRTY dAYS oF pYTHON
```

- startswith(): determina si la cadena comienza con la subcadena especificada

```py
challenge = 'thirty days of python'
print(challenge.startswith('thirty')) # True

challenge = '30 days of python'
print(challenge.startswith('thirty')) # False (no empieza con 'thirty')
```



---