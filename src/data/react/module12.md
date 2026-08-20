# Introducing Hooks & Life Cycles

# Introducing React Hook

In the previous, section you have learned how to use React with hooks which is the older version. Currently, hooks has been introduced to React.

Hooks are a new addition in React 16.8. They allow you use state, life cycle methods and other React features without writing a class component. If we are using hooks we can have only a functional component in the entire application. For more detail explanation you check [React documentation](https://reactjs.org/docs/hooks-reference.html).

Different hooks have been introduced to React:Basic hooks and additional hooks


---

## Basic Hooks

The basic hooks are:

- useState
- useEffect
- useContext

### State Hook

Using hooks we can access state without writing a class based component. Let's use the same example we used for class based components on day 8.

To use hooks, first we should import the _useState_ hooks from react. The useState is a function which takes one argument and returns a current state and functions that lets you update it.

```js
// index.js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // Declaring new state variable
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <h1>{count} </h1>
      <button onClick={() => setCount(count + 1)}>Add One</button>
    </div>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

We use the setCount to update the state. The initial state value is 0.

In the above example, we used an increment method. Let's also a decrement method.

```js
// index.js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // Declaring new state variable
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <h1>{count} </h1>
      <button onClick={() => setCount(count + 1)}>Add One</button> <button onClick={() => setCount(count - 1)}>Minus One</button>
    </div>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

We can also write separate function instead of writing our function inside the curly brackets.

```js
// index.js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // Declaring new state variable
  const [count, setCount] = useState(0)
  const addOne = () => {
    let value = count + 1
    setCount(value)
  }
  const minusOne = () => {
    let value = count - 1
    setCount(value)
  }
  return (
    <div className='App'>
      <h1>{count} </h1>
      <button onClick={addOne}>Add One</button> <button onClick={minusOne}>Minus One</button>
    </div>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

Let us do more example about state, in the following example we will develop small application which shows either a dog or cat.
We can start by setting the initial state with cat then when it is clicked it will show dog and alternatively. We need one method which changes the animal alternatively. See the code below. If you want to see live click [here](https://codepen.io/Asabeneh/full/LYVxKpq).

```js
// index.js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const App = () => {
  // declaring state
  const url =
    'https://www.smithsstationah.com/imagebank/eVetSites/Feline/01.jpg'

  const [image, setImage] = useState(url)

  const changeAnimal = () => {
    let dogURL =
      'https://static.onecms.io/wp-content/uploads/sites/12/2015/04/dogs-pembroke-welsh-corgi-400x400.jpg'
    let catURL =
      'https://www.smithsstationah.com/imagebank/eVetSites/Feline/01.jpg'
    let result = image === catURL ? dogURL : catURL
    setImage(result)
  }

  return (
    <div className='App'>
      <h1>30 Days Of React</h1>
      <div className='animal'>
        <img src={image} alt='animal' />
      </div>

      <button onClick={changeAnimal} class='btn btn-add'>
        Change
      </button>
    </div>
  )
}
const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

Now, let's put all the codes we have so far and also let's implement state using the useState hooks when it is necessary.

```js
// index.js
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import asabenehImage from './images/asabeneh.jpg'
import './index.scss'

// Fuction to show month date year
const showDate = (time) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const month = months[time.getMonth()].slice(0, 3)
  const year = time.getFullYear()
  const date = time.getDate()
  return ` ${month} ${date}, ${year}`
}

// User Card Component
const UserCard = ({ user: { firstName, lastName, image } }) => (
  <div className='user-card'>
    <img src={image} alt={firstName} />
    <h2>
      {firstName}
      {lastName}
    </h2>
  </div>
)

// A button component
const Button = ({ text, onClick, style }) => (
  <button style={style} onClick={onClick}>
    {text}
  </button>
)

// CSS styles in JavaScript Object
const buttonStyles = {
  backgroundColor: '#61dbfb',
  padding: 10,
  border: 'none',
  borderRadius: 5,
  margin: 3,
  cursor: 'pointer',
  fontSize: 18,
  color: 'white',
}

const Header = (props) => {
  const {
    welcome,
    title,
    subtitle,
    author: { firstName, lastName },
    date,
  } = props.data

  return (
    <header style={props.styles}>
      <div className='header-wrapper'>
        <h1>{welcome}</h1>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>
          {firstName} {lastName}
        </p>
        <small>{date}</small>
      </div>
    </header>
  )
}

const Count = ({ count, addOne, minusOne }) => (
  <div>
    <h1>{count} </h1>
    <div>
      <Button text='+1' onClick={addOne} style={buttonStyles} />
      <Button text='-1' onClick={minusOne} style={buttonStyles} />
    </div>
  </div>
)

// TechList Component
const TechList = (props) => {
  const { techs } = props
  const techsFormatted = techs.map((tech) => <li key={tech}>{tech}</li>)
  return techsFormatted
}

// Main Component
const Main = (props) => {
  const {
    techs,
    user,
    greetPeople,
    handleTime,
    changeBackground,
    count,
    addOne,
    minusOne,
  } = props
  return (
    <main>
      <div className='main-wrapper'>
        <p>Prerequisite to get started react.js:</p>
        <ul>
          <TechList techs={techs} />
        </ul>
        <UserCard user={user} />
        <Button
          text='Greet People'
          onClick={greetPeople}
          style={buttonStyles}
        />
        <Button text='Show Time' onClick={handleTime} style={buttonStyles} />
        <Button
          text='Change Background'
          onClick={changeBackground}
          style={buttonStyles}
        />
        <Count count={count} addOne={addOne} minusOne={minusOne} />
      </div>
    </main>
  )
}

// Footer Component
const Footer = (props) => {
  return (
    <footer>
      <div className='footer-wrapper'>
        <p>Copyright {props.date.getFullYear()}</p>
      </div>
    </footer>
  )
}

const App = (props) => {
  const [count, setCount] = useState(0)
  const [backgroundColor, setBackgroundColor] = useState('')

  const showDate = (time) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const month = months[time.getMonth()].slice(0, 3)
    const year = time.getFullYear()
    const date = time.getDate()
    return ` ${month} ${date}, ${year}`
  }
  const addOne = () => {
    setCount(count + 1)
  }

  // method which subtract one to the state
  const minusOne = () => {
    setCount(count - 1)
  }
  const handleTime = () => {
    alert(showDate(new Date()))
  }
  const greetPeople = () => {
    alert('Welcome to 30 Days Of React Challenge, 2020')
  }
  const changeBackground = () => {}

  const data = {
    welcome: 'Welcome to 30 Days Of React',
    title: 'Getting Started React',
    subtitle: 'JavaScript Library',
    author: {
      firstName: 'Asabeneh',
      lastName: 'Yetayeh',
    },
    date: 'Oct 7, 2020',
  }
  const techs = ['HTML', 'CSS', 'JavaScript']

  const user = { ...data.author, image: asabenehImage }

  return (
    <div className='app'>
      {backgroundColor}
      <Header data={data} />
      <Main
        user={user}
        techs={techs}
        handleTime={handleTime}
        greetPeople={greetPeople}
        changeBackground={changeBackground}
        addOne={addOne}
        minusOne={minusOne}
        count={count}
      />
      <Footer date={new Date()} />
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

### Effect Hook

### Context Hook


---

## Additional Hook

# Exercises


---

## Legado: Ciclo de Vida en Clases

*Nota: Antes de los Hooks (como useEffect), React manejaba los efectos secundarios mediante métodos del ciclo de vida en clases. A continuación un breve repaso teórico de cómo funcionaba.*

# Component Life Cycles


---

## What is component life cycle

Component life cycle is the process of mounting, updating and destroying a component in a React application. You can associate a component life cycle with the process of human growth:birth, adult, elderly and death.
In React component also a component can be mounted or rendered the first time, can be updated by changing the data and also can be destroyed whenever it is not needed. In React each component has three main phases:

- Mounting
- Updating
- Unmounting


---

## Mounting

Rendering or putting React component into the DOM is called mounting. The following built-in methods run in the given order during mounting of a React component.

1. constructor()
2. static getDerivedStateFromProps()
3. render()
4. componentDidMount()

When we have been making a class-based component we used a built-in render method and it is required in all class-based components but other methods are optional. See the order of execution of the different methods by running the following snippet of codes.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    this.state = {
      firstName: '',
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log(
      'I am getDerivedStateFromProps and I will be the second to run.'
    )
    return null
  }
  componentDidMount() {
    console.log('I am componentDidMount and I will be last to run.')
  }

  render() {
    console.log('I am render and I will be the third to run.')
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

### Contructor

Nowadays we write class based-component without a constructor and we can write the state also outside the constructor. In older version React we the state used be always inside the constructor.

The constructor() method is executed before any other methods, when component is initiated and it is the place where to set the initial state and other values.
In class we use constructor parameter to inherit from parents and in React to the constructor take a props parameter and the super method has to be also called.
Look at the snippet of code about constructor and state.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    this.state = {
      firstName: '',
    }
  }
  render() {
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
        <h2>The constructor is the first to Run</h2>
        <p>Author:{this.state.firstName}</p>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

### getDerivedStateFromPros

As we can understand from the name, this method derives a state from props. The getDerivedStateFromProps() method is called right before rendering the component in the DOM. This the right place to set the state object based on the initial props.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const User = ({ firstName }) => (
  <div>
    <h1>{firstName}</h1>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    // we can write state inside or outside the constructor
    // if is written outside the constructor it does not need the keyword this
    this.state = {
      firstName: 'John',
    }
  }
  static getDerivedStateFromProps(props, state) {
    console.log(
      'I am getDerivedStateFromProps and I will be the second to run.'
    )
    return { firstName: props.firstName }
  }

  render() {
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
        <h3>getDerivedStateFromProps</h3>
        <User firstName={this.state.firstName} />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App firstName='Asabeneh' />, rootElement)
```

### Render

The render method is a required method when we create a class-based component. The render method is where we return JSX. The render methods render whenever there is change in state. Do not set your state inside render method.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const User = ({ firstName }) => (
  <div>
    <h1>{firstName}</h1>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    // we can write state inside or outside the constructor
    // if is written outside the constructor it does not need the keyword this
    this.state = {
      firstName: 'John',
    }
  }
  render() {
    // Never do this
    // Do not reset inside the render method, create a method to reset the state

    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
        <h3>Render method</h3>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App firstName='Asabeneh' />, rootElement)
```

### ComponentDidMount

As we can understand the name of the method that this method called after component is render. This a place place to setting time interval and calling API. Look at the following setTimeout implementation in componentDidMount method.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    this.state = {
      firstName: 'John',
    }
  }
  componentDidMount() {
    console.log('I am componentDidMount and I will be last to run.')
    // after 3 seconds it resets the state
    setTimeout(() => {
      this.setState({
        firstName: 'Asabeneh',
      })
    }, 3000)
  }

  render() {
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
        <h2>componentDidMount Method</h2>
        {this.state.firstName}
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

In the above snippet of code, we saw how to implement setTimeout inside a componentDidMount method. In next example, we will implement an API call using fetch.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    this.state = {
      firstName: 'John',
      data: [],
    }
  }

  componentDidMount() {
    console.log('I am componentDidMount and I will be last to run.')
    const API_URL = 'https://restcountries.eu/rest/v2/all'
    fetch(API_URL)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        this.setState({
          data,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
        <h1>Calling API</h1>
        <div>
          <p>There are {this.state.data.length} countries in the api</p>
          <div className='countries-wrapper'>
            {this.state.data.map((country) => (
              <div>
                <div>
                  {' '}
                  <img src={country.flag} alt={country.name} />{' '}
                </div>
                <div>
                  <h1>{country.name}</h1>
                  <p>Capital: {country.capital}</p>
                  <p>Population: {country.population}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

Sometimes it is better to have a separate method to render the data. See the example below:

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    this.state = {
      firstName: 'John',
      data: [],
    }
  }

  componentDidMount() {
    console.log('I am componentDidMount and I will be last to run.')
    const API_URL = 'https://restcountries.eu/rest/v2/all'
    fetch(API_URL)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        this.setState({
          data,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  renderCountries = () => {
    return this.state.data.map((country) => {
      return (
        <div>
          <div>
            {' '}
            <img src={country.flag} alt={country.name} />{' '}
          </div>
          <div>
            <h1>{country.name}</h1>
            <p>Population: {country.population}</p>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
        <h1>Calling API</h1>
        <div>
          <p>There are {this.state.data.length} countries in the api</p>
          <div className='countries-wrapper'>{this.renderCountries()}</div>
        </div>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```


---

## Updating

After a component has been mounted on the DOM, it can be updated when a state or props change. An update of a React component can be caused by changes to props or state . These methods are called in the following order when a component is being re-rendered:

1. static getDerivedStateFromProps()
2. shouldComponentUpdate()
3. render()
4. getSnapshotBeforeUpdate()
5. componentDidUpdate()

### getDerivedStateFromProps

Similar to the mounting phase, getDerivedStateFromProps can be also called in the updating phase. The getDerivedStateFromProps is the first method that is called when a component gets updated.

### shouldComponentUpdate

The shouldComponentUpdate() built-in life cycle method should return a boolean. If this method does not return true the application will not update.

If the method does not return true the application will never update. This can be used for instance to block use when it reaches to a certain point(game, subscription) or may be to block a certain user.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    this.state = {
      firstName: 'John',
      data: [],
    }
  }

  shouldComponentUpdate(nexProps, nextState) {
    console.log(nextProps, nextState)
    // if the return is true, the application will never update.
    return true
  }

  render() {
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

For instance, if we want to stop doing challenge after 30 days we can increment the day from 1 to 30 and we can block the application at day 30.
Look the example.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    this.state = {
      firstName: 'John',
      day: 1,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
    console.log(nextState.day)
    if (nextState.day > 31) {
      return false
    } else {
      return true
    }
  }
  // the doChallenge increment the day by one
  doChallenge = () => {
    this.setState({
      day: this.state.day + 1,
    })
  }
  render() {
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
        <button onClick={this.doChallenge}>Do Challenge</button>
        <p>Challenge: Day {this.state.day}</p>
        {this.state.congratulate && <h2>{this.state.congratulate}</h2>}
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

### render

As we have mentioned it on the mounting phase of the component, the render() method is called when a component gets updated. It has to re-render the HTML to the DOM, with the new changes.

### componentDidUpdate

The componentDidUpdate method takes two parameters: the prevProps and prevState. It is called after the component is updated in the DOM.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    this.state = {
      firstName: 'John',
      data: [],
    }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevState, prevProps)
  }
  render() {
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```

Let's use the above two life cycle methods together.

```js
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    console.log('I am  the constructor and  I will be the first to run.')
    this.state = {
      day: 1,
      congratulate: '',
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
    console.log(nextState.day)
    if (nextState.day > 31) {
      return false
    } else {
      return true
    }
  }

  doChallenge = () => {
    this.setState({
      day: this.state.day + 1,
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.day == 30) {
      this.setState({
        congratulate: 'Congratulations,Challenge has been completed',
      })
    }
    console.log(prevState, prevProps)
  }

  render() {
    return (
      <div className='App'>
        <h1>React Component Life Cycle</h1>
        <h1>Calling API</h1>
        <button onClick={this.doChallenge}>Do Challenge</button>
        <p>Challenge: Day {this.state.day}</p>
        {this.state.congratulate && <h2>{this.state.congratulate}</h2>}
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
```


---

## Unmounting

The final phase in the lifecycle of a component is unmounting. The unmounting phase removes component from the DOM.
The componentWillUnmount method is the only built-in method that gets called when a component is unmounted.

# Exercises


---

## 🛠️ Ejercicio In-line de Análisis

**Pregunta:** Basado en la lectura de este módulo, ¿por qué React fomenta este patrón arquitectónico en lugar de mutar el DOM de forma imperativa?

**Respuesta y Justificación:**
React abstrae la manipulación manual del DOM para que el desarrollador pueda centrarse en la lógica de estado (declarativo), reduciendo drásticamente los bugs de sincronización entre los datos y la vista.
