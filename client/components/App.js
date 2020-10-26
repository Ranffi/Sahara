import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';

import NavBar from './NavBar';
import HomePage from './HomePage'
import Books from './Books'
import SingleBook from './SingleBook'
import SignUp from './SignUp'
import LogIn from './LogIn'
import Admin from './Admin'

const App = () => {
    return (
      <Router>
        <main>
          <Route path = "/" component = { NavBar } />
          <Route path = "/" exact component = { HomePage } />
          <Route path = "/books" exact component = { Books } />
          <Route path = "/books/:id" exact component = { SingleBook } />
          <Route path = "/signUp" exact component = { SignUp } />
          <Route path = "/login" exact component = { LogIn } />
          <Route path = "/admin" exact component = { Admin } />
        </main>
      </Router>
  )
}

export default App
