> **Roadmap:** Fase 4: Gestión de Datos y Estado -> Fetching con Hooks

# Obteniendo datos usando ganchos

# Obteniendo datos usando ganchos

En las secciones anteriores, aprendió cómo recuperar datos usando fetch y axios. En esta sección, usaremos el gancho useEffect para recuperar datos. Podemos usar fetch o axios pero yo prefiero usar axios. En los enlaces de React, no es necesario utilizar el ciclo de vida de componenteDidMount por separado para recuperar datos. UseEffect ha incorporado los métodos del ciclo de vida de React (montaje, actualización y desmontaje). Convirtamos el código que escribimos el día 18 en ganchos de React. Necesitamos importar el useEffect de reaccionar. UseEffect lleva como argumento una devolución de llamada y una matriz. Si la matriz está vacía, se comporta como el ciclo de vida de componenteDidMount, donde si la matriz tiene otras propiedades, también se comportará como una actualización.

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
