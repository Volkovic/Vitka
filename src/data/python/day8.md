# Día 8 - Diccionarios

## Diccionarios

Un diccionario es un tipo de datos compuesto por pares clave-valor desordenados y modificables (mutables).

### Crear diccionarios

Para crear diccionarios, usamos llaves {} o la función incorporada _dict()_.

```py
# Sintaxis
empty_dict = {}
# Diccionario con valores
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
```

**Ejemplo:**

```py
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_married':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
    }
```

El diccionario anterior muestra que los valores pueden ser de cualquier tipo de datos: cadenas, booleanos, listas, tuplas, conjuntos o diccionarios.


---

### Longitud del diccionario

Esta función comprueba la cantidad de pares clave-valor en el diccionario.

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(len(dct)) # 4
```

**Ejemplo:**

```py
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_married':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
    }
print(len(person)) # 7

```


---

### Acceder a elementos del diccionario

Podemos acceder a los elementos del diccionario referenciando sus claves.

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(dct['key1']) # value1
print(dct['key4']) # value4
```

**Ejemplo:**

```py
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_married':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
    }
print(person['first_name']) # Asabeneh
print(person['country'])    # Finland
print(person['skills'])     # ['JavaScript', 'React', 'Node', 'MongoDB', 'Python']
print(person['skills'][0])  # JavaScript
print(person['address']['street']) # Space street
print(person['city'])       # Error
```

Cuando se accede a un elemento por clave, si la clave no existe se lanzará un error. Para evitarlo, primero compruebe si existe la clave o use el método _get_. El método get devuelve None si la clave no existe (que es un objeto de tipo NoneType).

```py
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_married':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
    }
print(person.get('first_name')) # Asabeneh
print(person.get('country'))    # Finland
print(person.get('skills')) #['HTML','CSS','JavaScript', 'React', 'Node', 'MongoDB', 'Python']
print(person.get('city'))   # None
```


---

### Añadir elementos al diccionario

Podemos añadir nuevos pares clave-valor al diccionario

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct['key5'] = 'value5'
```

**Ejemplo:**

```py
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_married':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
        }
}
person['job_title'] = 'Instructor'
person['skills'].append('HTML')
print(person)
```


---

### Modificar elementos del diccionario

Podemos modificar elementos del diccionario

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct['key1'] = 'value-one'
```

**Ejemplo:**

```py
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_married':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
}
person['first_name'] = 'Eyob'
person['age'] = 252
```


---

### Comprobar claves en el diccionario

Usamos el operador _in_ para comprobar si una clave existe en el diccionario

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print('key2' in dct) # True
print('key5' in dct) # False
```


---

### Eliminar pares clave-valor del diccionario

- _pop(key)_: elimina el elemento con la clave especificada
- _popitem()_: elimina el último elemento
- _del_: elimina el elemento con la clave especificada

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct.pop('key1') # elimina el elemento key1
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct.popitem() # elimina el último elemento
del dct['key2'] # elimina el elemento key2
```

**Ejemplo:**

```py
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_married':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
}
person.pop('first_name')  # elimina el elemento first_name
person.popitem()          # elimina el último elemento
del person['is_married']  # elimina el elemento is_married
```


---

### Convertir diccionario a lista de tuplas

El método _items()_ convierte el diccionario en una lista de tuplas.

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(dct.items()) # dict_items([('key1', 'value1'), ('key2', 'value2'), ('key3', 'value3'), ('key4', 'value4')])
```


---

### Vaciar diccionario

Si no necesitamos los elementos del diccionario, podemos usar el método _clear()_ para vaciarlo

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(dct.clear()) # None
```


---

### Eliminar diccionario

Si ya no necesitamos el diccionario, podemos eliminarlo por completo

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
del dct
```


---

### Copiar diccionario

Podemos usar el método _copy()_ para copiar un diccionario. Usar copy evita que el diccionario original sea modificado.

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct_copy = dct.copy() # {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
```


---

### Obtener lista de claves del diccionario

El método keys() nos da una lista con todas las claves del diccionario.

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
keys = dct.keys()
print(keys) # dict_keys(['key1', 'key2', 'key3', 'key4'])
```


---

### Obtener lista de valores del diccionario

El método values() nos da una lista con todos los valores del diccionario.

```py
# Sintaxis
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
values = dct.values()
print(values) # dict_values(['value1', 'value2', 'value3', 'value4'])
```



---

---

## 💻 Ejercicios Prácticos (Diccionarios)

**Consigna 1:** Crea un diccionario vacío llamado `dog` y agrégale las claves `name`, `color`, `breed`, `legs` y `age` con sus respectivos valores.
**[Solución]**
```python
dog = {}
dog['name'] = 'Firulais'
dog['color'] = 'Marrón'
dog['breed'] = 'Labrador'
dog['legs'] = 4
dog['age'] = 3
print(dog)
```

**Consigna 2:** Tienes el diccionario `student = {'first_name':'John', 'age':22, 'country':'Finland'}`. Obtén el valor de `country` utilizando el método `.get()`.
**[Solución]**
```python
student = {'first_name':'John', 'age':22, 'country':'Finland'}
pais = student.get('country')
print("País:", pais) # Finland
```

**Consigna 3:** Utiliza los métodos `.keys()` y `.values()` para obtener listas de todas las claves y valores del diccionario `student`.
**[Solución]**
```python
claves = list(student.keys())
valores = list(student.values())

print("Claves:", claves) # ['first_name', 'age', 'country']
print("Valores:", valores) # ['John', 22, 'Finland']
```
