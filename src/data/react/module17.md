# Ref (usarRef)

# usoRef

En este desafío hemos cubierto cómo manejar datos de entrada no controlados. En esta sección, usaremos los ganchos useRef para obtener datos de entrada o para acceder a cualquier elemento DOM en su aplicación React.

useRef devuelve un objeto de referencia mutable cuya propiedad .current se inicializa con el argumento pasado (initialValue). El objeto devuelto persistirá durante toda la vida útil del componente.

En el siguiente ejemplo, vemos cómo obtener datos de entrada y acceder a elementos del árbol DOM usando el gancho useRef.

***

## Obtener datos de la entrada

Obtengamos datos del elemento de entrada no controlado.

```js
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const ref = useRef(null)
  const onClick = () => {
    let value = ref.current.value
    alert(value)
  }
  return (
    <div className='App'>
      <h1>How to use data from uncontrolled input using useRef</h1>
      <input type='text' ref={ref} />
      <br />
      <button onClick={onClick}>Get Input Data</button>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

***

## Enfocar

Usando useRef podemos activar el evento de enfoque en la entrada.

```js
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const ref = useRef(null)
  const onClick = () => {
    ref.current.focus()
  }
  return (
    <div className='App'>
      <h1>How to focus on input element useRef</h1>
      <input type='text' ref={ref} />
      <br />
      <button onClick={onClick}>Click to Focus on input</button>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

***

## Obtener contenido del árbol DOM

No toque el DOM cuando desarrolle una aplicación React porque React tiene su propia forma de manipular el DOM utilizando el DOM virtual. En caso de que estemos interesados ​​en obtener algún contenido del árbol DOM, podemos usar el gancho useRef. Vea el ejemplo:

```js
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const ref = useRef(null)
  const onClick = () => {
    let content = ref.current.textContent
    alert(content)
    console.log(content)
  }
  return (
    <div className='App'>
      <h1 ref={ref}>How to getting content from the DOM tree</h1>
      <button onClick={onClick}>Getting Content</button>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

***

## Acceder y diseñar un elemento DOM

Podemos acceder y diseñar un elemento del árbol DOM. Vea el ejemplo a continuación:

```js
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const ref = useRef(null)
  const onClick = () => {
    ref.current.style.backgroundColor = '#61dbfb'
    ref.current.style.padding = '50px'
    ref.current.style.textAlign = 'center'
  }
  return (
    <div className='App'>
      <h1 ref={ref}>How to style HTML from the DOM tree using useRef</h1>
      <button onClick={onClick}>Style it</button>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement
```
