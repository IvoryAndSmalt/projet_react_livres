import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-primary'>
      <div className='container'>
        <Link className='home_button nav-link' to='/'>
          <i className='fas fa-book' /> cssBooks{" "}
          <span className='sr-only'>(current)</span>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='sr-only'>Toggle navigation</span>
          <span className='navbar-toggler-icon'></span>
          <span className='navbar-toggler-icon'></span>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link' to='/register'>
                S'inscrire
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/login'>
                Se connecter
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
