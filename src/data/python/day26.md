# 30 días de desafío de programación en Python: Día 26 - Programación web con Python

## Programación web con Python

Python es un lenguaje de programación versátil que se puede utilizar para una variedad de propósitos. En esta sección, veremos cómo usar Python para el desarrollo web. Python tiene muchos marcos web disponibles. Django y Flask son los más populares. Hoy, aprenderemos a usar Flask para el desarrollo web.

### Flask

Flask es un marco de desarrollo web escrito en Python. Flask utiliza el motor de plantillas Jinja2. Flask también se puede usar con otras bibliotecas modernas de frontend como React.

Si aún no has instalado el paquete virtualenv, instálalo primero. Un entorno virtual permitirá aislar las dependencias del proyecto de las dependencias de la máquina local.

#### Estructura de carpetas

Después de completar todos los pasos, la estructura de archivos de tu proyecto debería ser la siguiente:

```sh
├── Procfile
├── app.py
├── env
│   ├── bin
├── requirements.txt
├── static
│   └── css
│       └── main.css
└── templates
    ├── about.html
    ├── home.html
    ├── layout.html
    ├── post.html
    └── result.html
```


---

### Configurar el proyecto

Comienza a usar Flask siguiendo estos pasos.

Paso 1: Instala virtualenv con el siguiente comando.

```sh
pip install virtualenv
```

Paso 2:

```sh
asabeneh@Asabeneh:~/Desktop$ mkdir python_for_web
asabeneh@Asabeneh:~/Desktop$ cd python_for_web/
asabeneh@Asabeneh:~/Desktop/python_for_web$ virtualenv venv
asabeneh@Asabeneh:~/Desktop/python_for_web$ source venv/bin/activate
(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ pip freeze
(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ pip install Flask
(env) asabeneh@Asabeneh:~/Desktop/python_for_web$ pip freeze
Click==7.0
Flask==1.1.1
itsdangerous==1.1.0
Jinja2==2.10.3
MarkupSafe==1.1.1
Werkzeug==0.16.0
(env) asabeneh@Asabeneh:~/Desktop/python_for_web$
```

Hemos creado un directorio de proyecto llamado python_for_web. Dentro del proyecto, hemos creado un entorno virtual llamado *venv*, que puede tener cualquier nombre. Luego, activamos el entorno virtual. Usamos pip freeze para verificar los paquetes instalados en el directorio del proyecto. El resultado de pip freeze está vacío porque aún no se han instalado paquetes.

Ahora, creemos el archivo app.py en el directorio del proyecto y escribamos el siguiente código. El archivo app.py será el archivo principal del proyecto. El siguiente código contiene el módulo flask y el módulo os.


---

### Crear rutas

Ruta de inicio.

```py
# importar flask
from flask import Flask
import os # importar el módulo del sistema operativo

app = Flask(__name__)

@app.route('/') # este decorador crea la ruta de inicio
def home ():
    return '<h1>Bienvenido</h1>'

@app.route('/about')
def about():
    return '<h1>Acerca de nosotros</h1>'


if __name__ == '__main__':
    # usamos variables de entorno para despliegue
    # funciona tanto para producción como para desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

Para ejecutar la aplicación flask, ingresa python app.py en el directorio principal de la aplicación flask.

Después de ejecutar _python app.py_, verifica el puerto 5000 de tu localhost.

Agreguemos una ruta adicional creando la ruta "acerca de".

```py
# importar flask
from flask import Flask
import os # importar el módulo del sistema operativo

app = Flask(__name__)

@app.route('/') # este decorador crea la ruta de inicio
def home ():
    return '<h1>Bienvenido</h1>'

@app.route('/about')
def about():
    return '<h1>Acerca de nosotros</h1>'

if __name__ == '__main__':
    # usamos variables de entorno para despliegue
    # funciona tanto para producción como para desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

Ahora, hemos agregado la ruta acerca de en el código anterior. ¿Pero qué pasa si queremos renderizar un archivo HTML en lugar de una cadena? Podemos renderizar un archivo HTML usando la función *render_template*. Creamos una carpeta llamada templates en el directorio del proyecto y dentro de ella, creamos home.html y about.html. También importamos *render_template* desde flask.


---

### Crear plantillas

Crea archivos HTML dentro de la carpeta templates.

home.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Página principal</title>
  </head>

  <body>
    <h1>Bienvenido de vuelta</h1>
  </body>
</html>
```

about.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Acerca</title>
  </head>

  <body>
    <h1>Acerca de nosotros</h1>
  </body>
</html>
```


---

### Script de Python (con render_template)

app.py

```py
# importar flask
from flask import Flask, render_template
import os # importar el módulo del sistema operativo

app = Flask(__name__)

@app.route('/') # este decorador crea la ruta de inicio
def home ():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    # usamos variables de entorno para despliegue
    # funciona tanto para producción como para desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

Como puedes ver, para acceder a diferentes páginas o navegar, necesitamos un sistema de navegación. Agreguemos un enlace para cada página, o creemos un diseño que usemos para cada página.


---

### Navegación

```html
<ul>
  <li><a href="/">Inicio</a></li>
  <li><a href="/about">Acerca</a></li>
</ul>
```

Ahora, podemos navegar entre páginas usando los enlaces anteriores. Creamos una página adicional para manejar los datos del formulario. Puedes nombrarla como quieras, yo prefiero llamarla post.html.

Podemos inyectar datos en el archivo HTML usando el motor de plantillas Jinja2.

```py
# importar flask
from flask import Flask, render_template, request, redirect, url_for
import os # importar el módulo del sistema operativo

app = Flask(__name__)

@app.route('/') # este decorador crea la ruta de inicio
def home ():
    techs = ['HTML', 'CSS', 'Flask', 'Python']
    name = '30 días de desafío de programación en Python'
    return render_template('home.html', techs=techs, name=name, title='Página principal')

@app.route('/about')
def about():
    name = '30 días de desafío de programación en Python'
    return render_template('about.html', name=name, title='Acerca de nosotros')

@app.route('/post')
def post():
    name = 'Artículos sobre programación'
    path = request.path
    return render_template('post.html', name=name, path=path, title='Artículos')

if __name__ == '__main__':
    # usamos variables de entorno para despliegue
    # funciona tanto para producción como para desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

home.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>

  <body>
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/about">Acerca</a></li>
      <li><a href="/post">Publicaciones</a></li>
    </ul>
    <h1>Bienvenido de vuelta a {{name}}</h1>
    <ul>
      {% for tech in techs %}
      <li>{{tech}}</li>
      {% endfor %}
    </ul>
  </body>
</html>
```

about.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>

  <body>
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/about">Acerca</a></li>
      <li><a href="/post">Publicaciones</a></li>
    </ul>
    <h1>Acerca de {{name}}</h1>
  </body>
</html>
```

post.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>

  <body>
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/about">Acerca</a></li>
      <li><a href="/post">Publicaciones</a></li>
    </ul>
    <h1>{{name}}</h1>
    <p>Ruta actual: {{path}}</p>
    <form action="/result" method="POST">
      <div>
        <input
          type="text"
          name="first_name"
          placeholder="Nombre"
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="last_name"
          placeholder="Apellido"
          required
        />
      </div>
      <div>
        <input type="text" name="old_job" placeholder="Trabajo anterior" />
      </div>
      <div>
        <input type="text" name="current_job" placeholder="Trabajo actual" />
      </div>
      <div>
        <input type="text" name="country" placeholder="País" />
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  </body>
</html>
```

Ahora, agreguemos una ruta que procese los datos del formulario. Usamos el método POST porque recibiremos datos del formulario.

```py
# importar flask
from flask import Flask, render_template, request, redirect, url_for
import os # importar el módulo del sistema operativo

app = Flask(__name__)

@app.route('/') # este decorador crea la ruta de inicio
def home():
    techs = ['HTML', 'CSS', 'Flask', 'Python']
    name = '30 días de desafío de programación en Python'
    return render_template('home.html', techs=techs, name=name, title='Página principal')

@app.route('/about')
def about():
    name = '30 días de desafío de programación en Python'
    return render_template('about.html', name=name, title='Acerca de nosotros')

@app.route('/post')
def post():
    name = 'Artículos'
    return render_template('post.html', name=name, title='Artículos')


@app.route('/result', methods=['POST'])
def result():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    old_job = request.form['old_job']
    current_job = request.form['current_job']
    country = request.form['country']
    print(first_name, last_name, old_job, current_job, country)
    result_data = {
        'first_name':first_name,
        'last_name':last_name,
        'old_job': old_job,
        'current_job': current_job,
        'country':country
    }
    return render_template('result.html', result_data = result_data, title= 'Resultado')

if __name__ == '__main__':
    # usamos variables de entorno para despliegue
    # funciona tanto para producción como para desarrollo
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
```

result.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>

  <body>
    <ul>
      <li><a href="/">Inicio</a></li>
      <li><a href="/about">Acerca</a></li>
      <li><a href="/post">Publicaciones</a></li>
    </ul>
    <h1>Datos del formulario</h1>

    <ul>
      <li>Nombre: {{result_data.first_name}}</li>
      <li>Apellido: {{result_data.last_name}}</li>
      <li>Trabajo anterior: {{result_data.old_job}}</li>
      <li>Trabajo actual: {{result_data.current_job}}</li>
      <li>País: {{result_data.country}}</li>
    </ul>
  </body>
</html>
```

En el mundo real, no repetiríamos el código HTML en todas las páginas. En su lugar, crearíamos una plantilla base y las demás heredarían de ella. Usemos la herencia (plantillas). Ahora, en lugar de tres archivos diferentes, necesitamos crear un archivo de diseño llamado layout.html. Luego, otros archivos heredarán de él.


---

### Crear plantilla base (layout)

layout.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://fonts.googleapis.com/css?family=Lato:300,400|Nunito:300,400|Raleway:300,400&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="{{ url_for('static', filename='css/main.css') }}"
    />
    {% if title %}
    <title>30 Días de Python - {{ title}}</title>
    {% else %}
    <title>30 Días de Python</title>
    {% endif %}
  </head>

  <body>
    <header>
      <div class="menu-container">
        <div>
          <a class="brand-name nav-link" href="/">30 Días de Python</a>
        </div>
        <ul class="nav-lists">
          <li class="nav-list">
            <a class="nav-link active" href="{{ url_for('home') }}">Inicio</a>
          </li>
          <li class="nav-list">
            <a class="nav-link active" href="{{ url_for('about') }}">Acerca</a>
          </li>
          <li class="nav-list">
            <a class="nav-link active" href="{{ url_for('post') }}">Publicaciones</a>
          </li>
        </ul>
      </div>
    </header>
    <main>
      {% block content %} {% endblock %}
    </main>
  </body>
</html>
```

En el diseño anterior, hemos creado una plantilla común que puede ser utilizada por todas las páginas que heredan de ella. Dentro del diseño, podemos ver los enlaces de navegación. Usamos las etiquetas {% block content %}{% endblock %} para permitir que las subplantillas agreguen contenido.

home.html

```html
{% extends 'layout.html' %} {% block content %}
<div class="container">
  <h1>Bienvenido de vuelta a {{name}}</h1>
  <p>
    Este proyecto fue construido usando las siguientes tecnologías:
    <span class="tech">Flask</span>, <span class="tech">Python</span>
    y <span class="tech">HTML</span>, <span class="tech">CSS</span>
  </p>
  <ul>
    {% for tech in techs %}
    <li class="tech">{{tech}}</li>

    {% endfor %}
  </ul>
</div>

{% endblock %}
```

about.html

```html
{% extends 'layout.html' %} {% block content %}
<div class="container">
  <h1>Acerca de {{name}}</h1>
  <p>
    Este desafío es un desafío de programación de 30 días diseñado para ayudarte a aprender el lenguaje de programación Python, resolviendo un problema de Python cada día.
  </p>
</div>
{% endblock %}
```

post.html

```html
{% extends 'layout.html' %} {% block content %}
<div class="container">
  <h1>{{name}}</h1>
  <p>{{path}}</p>
  <form action="/result" method="POST">
    <div>
      <input type="text" name="first_name" placeholder="Nombre" required />
    </div>
    <div>
      <input type="text" name="last_name" placeholder="Apellido" required />
    </div>
    <div>
      <input type="text" name="old_job" placeholder="Trabajo anterior" />
    </div>
    <div>
      <input type="text" name="current_job" placeholder="Trabajo actual" />
    </div>
    <div>
      <input type="text" name="country" placeholder="País" />
    </div>
    <div>
      <button type="submit">Enviar</button>
    </div>
  </form>
</div>

{% endblock %}
```

result.html

```html
{% extends 'layout.html' %} {% block content %}
<div class="container">
  <h1>Datos del formulario</h1>
  <ul>
    <li>Nombre: {{result_data.first_name}}</li>
    <li>Apellido: {{result_data.last_name}}</li>
    <li>Trabajo anterior: {{result_data.old_job}}</li>
    <li>Trabajo actual: {{result_data.current_job}}</li>
    <li>País: {{result_data.country}}</li>
  </ul>
</div>

{% endblock %}
```

#### Servir archivos estáticos

A continuación se muestra el archivo main.css, que colocaremos en el directorio static/css:

```css
/* === GENERAL === */
body {
  margin: 0;
  padding: 0;
  font-family: "Lato", sans-serif;
  background-color: #f0f8ea;
}

.container {
  max-width: 80%;
  margin: auto;
  padding: 30px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.tech {
  color: #5bbc2e;
}

/* === HEADER === */
header {
  background-color: #5bbc2e;
}

.menu-container {
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
}

.brand-name {
  color: white;
  font-weight: 800;
  font-size: 24px;
}

.nav-lists {
  display: flex;
}

.nav-list {
  margin-right: 15px;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-weight: 300;
}

/* === FORM === */

form {
  margin: 30px 0;
  border: 1px solid #ddd;
  padding: 30px;
  border-radius: 10px;
}

form > div {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: 0;
  font-size: 16px;
  box-sizing: border-box;
  margin-top: 5px;
}

button {
  padding: 12px 24px;
  border: 0;
  background-color: #5bbc2e;
  color: white;
  border-radius: 10px;
  font-size: 16px;
  outline: 0;
  cursor: pointer;
}

button:hover {
  background-color: #4b9c25;
}
```


---

### Despliegue

#### Crear cuenta en Heroku

Heroku ofrece un servicio de alojamiento gratuito. Si deseas desplegar una aplicación, debes tener una cuenta en Heroku.

#### Iniciar sesión en Heroku

```sh
asabeneh@Asabeneh:~/Desktop/python_for_web$ heroku login
heroku: Press any key to open up the browser to login or q to exit:
Opening browser to https://cli-auth.heroku.com/auth/cli/browser/ec0972d5-d8c6-4adf-b004-a42a22dd09a8
Logging in... done
Logged in as asabeneh@gmail.com
asabeneh@Asabeneh:~/Desktop/python_for_web$
```

#### Crear requirements y Procfile

Antes de desplegar la aplicación, necesitamos informar a Heroku qué dependencias instalar y cómo ejecutar la aplicación. Heroku utiliza el archivo requirements.txt para obtener información sobre las dependencias de la aplicación. Usa el comando pip freeze para listar todas las dependencias y sus versiones, y escríbelas en requirements.txt.

```sh
asabeneh@Asabeneh:~/Desktop/python_for_web$ pip freeze
Click==7.0
Flask==1.1.1
itsdangerous==1.1.0
Jinja2==2.10.3
MarkupSafe==1.1.1
Werkzeug==0.16.0
asabeneh@Asabeneh:~/Desktop/python_for_web$ pip freeze > requirements.txt
```

Procfile le dice a Heroku cómo ejecutar la aplicación. En este caso, usamos Gunicorn como servidor HTTP WSGI para ejecutar aplicaciones web en Python. Necesitamos agregar Gunicorn a nuestras dependencias.

```sh
asabeneh@Asabeneh:~/Desktop/python_for_web$ pip install gunicorn
asabeneh@Asabeneh:~/Desktop/python_for_web$ pip freeze > requirements.txt
```

Ahora, creemos un Procfile y agreguemos el siguiente contenido:

```sh
web: gunicorn app:app
```

#### Enviar el proyecto a Heroku

```sh
asabeneh@Asabeneh:~/Desktop/python_for_web$ heroku create 30-days-of-python-app
Creating ⬢ 30-days-of-python-app... done
https://30-days-of-python-app.herokuapp.com/ | https://git.heroku.com/30-days-of-python-app.git
asabeneh@Asabeneh:~/Desktop/python_for_web$ git init
Initialized empty Git repository in /home/asabeneh/Desktop/python_for_web/.git/
asabeneh@Asabeneh:~/Desktop/python_for_web$ heroku git:remote -a 30-days-of-python-app
set git remote heroku to https://git.heroku.com/30-days-of-python-app.git
asabeneh@Asabeneh:~/Desktop/python_for_web$ echo -e "venv\n.vscode" > .gitignore
asabeneh@Asabeneh:~/Desktop/python_for_web$ git add .
asabeneh@Asabeneh:~/Desktop/python_for_web$ git commit -m "primer aplicación web en python"
[master (root-commit) 9dfcc6a] primer aplicación web en python
 9 files changed, 403 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 Procfile
 create mode 100644 app.py
 create mode 100644 requirements.txt
 create mode 100644 static/css/main.css
 create mode 100644 templates/about.html
 create mode 100644 templates/home.html
 create mode 100644 templates/layout.html
 create mode 100644 templates/post.html
 create mode 100644 templates/result.html
asabeneh@Asabeneh:~/Desktop/python_for_web$ git push heroku master
Enumerating objects: 14, done.
Counting objects: 100% (14/14), done.
Delta compression using up to 2 threads
Compressing objects: 100% (12/12), done.
Writing objects: 100% (14/14), 6.08 KiB | 1.52 MiB/s, done.
Total 14 (delta 2), reused 0 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Python app detected
remote: -----> Installing python-3.6.10
remote: -----> Installing pip
remote: -----> Installing dependencies with Pipenv 2018.5.18…
remote:        Installing dependencies from Pipfile.lock (872ae5)…
remote: -----> Installing SQLite3
remote: -----> $ python manage.py collectstatic --noinput
remote:        Traceback (most recent call last):
remote:          File "manage.py", line 10, in <module>
remote:            from app import app
remote:        ModuleNotFoundError: No module named 'app'
remote:
remote:  !     Error while running '$ python manage.py collectstatic --noinput'.
remote:        See traceback above for details.
remote:
remote:        You may need to update application code to resolve this error.
remote:        Or, you can disable collectstatic for this application:
remote:
remote:           $ heroku config:set DISABLE_COLLECTSTATIC=1
remote:
remote:        https://devcenter.heroku.com/articles/django-assets
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote:
remote: -----> Compressing...
remote:        Done: 55.7M
remote: -----> Launching...
remote:        Released v3
remote:        https://30-days-of-python-app.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/30-days-of-python-app.git
 * [new branch]      master -> master
asabeneh@Asabeneh:~/Desktop/python_for_web$
```

Como puedes ver, hemos creado con éxito nuestra primera aplicación web, la hemos desplegado y la hemos alojado en Heroku. Puedes probar esta aplicación usando este [enlace](https://30-days-of-python-app.herokuapp.com/).

Sin más preámbulos, realicemos algunos ejercicios para reforzar lo aprendido.


---