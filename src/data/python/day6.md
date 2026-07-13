# Día 6 - Tuplas

Una tupla es una colección ordenada e inmutable que puede contener distintos tipos de datos. Una vez creada una tupla, no podemos cambiar sus valores. No podemos usar métodos como add, insert o remove en una tupla porque no es modificable (es inmutable). A diferencia de las listas, las tuplas tienen menos métodos. Los métodos asociados a tuplas son:

- tuple(): crea una tupla vacía
- count(): cuenta cuántas veces aparece un elemento en la tupla
- index(): busca el índice de un elemento en la tupla
- Operador +: concatena dos o más tuplas creando una nueva tupla


---

### Cómo crear tuplas

- Crear una tupla vacía

  ```py
  # Sintaxis
  empty_tuple = ()
  # o usando el constructor de tuplas
  empty_tuple = tuple()
  ```

- Crear una tupla con valores iniciales

  ```py
  # Sintaxis
  tpl = ('item1', 'item2','item3')
  ```

  ```py
  fruits = ('banana', 'orange', 'mango', 'lemon')
  ```

---

### Longitud de la tupla

Usamos la función _len()_ para obtener la longitud de una tupla.

```py
# Sintaxis
tpl = ('item1', 'item2', 'item3')
len(tpl)
```


---

### Obtener elementos de la tupla

- Índices positivos
  Al igual que con las listas, usamos índices positivos o negativos para acceder a los elementos de una tupla.
  ![Accessing tuple items](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/tuples_index.png)

  ```py
  # Sintaxis
  tpl = ('item1', 'item2', 'item3')
  first_item = tpl[0]
  second_item = tpl[1]
  ```

  ```py
  fruits = ('banana', 'orange', 'mango', 'lemon')
  first_fruit = fruits[0]
  second_fruit = fruits[1]
  last_index =len(fruits) - 1
  last_fruit = fruits[las_index]
  ```

- Índices negativos
  Los índices negativos cuentan desde el final: -1 es el último elemento, -2 el penúltimo, y así sucesivamente.
  ![Tuple Negative indexing](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/tuple_negative_indexing.png)

  ```py
  # Sintaxis
  tpl = ('item1', 'item2', 'item3','item4')
  first_item = tpl[-4]
  second_item = tpl[-3]
  ```

  ```py
  fruits = ('banana', 'orange', 'mango', 'lemon')
  first_fruit = fruits[-4]
  second_fruit = fruits[-3]
  last_fruit = fruits[-1]
  ```


---

### Slicing de tuplas

Podemos extraer subtuplas especificando un rango de índices de inicio y fin; el resultado es una nueva tupla con los elementos seleccionados.

- Rango de índices positivos

  ```py
  # Sintaxis
  tpl = ('item1', 'item2', 'item3','item4')
  all_items = tpl[0:4]         # todos los elementos
  all_items = tpl[0:]         # todos los elementos
  middle_two_items = tpl[1:3]  # no incluye el índice 3
  ```

  ```py
  fruits = ('banana', 'orange', 'mango', 'lemon')
  all_fruits = fruits[0:4]    # todos los elementos
  all_fruits= fruits[0:]      # todos los elementos
  orange_mango = fruits[1:3]  # no incluye el índice 3
  orange_to_the_rest = fruits[1:]
  ```

- Rango de índices negativos

  ```py
  # Sintaxis
  tpl = ('item1', 'item2', 'item3','item4')
  all_items = tpl[-4:]         # todos los elementos
  middle_two_items = tpl[-3:-1]  # no incluye el índice 3
  ```

  ```py

  fruits = ('banana', 'orange', 'mango', 'lemon')
  all_fruits = fruits[-4:]    # todos los elementos
  orange_mango = fruits[-3:-1]  # no incluye el índice 3
  orange_to_the_rest = fruits[-3:]
  ```


---

### Convertir tupla a lista

Podemos convertir una tupla en una lista y viceversa. Si queremos modificar una tupla, conviene convertirla primero en lista.

```py
# Sintaxis
tpl = ('item1', 'item2', 'item3','item4')
lst = list(tpl)
```

```py
fruits = ('banana', 'orange', 'mango', 'lemon')
fruits = list(fruits)
fruits[0] = 'apple'
print(fruits)     # ['apple', 'orange', 'mango', 'lemon']
fruits = tuple(fruits)
print(fruits)     # ('apple', 'orange', 'mango', 'lemon')
```


---

### Comprobar si un elemento está en la tupla

Podemos usar el operador _in_ para comprobar si un elemento pertenece a la tupla; devuelve un valor booleano.

```py
# Sintaxis
tpl = ('item1', 'item2', 'item3','item4')
'item2' in tpl # True
```

```py
fruits = ('banana', 'orange', 'mango', 'lemon')
print('orange' in fruits) # True
print('apple' in fruits) # False
fruits[0] = 'apple' # TypeError: 'tuple' object does not support item assignment
```




---

### Unir tuplas

Podemos concatenar dos o más tuplas usando el operador +.

```py
# Sintaxis
tpl1 = ('item1', 'item2', 'item3')
tpl2 = ('item4', 'item5','item6')
tpl3 = tpl1 + tpl2
```

```py
fruits = ('banana', 'orange', 'mango', 'lemon')
vegetables = ('Tomato', 'Potato', 'Cabbage','Onion', 'Carrot')
fruits_and_vegetables = fruits + vegetables
```


---

### Eliminar tupla

No se pueden eliminar elementos individuales de una tupla, pero sí se puede eliminar la tupla completa con la palabra clave _del_.

```py
# Sintaxis
tpl1 = ('item1', 'item2', 'item3')
del tpl1

```

```py
fruits = ('banana', 'orange', 'mango', 'lemon')
del fruits
```




---

---

## 💻 Ejercicios Prácticos (Tuplas)

**Consigna 1:** Crea una tupla vacía y luego otra tupla conteniendo los nombres de tus 3 hermanos o amigos.
**[Solución]**
```python
empty_tuple = ()
siblings = ('Juan', 'María', 'Pedro')
print(siblings)
```

**Consigna 2:** Intenta modificar el primer elemento de la tupla de tus hermanos (ej. `siblings[0] = 'Carlos'`). ¿Qué sucede? Observa el error para entender la inmutabilidad.
**[Solución]**
```python
# siblings[0] = 'Carlos' 
# Esto lanzará un TypeError: 'tuple' object does not support item assignment
print("Las tuplas son inmutables, no se pueden modificar una vez creadas.")
```

**Consigna 3:** Tienes la tupla `fruits = ('manzana', 'banana', 'naranja')`. Desempaqueta la tupla en 3 variables individuales e imprímelas.
**[Solución]**
```python
fruits = ('manzana', 'banana', 'naranja')
f1, f2, f3 = fruits
print("Fruta 1:", f1)
print("Fruta 2:", f2)
print("Fruta 3:", f3)
```
