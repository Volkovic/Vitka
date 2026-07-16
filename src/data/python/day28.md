# Día 28 - API

# Interfaz de Programación de Aplicaciones (API)

## API

API son las siglas de Application Programming Interface (Interfaz de Programación de Aplicaciones). El tipo de API que veremos en esta sección es la Web API.
Una Web API es una interfaz definida que permite la interacción entre organizaciones y las aplicaciones que consumen sus recursos; también actúa como un contrato de nivel de servicio (SLA) que especifica al proveedor de la funcionalidad y expone rutas o URLs de servicio a los usuarios de la API.

En el contexto del desarrollo web, una API se define como un conjunto de especificaciones, por ejemplo mensajes de solicitud HTTP y la estructura de los mensajes de respuesta, normalmente en formato XML o JSON (JavaScript Object Notation).

Las Web APIs han evolucionado de servicios web basados en SOAP y arquitecturas orientadas a servicios (SOA) hacia recursos web más directos en estilo REST.

Los servicios de redes sociales y las Web APIs han permitido a la comunidad web compartir contenido y datos entre comunidades y plataformas.

Con las APIs, el contenido creado en un lugar puede publicarse y actualizarse dinámicamente en múltiples lugares de la web.

Por ejemplo, la REST API de Twitter permite a los desarrolladores acceder a los datos principales de Twitter, mientras que la Search API ofrece formas de interactuar con los datos de búsqueda y tendencias de Twitter.

Muchas aplicaciones exponen endpoints de API. Algunos ejemplos de APIs son la [API de países](https://restcountries.eu/rest/v2/all) y la [API de razas de gatos](https://api.thecatapi.com/v1/breeds).

En esta sección presentaremos una API RESTful que utiliza métodos de solicitud HTTP como GET, PUT, POST y DELETE para manejar datos.


---

## Construir una API

Una API RESTful es una interfaz que usa solicitudes HTTP para GET, PUT, POST y DELETE datos. En secciones anteriores aprendimos Python, Flask y MongoDB. Aprovecharemos ese conocimiento para desarrollar una API RESTful usando Python, Flask y la base de datos MongoDB. Toda aplicación con operaciones CRUD (Crear, Leer, Actualizar, Eliminar) suele exponer una API para crear datos en la base, obtener datos, actualizarlos o borrarlos.

Para construir una API es útil entender el protocolo HTTP y el ciclo de solicitud-respuesta HTTP.

## HTTP (Protocolo de transferencia de hipertexto)

HTTP es el protocolo de comunicación establecido entre cliente y servidor. En este caso, el cliente es el navegador y el servidor es el lugar desde donde obtienes los datos. HTTP es un protocolo de red utilizado para transferir recursos en la web, como archivos HTML, imágenes, resultados de consultas, scripts u otros tipos de archivos.

El navegador actúa como cliente HTTP porque envía solicitudes al servidor HTTP (servidor web), y el servidor responde al cliente.


---

## Estructura de HTTP

HTTP utiliza un modelo cliente-servidor. El cliente HTTP abre una conexión y envía un mensaje de solicitud al servidor HTTP; el servidor HTTP devuelve un mensaje de respuesta, es decir, el recurso solicitado. Cuando el ciclo solicitud-respuesta termina, el servidor cierra la conexión.

![Ciclo de solicitud-respuesta HTTP](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/http_request_response_cycle.png)

Los formatos de los mensajes de solicitud y respuesta son similares. Ambos mensajes contienen:

- Una línea inicial
- Cero o más líneas de cabecera
- Una línea en blanco (es decir, un CRLF por separado)
- Un cuerpo de mensaje opcional (por ejemplo, un archivo, datos de formulario o la salida de una consulta)

Navega por este sitio para ver un ejemplo de mensaje de solicitud y respuesta: https://thirtydaysofpython-v1-final.herokuapp.com/. Este sitio está desplegado en un dyno gratuito de Heroku y puede no estar disponible en algunos meses debido al alto tráfico. Apoyar este proyecto ayuda a mantener el servidor activo.

![Cabeceras de solicitud y respuesta](https://raw.githubusercontent.com/Asabeneh/30-Days-Of-Python/master/images/request_response_header.png)


---

## Línea inicial de solicitud (línea de estado)

La línea inicial de la solicitud difiere de la de la respuesta.
La línea de solicitud tiene tres partes separadas por espacios:

- El nombre del método (GET, POST, HEAD)
- La ruta del recurso solicitado
- La versión HTTP utilizada. Por ejemplo: GET / HTTP/1.1

GET es el método HTTP más común, usado para obtener o leer recursos, mientras que POST es un método común para crear recursos.


---

### Línea inicial de respuesta (línea de estado)

La línea inicial de la respuesta, llamada línea de estado, también tiene tres partes separadas por espacios:

- La versión HTTP
- El código de estado de la respuesta, que indica el resultado de la solicitud, junto con una razón que describe dicho código. Ejemplos de líneas de estado:
  HTTP/1.0 200 OK
  o
  HTTP/1.0 404 Not Found
  **Nota:**

Los códigos de estado más comunes son:
200 OK: la solicitud fue exitosa y el recurso generado (por ejemplo un archivo o la salida de un script) se devuelve en el cuerpo del mensaje.
500 Error del servidor
La lista completa de códigos de estado HTTP puede encontrarse [aquí](https://httpstatuses.com/). También puedes verla [aquí](https://httpstatusdogs.com/).


---

### Campos de cabecera

Como se observa en la captura anterior, las líneas de cabecera proporcionan información sobre la solicitud o la respuesta, o sobre el objeto enviado en el cuerpo del mensaje.

```sh
GET / HTTP/1.1
Host: thirtydaysofpython-v1-final.herokuapp.com
Connection: keep-alive
Pragma: no-cache
Cache-Control: no-cache
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.79 Safari/537.36
Sec-Fetch-User: ?1
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Sec-Fetch-Site: same-origin
Sec-Fetch-Mode: navigate
Referer: https://thirtydaysofpython-v1-final.herokuapp.com/post
Accept-Encoding: gzip, deflate, br
Accept-Language: en-GB,en;q=0.9,fi-FI;q=0.8,fi;q=0.7,en-CA;q=0.6,en-US;q=0.5,fr;q=0.4
```


---

### Cuerpo del mensaje

Un mensaje HTTP puede llevar un cuerpo después de las cabeceras. En una respuesta, este es el lugar donde el recurso solicitado se devuelve al cliente (el uso más común del cuerpo). Si hay un error, puede contener texto explicativo. En una solicitud, es el lugar donde se envían los datos introducidos por el usuario o los archivos subidos al servidor.

Si un mensaje HTTP contiene un cuerpo, normalmente hay cabeceras que describen ese cuerpo, en particular:

Content-Type: indica el tipo MIME de los datos en el cuerpo (text/html, application/json, text/plain, text/css, image/gif).
Content-Length: indica el número de bytes en el cuerpo del mensaje.

### Métodos de solicitud

GET, POST, PUT y DELETE son los métodos HTTP que usaremos para implementar la API y las operaciones CRUD.

1. GET: el método GET se usa para recuperar y obtener información desde el servidor dado un URI. Las solicitudes GET deben únicamente recuperar datos y no producir otros efectos.
2. POST: las solicitudes POST se usan para crear datos y enviar datos al servidor, por ejemplo al crear una nueva entrada con un formulario HTML o subir archivos.
3. PUT: reemplaza la representación actual completa del recurso objetivo con la carga enviada; lo usamos para modificar o actualizar datos.
4. DELETE: elimina datos.


---