> **Roadmap:** Fase 3: Desarrollo Web Moderno con React -> React Core & Hooks (Inputs Controlados)

# Entrada controlada versus no controlada

# Componentes no controlados

En el desafío del día anterior cubrimos los insumos controlados. En React la mayor parte del tiempo utilizamos entradas controladas como se recomienda en la \[documentación de React] oficial (https://reactjs.org/docs/uncontrolled-components.html).

Para escribir un componente no controlado, en lugar de escribir un controlador de eventos para cada actualización de estado, puede usar una referencia para obtener valores de formulario del DOM. En la entrada no controlada obtenemos datos de los campos de entrada, como el manejo de datos de los formularios HTML tradicionales.

Un ejemplo de componente no controlado

***

## Obtener datos de una entrada no controlada

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  firstName = React.createRef()

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.firstName.current.value)
  }

  render() {
    return (
      <div className='App'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='firstName'>First Name: </label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            placeholder='First Name'
            ref={this.firstName}
          />
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

***

## Obtener múltiples datos de entrada del formulario

Podemos tomar múltiples datos de entrada de DOM. No estamos apuntando directamente al DOM, pero React obtiene datos del DOM usando la referencia.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  firstName = React.createRef()
  lastName = React.createRef()
  country = React.createRef()
  title = React.createRef()

  handleSubmit = (e) => {
    // stops the default behavior of form element specifically refreshing of page
    e.preventDefault()

    console.log(this.firstName.current.value)
    console.log(this.lastName.current.value)
    console.log(this.title.current.value)
    console.log(this.country.current.value)

    const data = {
      firstName: this.firstName.current.value,
      lastName: this.lastName.current.value,
      title: this.title.current.value,
      country: this.country.current.value,
    }
    // the is the place we connect backend api to send the data to the database
    console.log(data)
  }

  render() {
    return (
      <div className='App'>
        <h3>Add Student</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              ref={this.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type='text'
              name='lastName'
              placeholder='Last Name'
              ref={this.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type='text'
              name='country'
              placeholder='Country'
              ref={this.country}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              type='text'
              name='title'
              placeholder='Title'
              ref={this.title}
              onChange={this.handleChange}
            />
          </div>

          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

La mayoría de las veces utilizamos entradas controladas en lugar de entradas no controladas. En caso de que desee apuntar a algún elemento en el DOM, utilizará ref para obtener el contenido de ese elemento. No toque directamente usando JavaScript puro. Cuando desarrolle una aplicación React, no toque el DOM directamente porque React tiene su propia forma de manejar la manipulación del DOM.
