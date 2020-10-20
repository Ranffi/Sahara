import React from "react"
import { HashRouter as Router, Link, Route, Switch,NavLink } from 'react-router-dom';

import NavBar from './NavBar';
import HomePage from './HomePage'
import Books from './Books'

const App = () => {
    return (
      <Router>
        <main>
          <Route path = "/" component = { NavBar } />
          <Route path = "/" exact component = { HomePage } />
          <Route path = "/books" exact component = { Books } />
        </main>
      </Router>
  )
}

export default App
