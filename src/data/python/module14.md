## Funciones de Orden Superior: Inyección de Dependencias Funcionales

### 1. El Concepto en la Vida Real
Imagina que administras la cocina de un restaurante. Tienes un chef altamente capacitado para procesar alimentos, pero el método exacto de cocción varía según el pedido. 
```python
# Estado base sin aplicar el concepto
def chef_prepara_horneado(ingrediente):
    resultado = f"{ingrediente} horneado a la perfección"
    print(f"Chef: ¡Listo! Tenemos un {resultado}")

def chef_prepara_frito(ingrediente):
    resultado = f"{ingrediente} frito y muy crujiente"
    print(f"Chef: ¡Listo! Tenemos un {resultado}")
```
El problema con este enfoque es que genera redundancia de código; debes crear una función completa para cada método de cocción. Aquí es donde interviene el concepto de **Funciones de Orden Superior** para resolverlo mediante la inyección de la función de cocción como un parámetro, tratando a las funciones como ciudadanos de primera clase.

### 2. Anatomía del Código Paso a Paso
Esta es la estructura interna detallada de la implementación:
```python
# 1. Definimos las funciones de utilidad (comportamientos modulares)
def hornear(ingrediente):
    return f"{ingrediente} horneado a la perfección"

def freir(ingrediente):
    return f"{ingrediente} frito y muy crujiente"

# 2. Definimos la Función de Orden Superior que recibe otra función como argumento
def chef_prepara(metodo_de_coccion, ingrediente):
    print("Chef: Preparando el ingrediente...")
    # <-- Paso A: Se invoca la función recibida por parámetro dinámicamente
    resultado = metodo_de_coccion(ingrediente) 
    print(f"Chef: ¡Listo! Tenemos un {resultado}")
```

### 3. Implementación Práctica y Resultado
Al aplicar la sintaxis de paso de funciones (sin paréntesis, pasando la referencia en memoria), el intérprete ejecuta la lógica delegada de forma transparente:
```python
# Pasamos la referencia de la función 'hornear' y 'freir'
chef_prepara(hornear, "Pollo") 
chef_prepara(freir, "Pescado")
```
**Resultado en consola:**
```text
Chef: Preparando el ingrediente...
Chef: ¡Listo! Tenemos un Pollo horneado a la perfección
Chef: Preparando el ingrediente...
Chef: ¡Listo! Tenemos un Pescado frito y muy crujiente
```
**Conclusión:** Hemos logrado abstraer el comportamiento del chef, permitiendo inyectar cualquier método de cocción sin modificar la lógica principal de preparación.

---

## Funciones de Orden Superior: Factorías de Funciones

### 1. El Concepto en la Vida Real
Imagina una planta industrial que fabrica maquinaria para restaurantes. En lugar de construir máquinas genéricas, la planta recibe especificaciones y construye una máquina especializada (una función) que el cliente puede llevarse y operar posteriormente.
```python
# Estado base sin aplicar el concepto
def operar_maquina_pizza(cantidad):
    return f"🍕 Saliendo {cantidad} pizzas calientes!"

def operar_maquina_helado(cantidad):
    return f"🍦 Sirviendo {cantidad} helados fríos!"
```
El problema con este enfoque es que el cliente debe conocer y gestionar todas las funciones disponibles globalmente. Aquí es donde interviene el **Retorno de Funciones** para resolverlo mediante una función constructora que encapsula y devuelve la herramienta específica solicitada.

### 2. Anatomía del Código Paso a Paso
Esta es la estructura interna detallada de la implementación:
```python
def fabrica_de_maquinas(tipo_comida): # 1. Función constructora (Factoría)
    
    # <-- Paso A: Definición de funciones internas (planos de las máquinas)
    def maquina_pizzas(cantidad):
        return f"🍕 Saliendo {cantidad} pizzas calientes!"
        
    def maquina_helados(cantidad):
        return f"🍦 Sirviendo {cantidad} helados fríos!"
        
    # <-- Paso B: Retorno de la referencia a la función interna (SIN ejecutarla)
    if tipo_comida == "pizza":
        return maquina_pizzas
    elif tipo_comida == "helado":
        return maquina_helados
```

### 3. Implementación Práctica y Resultado
Al aplicar la sintaxis de asignación, el intérprete guarda la función retornada en una variable para su ejecución diferida:
```python
# 1. Instanciamos las funciones especializadas
mi_pizzeria = fabrica_de_maquinas("pizza")
mi_heladeria = fabrica_de_maquinas("helado")

# 2. Ejecutamos las funciones retornadas
print(mi_pizzeria(5))
print(mi_heladeria(3))
```
**Resultado en consola:**
```text
🍕 Saliendo 5 pizzas calientes!
🍦 Sirviendo 3 helados fríos!
```
**Conclusión:** Hemos logrado crear un sistema generador de funciones, permitiendo instanciar comportamientos específicos bajo demanda.

---

## Closures: Encapsulamiento de Estado y Memoria Funcional

### 1. El Concepto en la Vida Real
Imagina un sistema de tarjetas VIP para clientes. Cuando se emite la tarjeta, esta debe retener permanentemente los datos del cliente y su nivel de descuento, sin necesidad de consultar una base de datos externa en cada compra.
```python
# Estado base sin aplicar el concepto
descuento_global = 20
nombre_global = "Dano"

def comprar_sin_memoria(monto_factura):
    descuento = monto_factura * (descuento_global / 100)
    return f"Hola {nombre_global}, tu total es ${monto_factura - descuento}"
```
El problema con este enfoque es que depende de variables globales, lo que impide manejar múltiples clientes simultáneamente sin sobrescribir datos. Aquí es donde interviene el **Closure** para resolverlo mediante la retención del ámbito léxico (las variables locales) en la memoria de la función interna, incluso después de que la función externa haya finalizado.

### 2. Anatomía del Código Paso a Paso
Esta es la estructura interna detallada de la implementación:
```python
def crear_tarjeta_vip(nombre_cliente, porcentaje_descuento):
    # <-- Paso A: Estas variables locales forman el "estado" que será encapsulado
    
    def comprar(monto_factura):
        # <-- Paso B: La función interna accede y RECUERDA las variables del ámbito superior
        descuento = monto_factura * (porcentaje_descuento / 100)
        total = monto_factura - descuento
        return f"Hola {nombre_cliente}, tu total con {porcentaje_descuento}% de descuento es ${total}"
        
    # <-- Paso C: Se retorna el closure (la función interna con su estado adjunto)
    return comprar
```

### 3. Implementación Práctica y Resultado
Al aplicar la sintaxis de instanciación de closures, el intérprete crea entornos aislados para cada ejecución:
```python
# Creamos dos closures con estados independientes
tarjeta_dano = crear_tarjeta_vip("Dano", 20)
tarjeta_ana = crear_tarjeta_vip("Ana", 50)

# Ejecutamos las funciones; cada una retiene su propio estado
print(tarjeta_dano(100))
print(tarjeta_ana(100))
```
**Resultado en consola:**
```text
Hola Dano, tu total con 20% de descuento es $80.0
Hola Ana, tu total con 50% de descuento es $50.0
```
**Conclusión:** Hemos logrado encapsular datos dentro de una función, creando instancias funcionales con memoria persistente y aislada.

---

## Decoradores: Extensión de Comportamiento mediante Envoltorios

### 1. El Concepto en la Vida Real
Imagina una línea de ensamblaje donde un cocinero prepara hamburguesas. Si el restaurante decide ofrecer un servicio de "empaquetado para regalo", podrías obligar al cocinero a aprender a envolver regalos.
```python
# Estado base sin aplicar el concepto
def preparar_hamburguesa():
    print("🍔 Cocinando carne, poniendo queso y pan...")
    print("🎁 Preparando caja de regalo...") # Lógica intrusiva
    print("🎀 Poniendo un lazo rojo y tarjeta de felicidades!") # Lógica intrusiva
    return "Hamburguesa lista"
```
El problema con este enfoque es que viola el principio de responsabilidad única; modifica el código original para añadir una funcionalidad secundaria. Aquí es donde interviene el **Decorador** para resolverlo mediante un patrón de diseño estructural que envuelve la función original, añadiendo comportamiento antes y/o después sin alterar su código fuente.

### 2. Anatomía del Código Paso a Paso
Esta es la estructura interna detallada de la implementación:
```python
def empaquetado_regalo(funcion_cocinero): # 1. La función superior recibe la función objetivo
    
    def wrapper(): # <-- Paso A: Se define la función envoltorio (wrapper)
        print("🎁 Preparando caja de regalo...") # <-- Paso B: Lógica previa
        
        comida = funcion_cocinero() # <-- Paso C: Invocación de la función original
        
        print("🎀 Poniendo un lazo rojo y tarjeta de felicidades!") # <-- Paso D: Lógica posterior
        return comida
        
    return wrapper # <-- Paso E: Retorno del envoltorio
```

### 3. Implementación Práctica y Resultado
Al aplicar la sintaxis `@decorador` (azúcar sintáctico), el intérprete ejecuta la lógica envolvente de forma transparente:
```python
@empaquetado_regalo
def preparar_hamburguesa():
    print("🍔 Cocinando carne, poniendo queso y pan...")
    return "Hamburguesa lista"

# La invocación parece normal, pero ejecuta el flujo decorado
resultado = preparar_hamburguesa()
```
**Resultado en consola:**
```text
🎁 Preparando caja de regalo...
🍔 Cocinando carne, poniendo queso y pan...
🎀 Poniendo un lazo rojo y tarjeta de felicidades!
```
**Conclusión:** Hemos logrado extender el comportamiento de la función original de forma modular, mantenible y no intrusiva.

---

## Decoradores Avanzados: Parámetros, Apilamiento y Preservación de Identidad

### 1. El Concepto en la Vida Real
Imagina que ahora el sistema de pedidos requiere verificar el pago antes de cocinar, pero los pedidos varían en cantidad de detalles (plato, mesa, extras). Además, al auditar el sistema, necesitas saber exactamente qué función se ejecutó, pero los decoradores básicos enmascaran el nombre de la función original bajo el nombre genérico `wrapper`.
```python
# Estado base sin aplicar el concepto
def verificar_pago_basico(funcion):
    def wrapper(): # Falla si la función original requiere argumentos
        print("Verificando pago...")
        return funcion() # No pasa argumentos
    return wrapper
```
El problema con este enfoque es la rigidez ante firmas de funciones dinámicas y la pérdida de metadatos (nombre y docstring). Aquí es donde intervienen los **Decoradores Avanzados** para resolverlo mediante el uso de empaquetado de argumentos (`*args`, `**kwargs`) y la utilidad `@wraps` de la biblioteca estándar.

### 2. Anatomía del Código Paso a Paso
Esta es la estructura interna detallada de la implementación:
```python
from functools import wraps # 0. Importamos la utilidad para preservar los metadatos

def verificar_pago(funcion_cocinero):
    @wraps(funcion_cocinero) # <-- Paso A: Protege la identidad (nombre y docstring) de la función original
    def wrapper(*args, **kwargs): # <-- Paso B: Acepta cualquier combinación de argumentos posicionales y nombrados
        print("💳 Cajero: Verificando pago...")
        print("✅ Pago aprobado. Enviando orden a la cocina.")
        
        # <-- Paso C: Desempaqueta y transfiere los argumentos intactos a la función original
        return funcion_cocinero(*args, **kwargs) 
    return wrapper

# Decorador secundario para demostrar apilamiento
def empaquetado_regalo(funcion):
    @wraps(funcion)
    def wrapper(*args, **kwargs):
        resultado = funcion(*args, **kwargs)
        return f"{resultado} + 🎁 Empaque de regalo"
    return wrapper
```

### 3. Implementación Práctica y Resultado
Al aplicar la sintaxis de apilamiento múltiple, el intérprete evalúa los decoradores de abajo hacia arriba (Bottom-up):
```python
@verificar_pago      # 2° Se ejecuta el decorador exterior
@empaquetado_regalo  # 1° Se ejecuta el decorador más cercano a la función
def preparar_orden(plato, mesa, extra=None):
    if extra:
        return f"Cocinando {plato} con {extra} para la mesa {mesa}"
    return f"Cocinando {plato} para la mesa {mesa}"

# Invocación con argumentos posicionales y nombrados
print(preparar_orden("Ravioles", mesa=4, extra="Queso extra"))
print(f"Nombre interno de la función: {preparar_orden.__name__}")
```
**Resultado en consola:**
```text
💳 Cajero: Verificando pago...
✅ Pago aprobado. Enviando orden a la cocina.
Cocinando Ravioles con Queso extra para la mesa 4 + 🎁 Empaque de regalo
Nombre interno de la función: preparar_orden
```
**Conclusión:** Hemos logrado crear decoradores universales que soportan cualquier firma de función, permiten composición múltiple y mantienen intacta la trazabilidad del código.

---

## Map, Filter y Reduce: Procesamiento Funcional de Colecciones

### 1. El Concepto en la Vida Real
Imagina el cierre de caja de un restaurante: necesitas convertir los precios del inventario a moneda local, descartar los pedidos cancelados o erróneos, y finalmente sumar todas las ganancias para obtener el balance del día.
```python
# Estado base sin aplicar el concepto
precios_usd = [10, 15, 20]
precios_locales = []
for precio in precios_usd: # Iteración imperativa para transformar
    precios_locales.append(precio * 1000)
```
El problema con este enfoque es que requiere múltiples bucles `for` y variables de estado temporales, lo que hace el código verboso. Aquí es donde intervienen **Map, Filter y Reduce** para resolverlo mediante paradigmas de programación funcional, apoyándose en funciones anónimas (`lambda`) limitadas estrictamente a una única expresión, y utilizando evaluación perezosa (Lazy Objects) para optimizar la memoria.

### 2. Anatomía del Código Paso a Paso
Esta es la estructura interna detallada de la implementación:
```python
from functools import reduce # 0. Importamos reduce (requerido en Python 3)

# Colecciones de datos iniciales
precios_usd = [10, 15, 20]
pedidos = ["Pizza Pepperoni", "Pizza con Piña", "Hamburguesa", "Tacos con Piña"]
ganancias_por_mesa = [1500, 3200, 800, 4100]

# <-- Paso A: MAP aplica una transformación a cada elemento. 
# Devuelve un iterador perezoso (<map object>), requiere list() para materializarse.
iterador_map = map(lambda precio: precio * 1000, precios_usd)

# <-- Paso B: FILTER evalúa una condición booleana por elemento y descarta los False.
# También devuelve un iterador perezoso (<filter object>).
iterador_filter = filter(lambda p: "Piña" not in p, pedidos)

# <-- Paso C: REDUCE aplica una función acumulativa de izquierda a derecha.
# Toma el acumulador y el valor actual, reduciendo la lista a un único valor final.
valor_reducido = reduce(lambda acumulador, valor_actual: acumulador + valor_actual, ganancias_por_mesa)
```

### 3. Implementación Práctica y Resultado
Al aplicar la sintaxis funcional, el intérprete procesa las colecciones de forma declarativa y altamente optimizada:
```python
# 1. Transformación (Map)
precios_locales = list(map(lambda precio: precio * 1000, precios_usd))
print(f"Precios transformados: {precios_locales}")

# 2. Filtrado (Filter)
pedidos_aceptados = list(filter(lambda p: "Piña" not in p, pedidos))
print(f"Pedidos válidos: {pedidos_aceptados}")

# 3. Acumulación (Reduce)
total_dia = reduce(lambda acc, val: acc + val, ganancias_por_mesa)
print(f"Ganancia total acumulada: {total_dia}")
```
**Resultado en consola:**
```text
Precios transformados: [10000, 15000, 20000]
Pedidos válidos: ['Pizza Pepperoni', 'Hamburguesa']
Ganancia total acumulada: 9600
```
**Conclusión:** Hemos logrado procesar, depurar y consolidar estructuras de datos complejas utilizando un enfoque funcional, eliminando bucles explícitos y mejorando la expresividad del código.