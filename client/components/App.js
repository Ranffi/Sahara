import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom';

import NavBar from './NavBar';
import HomePage from './HomePage'
import Books from './Books'
import SingleBook from './SingleBook'
import SignUp from './SignUp'
import LogIn from './LogIn'
import Admin from './Admin'
import Logout from './Logout'
<<<<<<< HEAD
import Account from './Account'
=======
import About from './AboutPage'
import Checkout from './Checkout'
>>>>>>> d8a972a4536ad42881484d5811d8dccfa00a39ec

const App = () => {
    return (
      <Router>
        <main>
          <NavBar />
          <Route path = "/" exact component = { HomePage } />
          <Route path = "/about" exact component = { About } />
          <Route path = "/books" exact component = { Books } />
          <Route path = "/books/:id" exact component = { SingleBook } />
          <Route path = "/signUp" exact component = { SignUp } />
          <Route path = "/login" exact component = { LogIn } />
          <Route path = "/admin" exact component = { Admin } />
          <Route path = "/logout" exact component = { Logout } />
<<<<<<< HEAD
          <Route path = "/account" exact component = { Account } />
=======
          <Route path = "/checkout" exact component = { Checkout } />
>>>>>>> d8a972a4536ad42881484d5811d8dccfa00a39ec
        </main>
      </Router>
  )
}

export default App
