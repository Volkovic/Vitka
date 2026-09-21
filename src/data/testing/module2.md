# Módulo 2: Pruebas de Componentes (React Testing Library)

## La Filosofía de RTL

En el ecosistema de React, probar componentes visuales (UI) siempre fue un dolor de cabeza. Hace años, la herramienta estándar era *Enzyme*. Esta librería te permitía escribir pruebas enfocadas en los detalles internos técnicos de tu componente (ej. "Afirmo que el estado interno `count` ahora es 2", o "Afirmo que el componente hijo llamado `<BotonCustom>` recibió la prop `color='red'`").

Esta filosofía probó ser un desastre a largo plazo. ¿Por qué? Porque si tú refactorizabas tu código cambiando el nombre de un estado interno, tus pruebas fallaban estrepitosamente, aunque la aplicación se viera visualmente idéntica y funcionara perfecto para el usuario final. Las pruebas eran frágiles.

Fue entonces cuando Kent C. Dodds creó **React Testing Library (RTL)**, con un principio rector revolucionario:
> *"Cuanto más se parezcan tus pruebas a la forma en que los usuarios utilizan tu software, más confianza te darán".*

RTL te prohíbe probar el "estado interno" o las "props" de React. A un usuario de tu web no le importa si usaste `useState` o Redux. Al usuario solo le importa ver un botón que dice "Comprar" y que, al hacerle clic, aparezca un texto que diga "Gracias por su compra".
Con RTL probaremos exactamente eso: lo que el usuario ve y hace (el DOM renderizado real), ignorando por completo la implementación técnica interna.

---

## Renderizado y Búsqueda (Queries)

Para probar un componente, el primer paso es dibujarlo en el DOM virtual que Jest nos provee. Para esto usamos la función `render()`.
Una vez dibujado, necesitamos el objeto global `screen` para inspeccionar la pantalla e interactuar con ella.

```jsx
import { render, screen } from '@testing-library/react';
import MiComponente from './MiComponente';

test('muestra el mensaje de bienvenida', () => {
  // 1. Arrange: Renderizamos el componente aislado
  render(<MiComponente nombre="Ana" />);

  // 2. Act & Assert: Buscamos el elemento en la "pantalla"
  const elementoTexto = screen.getByText('Hola Ana, bienvenida.');
  
  // Jest + RTL matchers extendidos (jest-dom)
  expect(elementoTexto).toBeInTheDocument();
});
```

El objeto `screen` tiene métodos llamados **Queries (Consultas)** para encontrar cosas en la pantalla, tal como los ojos de un humano buscarían. La estructura de estos métodos sigue un patrón: `(Comportamiento)(Elemento)By(Criterio)`.

- Comportamientos: `get` (encuentra o falla instantáneamente), `query` (encuentra o devuelve null, útil para asertar que algo NO existe), `find` (encuentra pero de forma asíncrona, esperando a que aparezca).
- Criterio: `ByText` (texto visible), `ByRole` (rol de accesibilidad), `ByPlaceholderText` (útil para inputs).

---

## Prioridad de Consultas (Accessibility First)

Al principio, usarás `getByText` para todo. Pero RTL tiene una **jerarquía estricta y recomendada** de qué Queries debes intentar usar primero. Esta jerarquía está diseñada explícitamente para obligarte a escribir código accesible (A11y) para personas con discapacidades que usan lectores de pantalla.

**1. La joya de la corona: `getByRole`**
Debería ser tu opción predeterminada para el 95% de los casos. Busca elementos por su rol implícito en HTML5 o su atributo aria-role.
`screen.getByRole('button', { name: /enviar/i })`
Si tu botón es un `<div>` pintado para que parezca botón, `getByRole` no lo encontrará. Te forzará a cambiar tu sucio `<div>` por un `<button>` semántico, mejorando tu código real en el proceso.

**2. Elementos semánticos visuales:**
- `getByPlaceholderText` (Para inputs sin Label explícito, aunque los Labels son mejores).
- `getByAltText` (Para verificar imágenes `<img>`).
- `getByTitle` (Para atributos title o SVG).

**3. La última alternativa: `getByTestId`**
A veces, un elemento no tiene texto ni rol (ej. una gráfica genérica animada). Como último recurso, el programador puede ponerle un atributo HTML especial `<div data-testid="grafica-hero">` en el código fuente, y atraparlo en el test con `screen.getByTestId('grafica-hero')`. Se considera un "code smell" usarlo demasiado porque el usuario real no puede ver los test-ids.

---

## Interacción de Usuario (User Event)

Dibujar cosas estáticas está bien, pero las aplicaciones web son interactivas. Necesitamos hacer clic, escribir en campos de texto, presionar "Enter" o simular un Hover.

RTL viene con una herramienta llamada `fireEvent`, que despacha eventos crudos del navegador de forma instantánea. Sin embargo, la forma moderna y recomendada es instalar el paquete adicional **`@testing-library/user-event`**.

¿Cuál es la diferencia? Si usas `fireEvent.change()` en un input, solo dispara el evento `onChange`.
Pero si un usuario real escribe en un input, pasan muchas cosas: el input gana el "foco" (`onFocus`), el usuario presiona una tecla (`onKeyDown`), la suelta (`onKeyUp`), el valor cambia, etc.
El paquete `userEvent` simula la interacción humana con extrema fidelidad disparando toda la cadena de eventos real. Es asíncrono.

```jsx
import userEvent from '@testing-library/user-event';

test('habilita el boton al llenar el formulario', async () => {
  // Preparamos al simulador de usuario
  const user = userEvent.setup();
  render(<FormularioLogin />);

  const inputUsuario = screen.getByRole('textbox', { name: /usuario/i });
  const botonSubmit = screen.getByRole('button', { name: /entrar/i });

  // El botón debería estar bloqueado al inicio
  expect(botonSubmit).toBeDisabled();

  // El usuario "escribe" en el input
  await user.type(inputUsuario, 'Dano123');

  // Ahora el botón debería haberse habilitado
  expect(botonSubmit).not.toBeDisabled();
  
  // Hacemos clic
  await user.click(botonSubmit);
});
```

---

## Testing Asíncrono (Esperando a las APIs)

El escenario más complejo en pruebas de componentes es el asincronismo.
Imagina un componente `<ListaUsuarios>` que al montarse (en un `useEffect`) hace un fetch a una API. Mientras espera, muestra "Cargando...". Cuando la API responde, muestra la lista (ej. "Juan", "Pedro").

Si intentas hacer `screen.getByText('Juan')` justo después del `render()`, tu prueba fallará porque en ese instante milisegundo cero, la pantalla dice "Cargando...". La respuesta de la API no ha llegado.

Para lidiar con el tiempo, usamos las queries **`findBy`**. 
A diferencia de `getBy`, los métodos `findBy` devuelven una Promesa y esperan pacientemente (hasta 1000 milisegundos, re-evaluando constantemente el DOM) a que el elemento aparezca en pantalla.

```jsx
// 1. Mockeamos la API para que no haga llamadas reales y responda rápido
jest.mock('../servicios/api');
import { obtenerUsuarios } from '../servicios/api';

test('muestra los usuarios tras cargar', async () => {
  obtenerUsuarios.mockResolvedValue(['Juan', 'Pedro']);

  render(<ListaUsuarios />);

  // En el instante 0, podemos asertar que está el loader
  expect(screen.getByText(/cargando/i)).toBeInTheDocument();

  // Esperamos de forma asíncrona a que aparezca 'Juan' en el DOM
  const elementoJuan = await screen.findByText('Juan');
  
  expect(elementoJuan).toBeInTheDocument();
  // Asertamos que el loader ya no está (usando 'queryBy' para evitar que lance error)
  expect(screen.queryByText(/cargando/i)).not.toBeInTheDocument();
});
```

Usando los `findBy` (y la función auxiliar `waitFor()`), puedes probar aplicaciones React asíncronas complejas, manteniéndote fiel a la filosofía de Kent C. Dodds: si interactúas con tu DOM en los tests de la misma manera que lo hace el usuario, tendrás pruebas sólidas, inquebrantables e invulnerables a refactorizaciones internas.
