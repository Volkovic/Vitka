# Ganchos personalizados

# Ganchos personalizados

Es posible crear un gancho personalizado encima de los ganchos de React disponibles. Por ejemplo, cuando recuperamos datos, usamos fetch o axios para enviar una solicitud HTTP y usamos enlaces Effect para administrar el ciclo de vida de React. Construyamos el gancho personalizado useFetch además de useEffect y useState.

Escribimos este fragmento de código en la sección anterior y usamos ganchos useEffect para recuperar datos de la API. Ahora, conviertamos este código en un gancho personalizado. La convención de nomenclatura para un gancho personalizado es camelCase y comienza con la palabra uso, por eso llamamos a nuestro gancho personalizado useFetch.

```js
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM, { findDOMNode } from 'react-dom'

const Country = ({ country: { name, flag, population } }) => {
  return (
    <div className='country'>
      <div className='country_flag'>
        <img src={flag} alt={name} />
      </div>
      <h3 className='country_name'>{name.toUpperCase()}</h3>
      <div class='country_text'>
        <p>
          <span>Population: </span>
          {population}
        </p>
      </div>
    </div>
  )
}

const App = (props) => {
  // setting initial state and method to update state
  const [data, setData] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const url = 'https://restcountries.eu/rest/v2/all'
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='App'>
      <h1>Fetching Data Using Hook</h1>
      <h1>Calling API</h1>
      <div>
        <p>There are {data.length} countries in the api</p>
        <div className='countries-wrapper'>
          {data.map((country) => (
            <Country country={country} />
          ))}
        </div>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

Cree un nombre de archivo useFetch.js e importe useState y useEffect. Luego transfiera la parte de las funciones state, useEffect y fetchData del código anterior a useFetch.js.

```js
import { useState, useEffect } from 'react'

const useFetch = () => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    const url = 'https://restcountries.eu/rest/v2/all'
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
}
```

Luego hagamos que la función useFetch tome un parámetro. Cuando recuperamos datos, lo único que cambia es la API, por lo tanto, pasemos un parámetro de URL para la función.

```js
import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState([])

  const fetchData = async () => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
}

export default useFetch
```

Con el código anterior, deberíamos lograr recuperar los datos, pero es recomendable poner la función en useEffect y mover el código de función a useEffect.

```js
import { useState, useEffect } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()
        setData(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [url])

  return data
}

export default useFetch
```

Ahora, combinemos todo y hagamos que funcione.

```js
// index.js

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM, { findDOMNode } from 'react-dom'
import useFetch from './useFetch'

const Country = ({ country: { name, flag, population } }) => {
  return (
    <div className='country'>
      <div className='country_flag'>
        <img src={flag} alt={name} />
      </div>
      <h3 className='country_name'>{name.toUpperCase()}</h3>
      <div class='country_text'>
        <p>
          <span>Population: </span>
          {population}
        </p>
      </div>
    </div>
  )
}

const App = (props) => {
  const url = 'https://restcountries.eu/rest/v2/all'
  const data = useFetch(url)

  return (
    <div className='App'>
      <h1>Custom Hooks</h1>
      <h1>Calling API</h1>
      <div>
        <p>There are {data.length} countries in the api</p>
        <div className='countries-wrapper'>
          {data.map((country) => (
            <Country country={country} />
          ))}
        </div>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

Los ganchos useState y useEffect son los ganchos de React más comunes que se utilizan a diario. Además del gancho básico, hay ganchos adicionales que no se utilizan con frecuencia. No es necesario saber utilizar todos los ganchos. Los useState, useEffect y useRef son ganchos muy importantes y se recomienda saber cómo utilizarlos.
