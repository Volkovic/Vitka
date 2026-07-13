# Día 5 - Listas

En Python hay cuatro tipos de colecciones:

- List: colección ordenada y mutable. Permite elementos duplicados.
- Tuple: colección ordenada e inmutable. Permite elementos duplicados.
- Set: colección no ordenada e indexable; no permite duplicados (aunque se pueden añadir elementos).
- Dictionary: colección no ordenada, mutable y accesible por clave. No permite claves duplicadas.


Una lista es una colección ordenada y mutable que puede contener elementos de diferentes tipos. Una lista puede estar vacía o contener elementos heterogéneos.


---

### Cómo crear listas

En Python podemos crear listas de dos maneras:

- Usando la función incorporada `list()`

```py
# Sintaxis
lst = list()
```

```py
empty_list = list() # Esta es una lista vacía
print(len(empty_list)) # 0
```
- Usando corchetes `[]`

```py
# Sintaxis
lst = []
```

```py
empty_list = [] # Esta es una lista vacía
print(len(empty_list)) # 0
```

Listas con valores iniciales. Usamos `len()` para comprobar la longitud.

```py
fruits = ['banana', 'orange', 'mango', 'lemon']                     # lista de frutas
vegetables = ['Tomato', 'Potato', 'Cabbage','Onion', 'Carrot']      # lista de verduras
animal_products = ['milk', 'meat', 'butter', 'yoghurt']             # lista de animal products
web_techs = ['HTML', 'CSS', 'JS', 'React','Redux', 'Node', 'MongDB'] # lista de web technologies
countries = ['Finland', 'Estonia', 'Denmark', 'Sweden', 'Norway']

# Imprimir listas y su longitud
print('Fruits:', fruits)
print('Number of fruits:', len(fruits))
print('Vegetables:', vegetables)
print('Number of vegetables:', len(vegetables))
print('Animal products:',animal_products)
print('Number of animal products:', len(animal_products))
print('Web technologies:', web_techs)
print('Number of web technologies:', len(web_techs))
print('Countries:', countries)
print('Number of countries:', len(countries))
```

```sh
Salida
Fruits: ['banana', 'orange', 'mango', 'lemon']
Number of fruits: 4
Vegetables: ['Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']
Number of vegetables: 5
Animal products: ['milk', 'meat', 'butter', 'yoghurt']
Number of animal products: 4
Web technologies: ['HTML', 'CSS', 'JS', 'React', 'Redux', 'Node', 'MongDB']
Number of web technologies: 7
Countries: ['Finland', 'Estonia', 'Denmark', 'Sweden', 'Norway']
Number of countries: 5
```

- Las listas pueden contener elementos de distintos tipos

```py
 lst = ['Asabeneh', 250, True, {'country':'Finland', 'city':'Helsinki'}] # lista con distintos tipos de datos
```



---

### Acceder por índice positivo

Usamos índices para acceder a los elementos de una lista. Los índices comienzan en 0. La imagen muestra claramente dónde empiezan los índices.

![List index](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/list_index.png)

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
first_fruit = fruits[0] # estamos usando su índice para acceder al primer elemento
print(first_fruit)      # banana
second_fruit = fruits[1]
print(second_fruit)     # orange
last_fruit = fruits[3]
print(last_fruit) # lemon
# Last index
last_index = len(fruits) - 1
last_fruit = fruits[last_index]
```


---

### Acceder por índice negativo

Los índices negativos cuentan desde el final; `-1` es el último elemento, `-2` el penúltimo.

![List negative indexing](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/list_negative_indexing.png)

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
first_fruit = fruits[-4]
last_fruit = fruits[-1]
second_last = fruits[-2]
print(first_fruit)      # banana
print(last_fruit)       # lemon
print(second_last)      # mango
```


---

### Desempaquetado de listas

```py
lst = ['item1','item2','item3', 'item4', 'item5']
first_item, second_item, third_item, *rest = lst
print(first_item)     # item1
print(second_item)    # item2
print(third_item)     # item3
print(rest)           # ['item4', 'item5']

```

```py
# Ejemplo uno
fruits = ['banana', 'orange', 'mango', 'lemon','lime','apple']
first_fruit, second_fruit, third_fruit, *rest = fruits 
print(first_fruit)     # banana
print(second_fruit)    # orange
print(third_fruit)     # mango
print(rest)           # ['lemon','lime','apple']
# Ejemplo dos
first, second, third,*rest, tenth = [1,2,3,4,5,6,7,8,9,10]
print(first)          # 1
print(second)         # 2
print(third)          # 3
print(rest)           # [4,5,6,7,8,9]
print(tenth)          # 10
# Ejemplo tres
countries = ['Germany', 'France','Belgium','Sweden','Denmark','Finland','Norway','Iceland','Estonia']
gr, fr, bg, sw, *scandic, es = countries
print(gr)
print(fr)
print(bg)
print(sw)
print(scandic)
print(es)
```


---

### Slicing de listas

- Índices positivos: especificando inicio, fin y paso obtenemos una nueva lista. (inicio por defecto 0, fin por defecto len(lst) - 1, paso por defecto 1)

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
all_fruits = fruits[0:4] # devuelve todos los elementos
# mismo resultado que arriba
all_fruits = fruits[0:] # Si no se especifica el índice de fin, devolverá todos los elementos desde el inicio hasta el final
orange_and_mango = fruits[1:3] # no incluye el índice 3
orange_mango_lemon = fruits[1:]
orange_and_lemon = fruits[::2] # usamos el tercer parámetro (paso). Toma cada 2 elementos - ['banana', 'mango']
```

- Índices negativos: especificando inicio, fin y paso con índices negativos se obtiene una nueva lista.

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
all_fruits = fruits[-4:] # Devuelve todos los elementos
orange_and_mango = fruits[-3:-1] # No incluye el último elemento, ['orange', 'mango']
orange_mango_lemon = fruits[-3:] # Devuelve los elementos desde -3 hasta el final, ['orange', 'mango', 'lemon']
reverse_fruits = fruits[::-1] # un paso negativo invierte la lista, ['lemon', 'mango', 'orange', 'banana']
```


---

### Modificar listas

Una lista es una colección ordenada y mutable. A continuación modificamos la lista `fruits`.


```py
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits[0] = 'avocado'
print(fruits)       #  ['avocado', 'orange', 'mango', 'lemon']
fruits[1] = 'apple'
print(fruits)       #  ['avocado', 'apple', 'mango', 'lemon']
last_index = len(fruits) - 1
fruits[last_index] = 'lime'
print(fruits)        #  ['avocado', 'apple', 'mango', 'lime']
```


---

### Buscar elementos

Use el operador `in` para comprobar si un elemento es miembro de una lista. Véase el ejemplo.

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
does_exist = 'banana' in fruits
print(does_exist)  # True
does_exist = 'lime' in fruits
print(does_exist)  # False
```


---

### Agregar elementos

Para añadir un elemento al final de una lista usamos el método `append()`.

```py
# Sintaxis
lst = list()
lst.append(item)
```

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.append('apple')
print(fruits)           # ['banana', 'orange', 'mango', 'lemon', 'apple']
fruits.append('lime')   # ['banana', 'orange', 'mango', 'lemon', 'apple', 'lime']
print(fruits)
```


---

### Insertar elementos

Podemos usar el método *insert()* para insertar un elemento en un índice específico de la lista. Ten en cuenta que los demás elementos se desplazarán a la derecha. El método *insert()* recibe dos parámetros: el índice y el elemento a insertar.


```py
# Sintaxis
lst = ['item1', 'item2']
lst.insert(index, item)
```

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.insert(2, 'apple') # inserta 'apple' entre 'orange' y 'mango'
print(fruits)           # ['banana', 'orange', 'apple', 'mango', 'lemon']
fruits.insert(3, 'lime')   # ['banana', 'orange', 'apple', 'lime', 'mango', 'lemon']
print(fruits)
```


---

### Eliminar elementos

- Usa el método *remove()* para eliminar un elemento específico de la lista

```py
# Sintaxis
lst = ['item1', 'item2']
lst.remove(item)
```

```py
fruits = ['banana', 'orange', 'mango', 'lemon', 'banana']
fruits.remove('banana')
print(fruits)  # ['orange', 'mango', 'lemon', 'banana'] - este método elimina la primera aparición del elemento en la lista
fruits.remove('lemon')
print(fruits)  # ['orange', 'mango', 'banana']
```


---

### Eliminar con `pop()`

Usa `pop()` para eliminar el elemento en el índice dado (si no se indica, elimina el último elemento):

```py
# Sintaxis
lst = ['item1', 'item2']
lst.pop()       # Último elemento
lst.pop(index)
```

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.pop()
print(fruits)       # ['banana', 'orange', 'mango']

fruits.pop(0)
print(fruits)       # ['orange', 'mango']
```


---

### Eliminar con `del`

Usa la palabra clave *del* para eliminar un índice específico, también puede eliminar un rango de índices o eliminar por completo la lista


```py
# Sintaxis
lst = ['item1', 'item2']
del lst[index] # Elimina solo un elemento
del lst        # Elimina la lista completa
```

```py
fruits = ['banana', 'orange', 'mango', 'lemon', 'kiwi', 'lime']
del fruits[0]
print(fruits)       # ['orange', 'mango', 'lemon', 'kiwi', 'lime']
del fruits[1]
print(fruits)       # ['orange', 'lemon', 'kiwi', 'lime']
del fruits[1:3]     # elimina elementos en el rango dado; no eliminará el elemento con índice 3!
print(fruits)       # ['orange', 'lime']
del fruits
print(fruits)       # Esto producirá: NameError: name 'fruits' is not defined
```


---

### Vaciar listas

Usa `clear()` para vaciar una lista:

```py
# Sintaxis
lst = ['item1', 'item2']
lst.clear()
```

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.clear()
print(fruits)       # []
```


---

### Copiar listas

Puedes copiar una lista reasignándola a una nueva variable: `list2 = list1`. En ese caso `list2` referencia el mismo objeto; los cambios se reflejarán en ambos. Si quieres una copia independiente usa el método `copy()`.

```py
# Sintaxis
lst = ['item1', 'item2']
lst_copy = lst.copy()
```

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits_copy = fruits.copy()
print(fruits_copy)       # ['banana', 'orange', 'mango', 'lemon'] (copia de la lista)
```


---

### Unir listas

Hay varias formas de concatenar o unir dos o más listas.

- Suma (+)

```py
# Sintaxis
list3 = list1 + list2
```

```py
positive_numbers = [1, 2, 3, 4, 5]
zero = [0]
negative_numbers = [-5,-4,-3,-2,-1]
integers = negative_numbers + zero + positive_numbers
print(integers) # [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
fruits = ['banana', 'orange', 'mango', 'lemon']
vegetables = ['Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']
fruits_and_vegetables = fruits + vegetables
print(fruits_and_vegetables ) # ['banana', 'orange', 'mango', 'lemon', 'Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']
```

- Usar el método *extend()*
El método *extend()* puede anexar una lista a otra. Véase el ejemplo a continuación.

```py
# Sintaxis
list1 = ['item1', 'item2']
list2 = ['item3', 'item4', 'item5']
list1.extend(list2)
```

```py
num1 = [0, 1, 2, 3]
num2= [4, 5, 6]
num1.extend(num2)
print('Numbers:', num1) # Numbers: [0, 1, 2, 3, 4, 5, 6]
negative_numbers = [-5,-4,-3,-2,-1]
positive_numbers = [1, 2, 3,4,5]
zero = [0]

negative_numbers.extend(zero)
negative_numbers.extend(positive_numbers)
print('Integers:', negative_numbers) # Integers: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
fruits = ['banana', 'orange', 'mango', 'lemon']
vegetables = ['Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']
fruits.extend(vegetables)
print('Fruits and vegetables:', fruits ) # Fruits and vegetables: ['banana', 'orange', 'mango', 'lemon', 'Tomato', 'Potato', 'Cabbage', 'Onion', 'Carrot']
```


---

### Contar elementos

Usa el método *count()* para devolver el número de veces que aparece un elemento en la lista:


```py
# Sintaxis
lst = ['item1', 'item2']
lst.count(item)
```

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
print(fruits.count('orange'))   # 1
ages = [22, 19, 24, 25, 26, 24, 25, 24]
print(ages.count(24))           # 3
```


---

### Encontrar el índice de un elemento

El método *index()* devuelve el índice de un elemento en la lista:

```py
# Sintaxis
lst = ['item1', 'item2']
lst.index(item)
```

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
print(fruits.index('orange'))   # 1
ages = [22, 19, 24, 25, 26, 24, 25, 24]
print(ages.index(24))           # 2, primera aparición
```


---

### Invertir listas

Usa el método *reverse()* para invertir el orden de la lista.

```py
# Sintaxis
lst = ['item1', 'item2']
lst.reverse()

```

```py
fruits = ['banana', 'orange', 'mango', 'lemon']
fruits.reverse()
print(fruits) # ['lemon', 'mango', 'orange', 'banana']
ages = [22, 19, 24, 25, 26, 24, 25, 24]
ages.reverse()
print(ages) # [24, 25, 24, 26, 25, 24, 19, 22]
```


---

### Ordenar listas

Para ordenar una lista podemos usar el método *sort()* o la función incorporada *sorted()*. El método *sort()* reordena la lista en orden ascendente y modifica la lista original. Si el parámetro reverse de *sort()* es True, ordenará la lista en orden descendente.

- sort(): Este método modifica la lista original

  ```py
  # Sintaxis
  lst = ['item1', 'item2']
  lst.sort()                # ascending
  lst.sort(reverse=True)    # descending
  ```

  **Ejemplo:**

  ```py
  fruits = ['banana', 'orange', 'mango', 'lemon']
  fruits.sort()
  print(fruits)             # ordenadas alfabéticamente, ['banana', 'lemon', 'mango', 'orange']
  fruits.sort(reverse=True)
  print(fruits) # ['orange', 'mango', 'lemon', 'banana']
  ages = [22, 19, 24, 25, 26, 24, 25, 24]
  ages.sort()
  print(ages) #  [19, 22, 24, 24, 24, 25, 25, 26]
 
  ages.sort(reverse=True)
  print(ages) #  [26, 25, 25, 24, 24, 24, 22, 19]
  ```

  sorted(): No modifica la lista original; devuelve una nueva lista

  **Ejemplo:**

  ```py
  fruits = ['banana', 'orange', 'mango', 'lemon']
  print(sorted(fruits))   # ['banana', 'lemon', 'mango', 'orange']
  # Reverse order
  fruits = ['banana', 'orange', 'mango', 'lemon']
  fruits = sorted(fruits,reverse=True)
  print(fruits)     # ['orange', 'mango', 'lemon', 'banana']
  ```





---

---

## 💻 Ejercicios Prácticos (Listas)

**Consigna 1:** Crea una lista vacía llamada `my_list` y otra lista con 5 comidas favoritas. Imprime la longitud de la lista de comidas.
**[Solución]**
```python
my_list = []
comidas = ['Pizza', 'Sushi', 'Hamburguesa', 'Tacos', 'Pasta']
print(len(comidas)) # 5
```

**Consigna 2:** De tu lista de comidas, imprime el primer elemento, el elemento central y el último elemento.
**[Solución]**
```python
primer_elemento = comidas[0]
elemento_central = comidas[len(comidas) // 2]
ultimo_elemento = comidas[-1]

print("Primero:", primer_elemento)
print("Medio:", elemento_central)
print("Último:", ultimo_elemento)
```

**Consigna 3:** Tienes la lista de edades `ages = [19, 22, 19, 24, 20, 25]`. Ordena la lista de menor a mayor (`sort`) y agrega la edad `21` al final (`append`).
**[Solución]**
```python
ages = [19, 22, 19, 24, 20, 25]
ages.sort()
ages.append(21)
print(ages) # [19, 19, 20, 22, 24, 25, 21]
```
