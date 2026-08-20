# Fetching Data Using Hooks

# Fetching Data Using Hooks

In the previous sections, you have learned how to fetch data using fetch and axios. In this section , we will use the useEffect hook to fetch data. We can use fetch or axios but I prefer to use axios. In React hooks, you don't have to use componentDidMount life cycle separately to fetch data. The useEffect has incorporate the React life cycle methods(mounting, updating and unmounting). Let's convert the code we wrote on day 18 to React hooks. We need to import the useEffect from react. The useEffect takes to argument that is a callback and an array. If the array is empty it behaves as componentDidMount life cycle where if the array has other properties, it will behave as updating too.

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

# Exercises

🎉 CONGRATULATIONS ! 🎉


---

## 🛠️ Ejercicio In-line de Análisis

**Pregunta:** Basado en la lectura de este módulo, ¿por qué React fomenta este patrón arquitectónico en lugar de mutar el DOM de forma imperativa?

**Respuesta y Justificación:**
React abstrae la manipulación manual del DOM para que el desarrollador pueda centrarse en la lógica de estado (declarativo), reduciendo drásticamente los bugs de sincronización entre los datos y la vista.
