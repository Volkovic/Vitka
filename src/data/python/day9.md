# Día 9 - Sentencias condicionales

## Sentencias condicionales

Por defecto, las sentencias en un script de Python se ejecutan secuencialmente de arriba hacia abajo. Si la lógica lo requiere, podemos cambiar el orden de dos maneras:

- Ejecución condicional: si una expresión es verdadera, se ejecutan uno o más bloques de código
- Ejecución repetitiva: mientras una expresión sea verdadera, se repiten uno o más bloques de código. En esta sección discutiremos las sentencias *if*, *else* y *elif*. Los operadores de comparación y lógicos vistos antes serán útiles aquí.


---

### Condición If

En Python y otros lenguajes, la palabra clave *if* se usa para comprobar si una condición es verdadera y ejecutar un bloque de código. Recuerda la indentación después de los dos puntos.

```py
# Sintaxis
if condition:
    # Si la condición es verdadera, ejecutar este bloque de código
```

**Ejemplo 1**

```py
a = 3
if a > 0:
    print('A es un número positivo')
# A es un número positivo
```

Como se muestra arriba, 3 es mayor que 0. La condición es verdadera y se ejecuta el bloque de código. Si la condición fuera falsa, no veríamos resultado; para manejar condiciones falsas usamos el bloque *else*.


---

### If Else

Si la condición es verdadera se ejecuta el primer bloque, de lo contrario se ejecuta el bloque *else*.

```py
# Sintaxis
if condition:
    # Si la condición es verdadera, ejecutar este bloque
else:
    # Si la condición es falsa, ejecutar este bloque
```

**Ejemplo:**

```py
a = 3
if a < 0:
    print('A es un número negativo')
else:
    print('A es un número positivo')
```

La condición anterior es falsa, por eso se ejecuta el bloque *else*. ¿Y si tenemos más de dos condiciones? Podemos usar *elif*.


---

### If Elif Else

En la vida tomamos decisiones cada día que implican más de una condición. En programación, cuando tenemos múltiples condiciones, usamos *elif*.

```py
# Sintaxis
if condition:
    # código
elif condition:
    # código
else:
    # código
```

**Ejemplo:**

```py
a = 0
if a > 0:
    print('A es un número positivo')
elif a < 0:
    print('A es un número negativo')
else:
    print('A es cero')
```


---

### Abreviación

```py
# Sintaxis
<expr> if condición else <expr>
```

**Ejemplo:**

```py
a = 3
print('A es positivo') if a > 0 else print('A es negativo') # Se cumple la primera condición, imprimirá 'A es positivo'
```


---

### Condicionales anidados

Los condicionales pueden anidarse.

```py
# Sintaxis
if condición:
    # código
    if condición:
        # código
```

**Ejemplo:**

```py
a = 0
if a > 0:
    if a % 2 == 0:
        print('A es un número positivo y par')
    else:
        print('A es un número positivo')
elif a == 0:
    print('A es cero')
else:
    print('A es un número negativo')
```

Podemos usar el operador lógico *and* para evitar escribir condicionales anidados.


---

### If y operadores lógicos

```py
# Sintaxis
if condición and condición:
    # código
```

**Ejemplo:**

```py
a = 0
if a > 0 and a % 2 == 0:
    print('A es un número positivo y par')
elif a > 0 and a % 2 != 0:
    print('A es un número positivo')
elif a == 0:
    print('A es cero')
else:
    print('A es un número negativo')
```


---

### If y operador lógico Or

```py
# Sintaxis
if condición or condición:
    # código
```

**Ejemplo:**

```py
user = 'James'
access_level = 3
if user == 'admin' or access_level >= 4:
    print('Acceso concedido!')
else:
    print('Acceso denegado!')
```



---