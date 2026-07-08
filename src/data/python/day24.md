# Día 24 - Estadística

## Análisis estadístico con Python

## Estadística

La estadística es la disciplina que estudia la recolección, organización, presentación, análisis, interpretación y comunicación de datos.
La estadística es una rama de las matemáticas y es un conocimiento previo recomendable para ciencia de datos y machine learning. Es un campo muy amplio; en esta sección nos centraremos solo en las partes más relevantes.
Al completar este reto puedes avanzar hacia desarrollo web, análisis de datos, machine learning o ciencia de datos. En algún punto de tu carrera profesional te enfrentarás a datos que necesitan ser procesados. Tener nociones de estadística te ayudará a tomar decisiones basadas en datos: como dice el dicho, "los datos nos hablan".


---

## Datos

¿Qué son los datos? Los datos son cualquier conjunto de caracteres recogidos y transformados con algún propósito, usualmente para análisis. Pueden ser texto, números, imágenes, audio o vídeo. Si los datos carecen de contexto son poco útiles para humanos o máquinas. Para extraer significado necesitamos herramientas que los procesen.

El flujo de trabajo en análisis de datos, ciencia de datos o machine learning comienza siempre por los datos. Pueden provenir de fuentes externas o ser generados. Existen datos estructurados y no estructurados.

Los datos pueden ser pequeños o masivos. Muchos de los formatos de datos que encontrarás ya se han presentado en la sección de manejo de archivos.

## Módulo statistics

El módulo _statistics_ de Python ofrece funciones para cálculos estadísticos sobre datos numéricos. No compite con bibliotecas avanzadas de terceros (NumPy, SciPy) ni con paquetes profesionales de estadística, sino que provee funcionalidades a un nivel similar al de calculadoras científicas o gráficas.

# NumPy

Como lenguaje general, Python se potencia con librerías como numpy, scipy, matplotlib y pandas, transformándose en un entorno potente para computación científica.

NumPy es la librería central para computación científica en Python; ofrece arrays multidimensionales de alto rendimiento y herramientas para operar con ellos.

Para trabajar con notebooks es recomendable usar Jupyter. Puedes instalar Anaconda para disponer de Jupyter y muchas librerías preinstaladas.

```sh
pip install numpy
```


---

## Importar NumPy

Si usas Jupyter (recomendado), puedes seguir este notebook de ejemplo.

```py
# cómo importar numpy
import numpy as np
# cómo comprobar la versión de numpy
print('numpy:', np.__version__)
# ver métodos disponibles
print(dir(np))
```


---

## Crear arrays con NumPy

### Crear arrays enteros con NumPy

```py
# crear una lista de Python
python_list = [1,2,3,4,5]

# comprobar tipo
print('Type:', type(python_list)) # <class 'list'>
print(python_list) # [1, 2, 3, 4, 5]

two_dimensional_list = [[0,1,2], [3,4,5], [6,7,8]]
print(two_dimensional_list)  # [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

# crear un array NumPy desde la lista de Python
numpy_array_from_list = np.array(python_list)
print(type(numpy_array_from_list))   # <class 'numpy.ndarray'>
print(numpy_array_from_list) # array([1, 2, 3, 4, 5])
```


---

### Crear arrays float con NumPy

```py
# lista de Python
python_list = [1,2,3,4,5]

numpy_array_from_list2 = np.array(python_list, dtype=float)
print(numpy_array_from_list2) # array([1., 2., 3., 4., 5.])
```


---

### Crear arrays booleanos con NumPy

```py
numpy_bool_array = np.array([0, 1, -1, 0, 0], dtype=bool)
print(numpy_bool_array) # array([False,  True,  True, False, False])
```

### Crear arrays multidimensionales con NumPy

Un array de NumPy puede tener múltiples filas y columnas:

```py
two_dimensional_list = [[0,1,2], [3,4,5], [6,7,8]]
numpy_two_dimensional_list = np.array(two_dimensional_list)
print(type(numpy_two_dimensional_list))
print(numpy_two_dimensional_list)
```

```sh
<class 'numpy.ndarray'>
[[0 1 2]
 [3 4 5]
 [6 7 8]]
```


---

### Convertir arrays de NumPy a listas

```py
# podemos usar tolist() para convertir un array a lista de Python
np_to_list = numpy_array_from_list.tolist()
print(type(np_to_list))
print('Array 1D:', np_to_list)
print('Array 2D: ', numpy_two_dimensional_list.tolist())
```

```sh
<class 'list'>
Array 1D: [1, 2, 3, 4, 5]
Array 2D:  [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
```


---

### Crear arrays desde tuplas

```py
# crear una tupla en Python
python_tuple = (1,2,3,4,5)
print(type(python_tuple)) # <class 'tuple'>
print('python_tuple: ', python_tuple) # python_tuple:  (1, 2, 3, 4, 5)

numpy_array_from_tuple = np.array(python_tuple)
print(type(numpy_array_from_tuple)) # <class 'numpy.ndarray'>
print('numpy_array_from_tuple: ', numpy_array_from_tuple) # numpy_array_from_tuple:  [1 2 3 4 5]
```


---

### Forma (shape) de arrays de NumPy

El método shape devuelve una tupla con la forma del array: filas y columnas. Si el array es 1D devuelve su longitud.

```py
nums = np.array([1, 2, 3, 4, 5])
print(nums)
print('Forma de nums: ', nums.shape)
print(numpy_two_dimensional_list)
print('Forma de numpy_two_dimensional_list: ', numpy_two_dimensional_list.shape)
three_by_four_array = np.array([[0, 1, 2, 3],
    [4,5,6,7],
    [8,9,10, 11]])
print(three_by_four_array.shape)
```

```sh
[1 2 3 4 5]
Forma de nums:  (5,)
[[0 1 2]
 [3 4 5]
 [6 7 8]]
Forma de numpy_two_dimensional_list:  (3, 3)
(3, 4)
```


---

### Tipo de datos de arrays de NumPy

Tipos de datos: str, int, float, complex, bool, list, None

```py
int_lists = [-3, -2, -1, 0, 1, 2,3]
int_array = np.array(int_lists)
float_array = np.array(int_lists, dtype=float)

print(int_array)
print(int_array.dtype)
print(float_array)
print(float_array.dtype)
```

```sh
[-3 -2 -1  0  1  2  3]
int64
[-3. -2. -1.  0.  1.  2.  3.]
float64
```


---

### Tamaño (size) de arrays de NumPy

Para conocer el número de elementos de un array utilizamos size:

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
two_dimensional_list = np.array([[0, 1, 2],
                              [3, 4, 5],
                              [6, 7, 8]])

print('Tamaño:', numpy_array_from_list.size) # 5
print('Tamaño:', two_dimensional_list.size)  # 9
```

```sh
Tamaño: 5
Tamaño: 9
```


---

## Operaciones matemáticas con NumPy

Los arrays de NumPy permiten operaciones vectorizadas sin necesidad de bucles.

Operaciones disponibles:

- Suma (+)
- Resta (-)
- Multiplicación (*)
- División (/)
- Módulo (%)
- División entera (//)
- Potencia (**)


---

### Suma

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('Suma: ', numpy_array_from_list + 2)
print('Suma: ', np.add(numpy_array_from_list, 2))
```

```sh
Array original:  [1 2 3 4 5]
Suma:  [3 4 5 6 7]
Suma:  [3 4 5 6 7]
```


---

### Resta

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('Resta: ', numpy_array_from_list - 2)
print('Resta: ', np.subtract(numpy_array_from_list, 2))
```

```sh
Array original:  [1 2 3 4 5]
Resta:  [-1  0  1  2  3]
Resta:  [-1  0  1  2  3]
```


---

### Multiplicación

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('Multiplicación: ', numpy_array_from_list * 2)
print('Multiplicación: ', np.multiply(numpy_array_from_list, 2))
```

```sh
Array original:  [1 2 3 4 5]
Multiplicación:  [ 2  4  6  8 10]
Multiplicación:  [ 2  4  6  8 10]
```


---

### División

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('División: ', numpy_array_from_list / 2)
print('División: ', np.divide(numpy_array_from_list, 2))
```

```sh
Array original:  [1 2 3 4 5]
División:  [0.5 1.  1.5 2.  2.5]
División:  [0.5 1.  1.5 2.  2.5]
```


---

### Módulo

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('Módulo: ', numpy_array_from_list % 2)
print('Módulo: ', np.mod(numpy_array_from_list, 2))
```

```sh
Array original:  [1 2 3 4 5]
Módulo:  [1 0 1 0 1]
Módulo:  [1 0 1 0 1]
```


---

### División entera

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('División entera: ', numpy_array_from_list // 2)
print('División entera: ', np.floor_divide(numpy_array_from_list, 2))
```

```sh
Array original:  [1 2 3 4 5]
División entera:  [0 1 1 2 2]
División entera:  [0 1 1 2 2]
```


---

### Potencia

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5])
print('Array original: ', numpy_array_from_list)
print('Potencia: ', numpy_array_from_list ** 2)
print('Potencia: ', np.power(numpy_array_from_list, 2))
```

```sh
Array original:  [1 2 3 4 5]
Potencia:  [ 1  4  9 16 25]
Potencia:  [ 1  4  9 16 25]
```


---

## Comprobar tipos de datos

```py
numpy_int_arr = np.array([1, 2, 3, 4])
numpy_float_arr = np.array([1.1, 2.0, 3.2])
numpy_bool_arr = np.array([-3, -2, 0, 1, 2, 3], dtype='bool')

print(numpy_int_arr.dtype)
print(numpy_float_arr.dtype)
print(numpy_bool_arr.dtype)
```

```sh
int64
float64
bool
```


---

## Convertir tipos

Podemos convertir tipos con astype:

```py
numpy_int_arr = np.array([1, 2, 3, 4], dtype='float')
numpy_int_arr.astype('int').dtype
numpy_float_arr = np.array([1.1, 2.0, 3.2])
numpy_float_arr.astype('int').dtype
numpy_int_arr = np.array([-3, -2, 0, 1, 2, 3])
numpy_int_arr.astype('bool').dtype
```

```sh
int64
int64
bool
```


---

## Arrays multidimensionales

Una de las ventajas de NumPy es el manejo de arrays multidimensionales:

```py
two_dimension_array = np.array([(1,2,3),(4,5,6), (7,8,9)])
print(type(two_dimension_array))
print(two_dimension_array)
print('Forma: ', two_dimension_array.shape)
print('Tamaño: ', two_dimension_array.size)
print('Tipo de datos: ', two_dimension_array.dtype)
```

```sh
<class 'numpy.ndarray'>
[[1 2 3]
 [4 5 6]
 [7 8 9]]
Forma:  (3, 3)
Tamaño:  9
Tipo de datos:  int64
```


---

### Acceder a elementos en arrays NumPy

```py
two_dimension_array = np.array([[1,2,3],[4,5,6], [7,8,9]])
first_row = two_dimension_array[0]
second_row = two_dimension_array[1]
third_row = two_dimension_array[2]
print('Primera fila:', first_row)
print('Segunda fila:', second_row)
print('Tercera fila: ', third_row)
```

```sh
Primera fila: [1 2 3]
Segunda fila: [4 5 6]
Tercera fila:  [7 8 9]
```

Obtener columnas:

```py
first_column= two_dimension_array[:,0]
second_column = two_dimension_array[:,1]
third_column = two_dimension_array[:,2]
print('Primera columna:', first_column)
print('Segunda columna:', second_column)
print('Tercera columna: ', third_column)
```

```sh
Primera columna: [1 4 7]
Segunda columna: [2 5 8]
Tercera columna:  [3 6 9]
```


---

## Slicing en arrays NumPy

El slicing es similar al de listas, pero admite dos dimensiones.

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
print('Array original:', numpy_array_from_list)

# primer parámetro: inicio
# segundo parámetro: parada
# tercer parámetro: paso

ten_first_items = numpy_array_from_list[0:10]
print('Primeras 10:', ten_first_items)
first_five_items = numpy_array_from_list[:5]
print('Primeras 5:', first_five_items)
last_five_items = numpy_array_from_list[5:]
print('Últimas 5:', last_five_items)
# índice negativo
last_five_items = numpy_array_from_list[-5:]
print('Últimas 5:', last_five_items)
```

```sh
Array original: [ 1  2  3  4  5  6  7  8  9 10]
Primeras 10: [ 1  2  3  4  5  6  7  8  9 10]
Primeras 5: [1 2 3 4 5]
Últimas 5: [ 6  7  8  9 10]
Últimas 5: [ 6  7  8  9 10]
```

Seleccionar cada segundo elemento:

```py
every_two_item = numpy_array_from_list[::2]
print('Cada dos elementos:', every_two_item)
```

```sh
Cada dos elementos: [1 3 5 7 9]
```

Invertir array:

```py
reversed_array = numpy_array_from_list[::-1]
print('Array invertido:', reversed_array)
```

```sh
Array invertido: [10  9  8  7  6  5  4  3  2  1]
```

Slicing en 2D:

```py
two_dimension_array = np.array([[1,2,3],[4,5,6], [7,8,9]])
print(two_dimension_array)
print(two_dimension_array[1, 1])
print(two_dimension_array[1, 1:3])
print(two_dimension_array[1:3, 1:3])
```

```sh
[[1 2 3]
 [4 5 6]
 [7 8 9]]
5
[5 6]
[[5 6]
 [8 9]]
```


---

## Concatenación de arrays en NumPy

```py
first_array = np.array([1, 2, 3])
second_array = np.array([4, 5, 6])
third_array = np.array([7, 8, 9])
print('Primer array:', first_array)
print('Segundo array:', second_array)
print('Tercer array:', third_array)
```

```sh
Primer array: [1 2 3]
Segundo array: [4 5 6]
Tercer array: [7 8 9]
```


---

### Concatenación horizontal

```py
horizontal_concat = np.hstack((first_array, second_array, third_array))
print('Concatenación horizontal:', horizontal_concat)
```

```sh
Concatenación horizontal: [1 2 3 4 5 6 7 8 9]
```


---

### Concatenación vertical

```py
vertical_concat = np.vstack((first_array, second_array, third_array))
print('Concatenación vertical:', vertical_concat)
```

```sh
Concatenación vertical:
[[1 2 3]
 [4 5 6]
 [7 8 9]]
```


---

## Funciones comunes de NumPy

### Mínimo, máximo, media, mediana y percentiles

```py
numpy_array_from_list = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
print('Mínimo:', numpy_array_from_list.min())
print('Máximo:', numpy_array_from_list.max())
print('Media:', numpy_array_from_list.mean())
```


---

### Soluciones
No hay código para este ejercicio. NumPy se enfoca en uso general. Intenta usar NumPy en lugar del módulo `statistics` para los ejercicios del nivel 1 del Día 21.