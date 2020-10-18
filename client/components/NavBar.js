import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <div id = 'navLeftContainer'>
        <Link className = 'navLink' to = '/'>Home</Link>
        <Link className = 'navLink' to = '/books'>Books</Link>
        <Link className = 'navLink' to = '/'>Cart</Link>
        <Link className = 'navLink' to = '/'>About</Link>
      </div>
      <div id = 'navCenterContainer'>
        Search Bar
      </div>
      <div id = 'navRightContainer'>
        <Link className = 'navLink' to = '/'>Log In</Link>
        <Link className = 'navLink' to = '/'>Sign Up</Link>
     </div>



    </nav>
  )
}

export default NavBar
