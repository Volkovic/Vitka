# Día 16 - datetime en Python

## Python *datetime*

Python tiene un módulo _datetime_ para trabajar con fechas y horas.

```py
import datetime
print(dir(datetime))
['MAXYEAR', 'MINYEAR', '__builtins__', '__cached__', '__doc__', '__file__', '__loader__', '__name__', '__package__', '__spec__', 'date', 'datetime', 'datetime_CAPI', 'sys', 'time', 'timedelta', 'timezone', 'tzinfo']
```

Con los comandos incorporados dir o help puedes ver las funciones disponibles de un módulo. Como ves, el módulo datetime tiene muchas clases y funciones; nos centraremos en _date_, _datetime_, _time_ y _timedelta_. Veámoslas una a una.


---

### Obtener información de *datetime*

```py
from datetime import datetime
now = datetime.now()
print(now)                      # 2021-07-08 07:34:46.549883
day = now.day                   # 8
month = now.month               # 7
year = now.year                 # 2021
hour = now.hour                 # 7
minute = now.minute             # 38
second = now.second
timestamp = now.timestamp()
print(day, month, year, hour, minute)
print('timestamp', timestamp)
print(f'{day}/{month}/{year}, {hour}:{minute}')  # 8/7/2021, 7:38
```

El timestamp, o Unix timestamp, es el número de segundos transcurridos desde el 1 de enero de 1970 UTC.


---

### Formatear fecha con *strftime*

```py
from datetime import datetime
new_year = datetime(2020, 1, 1)
print(new_year)      # 2020-01-01 00:00:00
day = new_year.day
month = new_year.month
year = new_year.year
hour = new_year.hour
minute = new_year.minute
second = new_year.second
print(day, month, year, hour, minute) #1 1 2020 0 0
print(f'{day}/{month}/{year}, {hour}:{minute}')  # 1/1/2020, 0:0

```

Usa el método *strftime* para formatear fechas y horas; la documentación de formatos está [aquí](https://strftime.org/).

```py
from datetime import datetime
# fecha y hora actual
now = datetime.now()
t = now.strftime("%H:%M:%S")
print("Hora:", t)
time_one = now.strftime("%m/%d/%Y, %H:%M:%S")
# formato mm/dd/YY H:M:S
print("Formato uno:", time_one)
time_two = now.strftime("%d/%m/%Y, %H:%M:%S")
# formato dd/mm/YY H:M:S
print("Formato dos:", time_two)
```

```sh
Hora: 01:05:01
Formato uno: 12/05/2019, 01:05:01
Formato dos: 05/12/2019, 01:05:01
```

A continuación se muestran los símbolos de _strftime_ usados para formatear tiempos, como se ve en la imagen de referencia.

![strftime](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/strftime.png)


---

### Convertir cadena a fecha con *strptime*
Aquí hay una [guía](https://www.programiz.com/python-programming/datetime/strptimet) que ayuda a entender los formatos.

```py
from datetime import datetime
date_string = "5 December, 2019"
print("date_string =", date_string)
date_object = datetime.strptime(date_string, "%d %B, %Y")
print("date_object =", date_object)
```

```sh
date_string = 5 December, 2019
date_object = 2019-12-05 00:00:00
```


---

### Usar *date* desde *datetime*

```py
from datetime import date
d = date(2020, 1, 1)
print(d)
print('Fecha actual:', d.today())    # fecha actual
# objeto date de hoy
today = date.today()
print("Año actual:", today.year)   # 2019
print("Mes actual:", today.month) # 12
print("Día actual:", today.day)     # 5
```


---

### Representar tiempo con objetos *time*

```py
from datetime import time
# time(hour = 0, minute = 0, second = 0)
a = time()
print("a =", a)
# time(hour, minute y second)
b = time(10, 30, 50)
print("b =", b)
# time(hour, minute y second)
c = time(hour=10, minute=30, second=50)
print("c =", c)
# time(hour, minute, second, microsecond)
d = time(10, 30, 50, 200555)
print("d =", d)
```

Salida:  
a = 00:00:00  
b = 10:30:50  
c = 10:30:50  
d = 10:30:50.200555


---

### Calcular la diferencia entre dos puntos en el tiempo

```py
today = date(year=2019, month=12, day=5)
new_year = date(year=2020, month=1, day=1)
time_left_for_newyear = new_year - today
# Tiempo hasta año nuevo:  27 days, 0:00:00
print('Tiempo hasta año nuevo: ', time_left_for_newyear)

t1 = datetime(year = 2019, month = 12, day = 5, hour = 0, minute = 59, second = 0)
t2 = datetime(year = 2020, month = 1, day = 1, hour = 0, minute = 0, second = 0)
diff = t2 - t1
print('Tiempo hasta año nuevo:', diff) # Tiempo hasta año nuevo: 26 days, 23:01:00
```


---

### Calcular diferencias con *timedelta*

```py
from datetime import timedelta
t1 = timedelta(weeks=12, days=10, hours=4, seconds=20)
t2 = timedelta(days=7, hours=5, minutes=3, seconds=30)
t3 = t1 - t2
print("t3 =", t3)
```

```sh
date_string = 5 December, 2019
date_object = 2019-12-05 00:00:00
t3 = 86 days, 22:56:50
```



---