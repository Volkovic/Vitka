# Eventos

# Eventos

***

## ¿Qué es un evento?

Un evento es una acción o suceso reconocido por un software. Para aclarar un evento, usemos las actividades diarias que realizamos cuando usamos una computadora, como hacer clic en un botón, pasar el cursor sobre una imagen, presionar un teclado, desplazar la rueda del mouse, etc. En esta sección, nos centraremos solo en algunos de los eventos del mouse y el teclado. La documentación de reacción ya tiene una nota detallada sobre [eventos](https://reactjs.org/docs/handling-events.html).

Manejar eventos en React es muy similar a manejar elementos en elementos DOM usando JavaScript puro. Algunas de las diferencias de sintaxis entre el manejo de eventos en React y JavaScript puro:

* Los eventos de React se nombran usando camelCase, en lugar de minúsculas.
* Con JSX pasas una función como controlador de eventos, en lugar de una cadena.

Veamos algunos ejemplos para entender el manejo de eventos.

Manejo de eventos en HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>30 Days Of React App</title>
  </head>
  <body>
    <button>onclick="greetPeople()">Greet People</button>
    <script>
      const greetPeople = () => {
        alert('Welcome to 30 Days Of React Challenge')
      }
    </script>
  </body>
</html>
```

En React, es ligeramente diferente.

```js
import React from 'react'
// if it is functional components
const App = () => {
  const greetPeople = () => {
    alert('Welcome to 30 Days Of React Challenge')
  }
  return <button onClick={greetPeople}> </button>
}
```

```js
import React, { Component } from 'react'
// if it is functional components
class App extends Component {
  greetPeople = () => {
    alert('Welcome to 30 Days Of React Challenge')
  }
  render() {
    return <button onClick={this.greetPeople}> </button>
  }
}
```

Otra diferencia entre el evento HTML y React es que no puede devolver falso para evitar el comportamiento predeterminado en React. Debes llamar a preventDefault explícitamente. Por ejemplo, con HTML simple, para evitar que el enlace predeterminado abra una nueva página, puede escribir:

HTML simple

```html
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
```

Sin embargo, en React podría ser el siguiente:

```js
import React, { Component } from 'react'
// if it is functional components
class App extends Component {
  handleClick = () => {
    alert('Welcome to 30 Days Of React Challenge')
  }
  render() {
    return (
      <a href='#' onClick={this.handleClick}>
        Click me
      </a>
    )
  }
}
```

El manejo de eventos es un tema muy amplio y en este desafío nos centraremos en los tipos de eventos más comunes. Podremos utilizar los siguientes eventos de mouse y teclado.
*onMouseMove, onMouseEnter, onMouseLeave, onMouseOut, onClick, onKeyDown, onKeyPress, onKeyUp, onCopy, onCut, onDrag, onChange, onBlur, onInput, onSubmit*

Implementemos algunos eventos más de mouse y teclado.

```js
// index.js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    firstName: '',
    message: '',
    key: '',
  }
  handleClick = (e) => {
    // e gives an event object
    // check the value of e using console.log(e)
    this.setState({
      message: 'Welcome to the world of events',
    })
  }
  // triggered whenever the mouse moves
  handleMouseMove = (e) => {
    this.setState({ message: 'mouse is moving' })
  }
  // to get value when an input field changes a value
  handleChange = (e) => {
    this.setState({
      firstName: e.target.value,
      message: e.target.value,
    })
  }

  // to get keyboard key code when an input field is pressed
  // it works with input and textarea
  handleKeyPress = (e) => {
    this.setState({
      message:
        `${e.target.value} has been pressed and the keycode is` + e.charCode,
    })
  }
  // Blurring happens when a mouse leave an input field
  handleBlur = (e) => {
    this.setState({ message: 'Input field has been blurred' })
  }
  // This event triggers during a text copy
  handleCopy = (e) => {
    this.setState({
      message: 'Using 30 Days Of React for commercial purpose is not allowed',
    })
  }
  render() {
    return (
      <div>
        <h1>Welcome to the World of Events</h1>

        <button onClick={this.handleClick}>Click Me</button>
        <button onMouseMove={this.handleMouseMove}>Move mouse on me</button>
        <p onCopy={this.handleCopy}>
          Check copy right permission by copying this text
        </p>

        <p>{this.state.message}</p>
        <label htmlFor=''> Test for onKeyPress Event: </label>
        <input type='text' onKeyPress={this.handleKeyPress} />
        <br />

        <label htmlFor=''> Test for onBlur Event: </label>
        <input type='text' onBlur={this.handleBlur} />

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='firstName'>First Name: </label>
            <input
              onChange={this.handleChange}
              name='firstName'
              value={this.state.value}
            />
          </div>

          <div>
            <input type='submit' value='Submit' />
          </div>
        </form>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
// we render the JSX element using the ReactDOM package
ReactDOM.render(<App />, rootElement)
```
