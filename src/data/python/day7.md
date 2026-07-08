# Día 7 - Conjuntos

## Conjuntos

Un conjunto es una colección de elementos. Volvamos a las clases de matemáticas de primaria o secundaria: la definición matemática de conjuntos aplica también en Python. Un conjunto es una colección desordenada y no indexada de elementos distintos. En Python, los conjuntos almacenan elementos únicos y se pueden encontrar la _unión_, la _intersección_, la _diferencia_, la _diferencia simétrica_, los _subconjuntos_, los _superconjuntos_ y los _conjuntos disjuntos_ entre conjuntos.

### Crear conjuntos

Usamos la función incorporada _set()_.

- Crear un conjunto vacío

```py
# Sintaxis
st = set()
```

- Crear un conjunto con elementos iniciales

```py
# Sintaxis
st = {'item1', 'item2', 'item3', 'item4'}
```


---

**Ejemplo:**

```py
# Sintaxis
fruits = {'banana', 'orange', 'mango', 'lemon'}
```

### Obtener la longitud del conjunto

Usamos la función **len()** para obtener la longitud de un conjunto.

```py
# Sintaxis
st = {'item1', 'item2', 'item3', 'item4'}
len(st)
```

**Ejemplo:**

```py
fruits = {'banana', 'orange', 'mango', 'lemon'}
len(fruits)

```


---

### Acceder a elementos del conjunto

Usamos bucles para recorrer los elementos. Veremos esto con más detalle en la sección de bucles.

### Comprobar elementos

Para comprobar si un elemento existe en un conjunto usamos el operador de pertenencia _in_.

```py
# Sintaxis
st = {'item1', 'item2', 'item3', 'item4'}
print("Does set st contain item3? ", 'item3' in st) # Does set st contain item3? True
```

**Ejemplo:**

```py

fruits = {'plátano', 'naranja', 'mango', 'limón'}

print('mango' in fruits ) # True

```


---

### Añadir elementos al conjunto

Una vez creado el conjunto no podemos cambiar elementos existentes, pero sí podemos añadir nuevos.

- Usar el método _add()_ para agregar un solo elemento

```py
# Sintaxis
st = {'item1', 'item2', 'item3', 'item4'}
st.add('item5')
```

**Ejemplo:**

```py
fruits = {'banana', 'orange', 'mango', 'lemon'}
fruits.add('lime')
```

- Usar el método _update()_ para agregar varios elementos
  El método _update()_ permite añadir múltiples elementos; recibe un iterable como argumento.

```py
# Sintaxis
st = {'item1', 'item2', 'item3', 'item4'}
st.update(['item5','item6','item7'])
```


---

**Ejemplo:**

```py
fruits = {'banana', 'orange', 'mango', 'lemon'}
vegetables = ('tomato', 'potato', 'cabbage','onion', 'carrot')
fruits.update(vegetables)
```


---

### Eliminar elementos del conjunto

Podemos usar el método _remove()_ para eliminar un elemento de un conjunto. Si el elemento no existe, _remove()_ lanzará un error; por eso es útil comprobar antes si existe. El método _discard()_ no lanzará error si el elemento no existe.

```py
# Sintaxis
st = {'item1', 'item2', 'item3', 'item4'}
st.remove('item2')
```

El método _pop()_ elimina y devuelve un elemento aleatorio del conjunto.

**Ejemplo:**

```py
fruits = {'banana', 'orange', 'mango', 'lemon'}
fruits.pop()  # Elimina un elemento aleatorio del conjunto
```

Si nos interesa el elemento eliminado.

```py
fruits = {'banana', 'orange', 'mango', 'lemon'}
removed_item = fruits.pop()
```


---

### Vaciar el conjunto

Si queremos vaciar todas las entradas de un conjunto, podemos usar el método _clear()_.

```py
# Sintaxis
st = {'item1', 'item2', 'item3', 'item4'}
st.clear()
```

**Ejemplo:**

```py
fruits = {'banana', 'orange', 'mango', 'lemon'}
fruits.clear()
print(fruits) # set()
```


---

### Eliminar conjunto

Si queremos eliminar el conjunto por completo, podemos usar el operador _del_.

```py
# Sintaxis
st = {'item1', 'item2', 'item3', 'item4'}
del st
```

**Ejemplo:**

```py
fruits = {'banana', 'orange', 'mango', 'lemon'}
del fruits
```


---

### Convertir lista a conjunto

Podemos convertir una lista en un conjunto y viceversa. Convertir una lista a conjunto elimina duplicados y conserva solo elementos únicos.

```py
# Sintaxis
lst = ['item1', 'item2', 'item3', 'item4', 'item1']
st = set(lst)  # {'item2', 'item4', 'item1', 'item3'} - El orden es aleatorio, ya que los conjuntos son generalmente no ordenados
```

**Ejemplo:**

```py
fruits = ['banana', 'orange', 'mango', 'lemon','orange', 'banana']
fruits = set(fruits) # {'mango', 'lemon', 'banana', 'orange'}
```


---

### Unir conjuntos

Podemos usar los métodos _union()_ o _update()_ para combinar dos conjuntos.

- Union
  Este método devuelve un nuevo conjunto

```py
# Sintaxis
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item5', 'item6', 'item7', 'item8'}
st3 = st1.union(st2)
```

**Ejemplo:**

```py
fruits = {'banana', 'orange', 'mango', 'lemon'}
vegetables = {'tomato', 'potato', 'cabbage','onion', 'carrot'}
print(fruits.union(vegetables)) # {'lemon', 'carrot', 'tomato', 'banana', 'mango', 'orange', 'cabbage', 'potato', 'onion'}
```

- Update
  Este método inserta los elementos de un conjunto en el conjunto dado

```py
# Sintaxis
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item5', 'item6', 'item7', 'item8'}
st1.update(st2) # Los elementos de st2 se añaden a st1
```


---

**Ejemplo:**

```py
fruits = {'banana', 'orange', 'mango', 'lemon'}
vegetables = {'tomato', 'potato', 'cabbage','onion', 'carrot'}
fruits.update(vegetables)
print(fruits) # {'lemon', 'carrot', 'tomato', 'banana', 'mango', 'orange', 'cabbage', 'potato', 'onion'}
```


---

### Encontrar intersección

La intersección devuelve un conjunto con los elementos que están presentes en ambos conjuntos. Véase el ejemplo.

```py
# Sintaxis
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item3', 'item2'}
st1.intersection(st2) # {'item3', 'item2'}
```

**Ejemplo:**

```py
whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
even_numbers = {0, 2, 4, 6, 8, 10}
whole_numbers.intersection(even_numbers) # {0, 2, 4, 6, 8, 10}

python = {'p', 'y', 't', 'h', 'o', 'n'}
dragon = {'d', 'r', 'a', 'g', 'o', 'n'}
python.intersection(dragon)     # {'o', 'n'}
```


---

### Comprobar subconjuntos y superconjuntos

Un conjunto puede ser subconjunto o superconjunto de otro:

- Subconjunto: _issubset()_
- Superconjunto: _issuperset()_

```py
# Sintaxis
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item2', 'item3'}
st2.issubset(st1) # True
st1.issuperset(st2) # True
```

**Ejemplo:**

```py
whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
even_numbers = {0, 2, 4, 6, 8, 10}
whole_numbers.issubset(even_numbers) # Falso, porque es un superconjunto
whole_numbers.issuperset(even_numbers) # Verdadero

python = {'p', 'y', 't', 'h', 'o', 'n'}
dragon = {'d', 'r', 'a', 'g', 'o', 'n'}
python.issubset(dragon)     # Falso
```


---

### Comprobar la diferencia entre conjuntos

Devuelve la diferencia entre dos conjuntos.

```py
# Sintaxis
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item2', 'item3'}
st2.difference(st1) # set()
st1.difference(st2) # {'item1', 'item4'} => st1\st2
```

**Ejemplo:**

```py
whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
even_numbers = {0, 2, 4, 6, 8, 10}
whole_numbers.difference(even_numbers) # {1, 3, 5, 7, 9}

python = {'p', 'y', 't', 'o', 'n'}
dragon = {'d', 'r', 'a', 'g', 'o', 'n'}
python.difference(dragon)     # {'p', 'y', 't'}  - El resultado es desordenado (propiedad de los conjuntos)
dragon.difference(python)     # {'d', 'r', 'a', 'g'}
```


---

### Encontrar diferencia simétrica

Devuelve la diferencia simétrica entre dos conjuntos. Es decir, devuelve los elementos que pertenecen a uno de los conjuntos pero no a ambos; matemáticamente: (A\B) ∪ (B\A).

```py
# Sintaxis
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item2', 'item3'}
# Significa (A\B) ∪ (B\A)
st2.symmetric_difference(st1) # {'item1', 'item4'}
```

**Ejemplo:**

```py
whole_numbers = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
some_numbers = {1, 2, 3, 4, 5}
whole_numbers.symmetric_difference(some_numbers) # {0, 6, 7, 8, 9, 10}

python = {'p', 'y', 't', 'h', 'o', 'n'}
dragon = {'d', 'r', 'a', 'g', 'o', 'n'}
python.symmetric_difference(dragon)  # {'r', 't', 'p', 'y', 'g', 'a', 'd', 'h'}
```


---

### Comprobar conjuntos disjuntos

Si dos conjuntos no comparten elementos se dicen disjuntos. Podemos usar el método _isdisjoint()_ para comprobar si dos conjuntos son disjuntos.

```py
# Sintaxis
st1 = {'item1', 'item2', 'item3', 'item4'}
st2 = {'item2', 'item3'}
st2.isdisjoint(st1) # Falso
```

**Ejemplo:**

```py
even_numbers = {0, 2, 4, 6, 8}
odd_numbers = {1, 3, 5, 7, 9}
even_numbers.isdisjoint(odd_numbers) # Verdadero, porque no comparten elementos

python = {'p', 'y', 't', 'h', 'o', 'n'}
dragon = {'d', 'r', 'a', 'g', 'o', 'n'}
python.isdisjoint(dragon)  # Falso, comparten {'o', 'n'}
```



---

---

## 

**Consigna 1:** Crea un set vacío y luego un set con los lenguajes de programación `{'Python', 'Java', 'C++'}`. Imprime la longitud del set.
**[Solución]**
```python
empty_set = set()
languages = {'Python', 'Java', 'C++'}
print(len(languages)) # 3
```

**Consigna 2:** Agrega el lenguaje `'JavaScript'` al set de lenguajes usando el método `.add()`. Luego intenta agregar `'Python'` nuevamente. ¿Qué sucede?
**[Solución]**
```python
languages.add('JavaScript')
languages.add('Python') # Como ya existe, no se duplicará
print(languages) # {'JavaScript', 'Java', 'Python', 'C++'}
```

**Consigna 3:** Tienes dos sets: `A = {1, 2, 3, 4}` y `B = {3, 4, 5, 6}`. Encuentra la intersección de ambos sets (los elementos en común) y la unión de ambos.
**[Solución]**
```python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

interseccion = A.intersection(B)
union = A.union(B)

print("Intersección:", interseccion) # {3, 4}
print("Unión:", union) # {1, 2, 3, 4, 5, 6}
```

---

## 💻 Ejercicios Prácticos (Sets)

**Consigna 1:** Crea un set vacío y luego un set con los lenguajes de programación `{'Python', 'Java', 'C++'}`. Imprime la longitud del set.
**[Solución]**
```python
empty_set = set()
languages = {'Python', 'Java', 'C++'}
print(len(languages)) # 3
```

**Consigna 2:** Agrega el lenguaje `'JavaScript'` al set de lenguajes usando el método `.add()`. Luego intenta agregar `'Python'` nuevamente. ¿Qué sucede?
**[Solución]**
```python
languages.add('JavaScript')
languages.add('Python') # Como ya existe, no se duplicará
print(languages) # {'JavaScript', 'Java', 'Python', 'C++'}
```

**Consigna 3:** Tienes dos sets: `A = {1, 2, 3, 4}` y `B = {3, 4, 5, 6}`. Encuentra la intersección de ambos sets (los elementos en común) y la unión de ambos.
**[Solución]**
```python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

interseccion = A.intersection(B)
union = A.union(B)

print("Intersección:", interseccion) # {3, 4}
print("Unión:", union) # {1, 2, 3, 4, 5, 6}
```
