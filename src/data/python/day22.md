# Día 22 - Web scraping

## Web scraping con Python

### ¿Qué es el web scraping?

Internet está lleno de datos que pueden utilizarse para distintos fines. Para recopilar esos datos necesitamos saber cómo extraerlos de sitios web.

El web scraping es el proceso de extraer y recopilar datos de sitios web y almacenarlos en una máquina local o en una base de datos.

En esta sección usaremos los paquetes requests y BeautifulSoup (versión 4).

Para empezar necesitas _requests_,_beautifulsoup4_ y un _sitio web_:

```sh
pip install requests
pip install beautifulsoup4
```

Para hacer scraping necesitas conocimientos básicos de etiquetas HTML y selectores CSS. Usamos etiquetas HTML,clases y/o IDs para localizar contenido en la página.
Importemos requests y BeautifulSoup:

```py
import requests
from bs4 import BeautifulSoup
```

Declaremos una variable url con el sitio que queremos scrapear:

```py
import requests
from bs4 import BeautifulSoup
url = 'https://archive.ics.uci.edu/ml/datasets.php'

# Usamos requests.get para obtener datos de la URL
response = requests.get(url)
# Comprobar el estado
status = response.status_code
print(status) # 200 indica éxito
```

```sh
200
```

Parsear el contenido con BeautifulSoup:

```py
import requests
from bs4 import BeautifulSoup
url = 'https://archive.ics.uci.edu/ml/datasets.php'

response = requests.get(url)
content = response.content # obtenemos todo el contenido del sitio
soup = BeautifulSoup(content, 'html.parser') # BeautifulSoup nos permite parsear el HTML
print(soup.title) # <title>UCI Machine Learning Repository: Data Sets</title>
print(soup.title.get_text()) # UCI Machine Learning Repository: Data Sets
print(soup.body) # muestra el cuerpo completo de la página
print(response.status_code)

tables = soup.find_all('table', {'cellpadding':'3'})
# Localizamos tablas cuyo atributo cellpadding tenga el valor 3
# Podemos usar id, class o etiquetas HTML para seleccionar elementos; consulta la documentación de BeautifulSoup para más información
table = tables[0] # el resultado es una lista; tomamos el primer elemento
for td in table.find('tr').find_all('td'):
    print(td.text)
```

Si ejecutas este código verás que la extracción está incompleta.Puedes continuar para completarla,ya que forma parte del ejercicio 1.
Consulta la documentación de BeautifulSoup para más detalles: https://www.crummy.com/software/BeautifulSoup/bs4/doc/#quick-start



---