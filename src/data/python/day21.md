# Día 21 - Clases y Objetos

## Clases y objetos

Python es un lenguaje orientado a objetos. En Python todo es un objeto con atributos y métodos. Los números, cadenas, listas, diccionarios, tuplas, conjuntos, etc. que usamos en programas son instancias de las clases incorporadas correspondientes. Creamos clases para definir objetos. Una clase es como un constructor de objetos o un "molde" para crear objetos. Instanciamos una clase para crear un objeto. La clase define las propiedades y el comportamiento, mientras que el objeto representa la instancia.

Desde el inicio de este reto hemos estado usando clases y objetos sin darnos cuenta. Cada elemento en un programa Python es un objeto perteneciente a alguna clase. Veamos que todo en Python pertenece a una clase:

```py
asabeneh@Asabeneh:~$ python
Python 3.9.6 (default, Jun 28 2021, 15:26:21)
[Clang 11.0.0 (clang-1100.0.33.8)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> num = 10
>>> type(num)
<class 'int'>
>>> string = 'string'
>>> type(string)
<class 'str'>
>>> boolean = True
>>> type(boolean)
<class 'bool'>
>>> lst = []
>>> type(lst)
<class 'list'>
>>> tpl = ()
>>> type(tpl)
<class 'tuple'>
>>> set1 = set()
>>> type(set1)
<class 'set'>
>>> dct = {}
>>> type(dct)
<class 'dict'>
```


---

### Crear una clase

Para crear una clase usamos la palabra clave class seguida del nombre de la clase y dos puntos. El nombre de la clase debe usar CamelCase.

```sh
# sintaxis
class NombreClase:
    # código aquí
```

**Ejemplo:**

```py
class Person:
    pass
print(Person)
```

```sh
<__main__.Person object at 0x10804e510>
```


---

### Crear un objeto

Creamos un objeto llamando a la clase:

```py
p = Person()
print(p)
```


---

### Constructor de clase

En el ejemplo anterior creamos un objeto de la clase Person. Sin embargo, una clase sin constructor no es muy útil en la práctica. Usamos el método especial __init__ como constructor en Python. __init__ recibe self, que es la referencia a la instancia actual.

**Ejemplo:**

```py
class Person:
    def __init__(self, name):
        # self permite ligar parámetros a la instancia
        self.name = name

p = Person('Asabeneh')
print(p.name)
print(p)
```

```sh
# salida
Asabeneh
<__main__.Person object at 0x2abf46907e80>
```

Añadamos más parámetros al constructor:

```py
class Person:
    def __init__(self, firstname, lastname, age, country, city):
        self.firstname = firstname
        self.lastname = lastname
        self.age = age
        self.country = country
        self.city = city

p = Person('Asabeneh', 'Yetayeh', 250, 'Finland', 'Helsinki')
print(p.firstname)
print(p.lastname)
print(p.age)
print(p.country)
print(p.city)
```

```sh
# salida
Asabeneh
Yetayeh
250
Finland
Helsinki
```


---

### Métodos de instancia

Un objeto puede tener métodos, que son funciones pertenecientes a esa instancia.

**Ejemplo:**

```py
class Person:
    def __init__(self, firstname, lastname, age, country, city):
        self.firstname = firstname
        self.lastname = lastname
        self.age = age
        self.country = country
        self.city = city
    def person_info(self):
        return f'{self.firstname} {self.lastname} tiene {self.age} años. Vive en {self.city}, {self.country}.'

p = Person('Asabeneh', 'Yetayeh', 250, 'Finland', 'Helsinki')
print(p.person_info())
```

```sh
# salida
Asabeneh Yetayeh tiene 250 años. Vive en Helsinki, Finland.
```


---

### Valores por defecto de los objetos

A veces queremos proporcionar valores por defecto a los parámetros del constructor para evitar errores cuando la clase se instancia sin argumentos.

**Ejemplo:**

```py
class Person:
    def __init__(self, firstname='Asabeneh', lastname='Yetayeh', age=250, country='Finland', city='Helsinki'):
        self.firstname = firstname
        self.lastname = lastname
        self.age = age
        self.country = country
        self.city = city

    def person_info(self):
        return f'{self.firstname} {self.lastname} tiene {self.age} años. Vive en {self.city}, {self.country}.'

p1 = Person()
print(p1.person_info())
p2 = Person('John', 'Doe', 30, 'Nomanland', 'Noman city')
print(p2.person_info())
```

```sh
# salida
Asabeneh Yetayeh tiene 250 años. Vive en Helsinki, Finland.
John Doe tiene 30 años. Vive en Noman city, Nomanland.
```


---

### Modificar valores por defecto de la clase

En el siguiente ejemplo todos los parámetros del constructor tienen valores por defecto y añadimos un atributo skills y un método add_skill para añadir habilidades.

```py
class Person:
    def __init__(self, firstname='Asabeneh', lastname='Yetayeh', age=250, country='Finland', city='Helsinki'):
        self.firstname = firstname
        self.lastname = lastname
        self.age = age
        self.country = country
        self.city = city
        self.skills = []

    def person_info(self):
        return f'{self.firstname} {self.lastname} tiene {self.age} años. Vive en {self.city}, {self.country}.'
    def add_skill(self, skill):
        self.skills.append(skill)

p1 = Person()
print(p1.person_info())
p1.add_skill('HTML')
p1.add_skill('CSS')
p1.add_skill('JavaScript')
p2 = Person('John', 'Doe', 30, 'Nomanland', 'Noman city')
print(p2.person_info())
print(p1.skills)
print(p2.skills)
```

```sh
# salida
Asabeneh Yetayeh tiene 250 años. Vive en Helsinki, Finland.
John Doe tiene 30 años. Vive en Noman city, Nomanland.
['HTML', 'CSS', 'JavaScript']
[]
```


---

### Herencia

La herencia nos permite definir una clase que hereda el comportamiento de otra, facilitando la reutilización del código.

```py
# sintaxis
class NombreSubclase(NombreSuperclase):
    # código aquí
```

Ejemplo:

```py
class Student(Person):
    pass

s1 = Student('Eyob', 'Yetayeh', 30, 'Finland', 'Helsinki')
s2 = Student('Lidiya', 'Teklemariam', 28, 'Finland', 'Espoo')
print(s1.person_info())
s1.add_skill('JavaScript')
s1.add_skill('React')
s1.add_skill('Python')
print(s1.skills)
print(s2.person_info())
s2.add_skill('Organizing')
s2.add_skill('Marketing')
s2.add_skill('Digital Marketing')
print(s2.skills)
```

```sh
# salida
Eyob Yetayeh tiene 30 años. Vive en Helsinki, Finland.
['JavaScript', 'React', 'Python']
Lidiya Teklemariam tiene 28 años. Vive en Espoo, Finland.
['Organizing', 'Marketing', 'Digital Marketing']
```

No hemos definido nuevos métodos en Student, pero puede usar los métodos del padre Person. Student hereda el constructor __init__ y el método person_info de Person. Si queremos añadir comportamiento específico en la subclase, definimos nuevos métodos o redefinimos los existentes.

```py
class Student(Person):
    def __init__(self, firstname='Asabeneh', lastname='Yetayeh', age=250, country='Finland', city='Helsinki', gender='male'):
        self.gender = gender
        super().__init__(firstname, lastname, age, country, city)
    def person_info(self):
        gender = 'él' if self.gender == 'male' else 'ella'
        return f'{self.firstname} {self.lastname} tiene {self.age} años. {gender.capitalize()} vive en {self.city}, {self.country}.'

s1 = Student('Eyob', 'Yetayeh', 30, 'Finland', 'Helsinki', 'male')
s2 = Student('Lidiya', 'Teklemariam', 28, 'Finland', 'Espoo', 'female')
print(s1.person_info())
s1.add_skill('JavaScript')
s1.add_skill('React')
s1.add_skill('Python')
print(s1.skills)
print(s2.person_info())
s2.add_skill('Organizing')
s2.add_skill('Marketing')
s2.add_skill('Digital Marketing')
print(s2.skills)
```

```sh
# salida
Eyob Yetayeh tiene 30 años. Él vive en Helsinki, Finland.
['JavaScript', 'React', 'Python']
Lidiya Teklemariam tiene 28 años. Ella vive en Espoo, Finland.
['Organizing', 'Marketing', 'Digital Marketing']
```

Podemos usar super() o el nombre de la clase padre para invocar el comportamiento del padre. En el ejemplo anterior sobrescribimos el método person_info en la subclase con una implementación distinta.


---

### Sobrescribir métodos de la clase padre

Como se mostró, podemos sobrescribir un método del padre definiendo en la subclase un método con el mismo nombre.

---

## 

**Consigna 1:** Crea una clase `Animal` con un método `__init__` que inicialice `name`, `age` y `color`. Crea un objeto a partir de ella e imprime su nombre.
**[Solución]**
```python
class Animal:
    def __init__(self, name, age, color):
        self.name = name
        self.age = age
        self.color = color

mi_animal = Animal("Pelusa", 2, "Blanco")
print(mi_animal.name) # Pelusa
```

**Consigna 2:** Agrega un método regular llamado `animal_info` a la clase `Animal` que retorne un string descriptivo.
**[Solución]**
```python
class AnimalV2:
    def __init__(self, name, age, color):
        self.name = name
        self.age = age
        self.color = color
        
    def animal_info(self):
        return f"{self.name} tiene {self.age} años y es de color {self.color}."

rex = AnimalV2("Rex", 5, "Marrón")
print(rex.animal_info()) # Rex tiene 5 años y es de color Marrón.
```

**Consigna 3:** Crea una clase `Dog` que herede de la clase `Animal`. Sobrescribe el método `animal_info` o añade un método nuevo como `bark()`.
**[Solución]**
```python
class Dog(AnimalV2):
    def bark(self):
        return "¡Guau guau!"
        
perrito = Dog("Firulais", 1, "Negro")
print(perrito.animal_info()) # Utiliza el método heredado
print(perrito.bark())        # ¡Guau guau!
```

---

## 💻 Ejercicios Prácticos (Clases y Objetos)

**Consigna 1:** Crea una clase `Animal` con un método `__init__` que inicialice `name`, `age` y `color`. Crea un objeto a partir de ella e imprime su nombre.
**[Solución]**
```python
class Animal:
    def __init__(self, name, age, color):
        self.name = name
        self.age = age
        self.color = color

mi_animal = Animal("Pelusa", 2, "Blanco")
print(mi_animal.name) # Pelusa
```

**Consigna 2:** Agrega un método regular llamado `animal_info` a la clase `Animal` que retorne un string descriptivo.
**[Solución]**
```python
class AnimalV2:
    def __init__(self, name, age, color):
        self.name = name
        self.age = age
        self.color = color
        
    def animal_info(self):
        return f"{self.name} tiene {self.age} años y es de color {self.color}."

rex = AnimalV2("Rex", 5, "Marrón")
print(rex.animal_info()) # Rex tiene 5 años y es de color Marrón.
```

**Consigna 3:** Crea una clase `Dog` que herede de la clase `Animal`. Sobrescribe el método `animal_info` o añade un método nuevo como `bark()`.
**[Solución]**
```python
class Dog(AnimalV2):
    def bark(self):
        return "¡Guau guau!"
        
perrito = Dog("Firulais", 1, "Negro")
print(perrito.animal_info()) # Utiliza el método heredado
print(perrito.bark())        # ¡Guau guau!
```
