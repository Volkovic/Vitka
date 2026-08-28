> **Roadmap:** Fase 4: Gestión de Datos y Estado -> Estado Global (Context API)

# Contexto

# Contexto

El contexto permite pasar datos a través del árbol de componentes sin tener que pasar accesorios manualmente a cada componente secundario en cada nivel.

En React, los datos se pasan de arriba hacia abajo (de padre a hijo) a través de accesorios, pero esto puede resultar engorroso para ciertos tipos de accesorios (por ejemplo, preferencia de configuración regional, tema de interfaz de usuario) que son requeridos por muchos componentes dentro de una aplicación. El contexto proporciona una manera de compartir valores como estos entre componentes sin tener que pasar explícitamente un accesorio por cada nivel del árbol.

***

## Cuándo utilizar el contexto

El contexto está diseñado para compartir datos que pueden considerarse "globales" para un árbol de componentes de React, como el usuario autenticado actual, el tema o el idioma preferido. Por ejemplo, en el código siguiente, pasamos manualmente un accesorio de "tema" para darle estilo al componente Botón:

El texto anterior se tomó de [documentación de reacción](https://reactjs.org/docs/context.html) sin ningún cambio.

Parece que la documentación de reacción tiene bastante buena información sobre el contexto, puede consultar la [documentación de reacción](https://reactjs.org/docs/context.html).
