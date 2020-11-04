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
import OrderHistory from './OrderHistory'
import About from './AboutPage'
import Checkout from './Checkout'
import ProfileSettings from './ProfileSettings'

const App = () => {
    return (
      <Router>
        <main>
          <NavBar />
          <Route path = "/" exact component = { HomePage } />
          <Route path = "/settings" exact component = { ProfileSettings } />
          <Route path = "/about" exact component = { About } />
          <Route path = "/books" exact component = { Books } />
          <Route path = "/books/:id" exact component = { SingleBook } />
          <Route path = "/signUp" exact component = { SignUp } />
          <Route path = "/login" exact component = { LogIn } />
          <Route path = "/admin" exact component = { Admin } />
          <Route path = "/logout" exact component = { Logout } />
          <Route path = "/orderHistory" exact component = { OrderHistory } />
          <Route path = "/checkout" exact component = { Checkout } />
        </main>
      </Router>
  )
}

export default App
