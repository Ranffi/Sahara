import React from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './NavBar';
import HomePage from './HomePage'
import Books from './Books'
import SignUp from './SignUp'

const App = () => {
    return (
      <Router>
        <main>
          <Route path = "/" component = { NavBar } />
          <Route path = "/" exact component = { HomePage } />
          <Route path = "/books" exact component = { Books } />
          <Route path = "/signUp" exact component = { SignUp } />
        </main>
      </Router>
  )
}

export default App
