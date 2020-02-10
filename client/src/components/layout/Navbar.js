import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <a onClick={logout} className="nav-link" href="#!">
          Se déconnecter
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          S'inscrire
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Se connecter
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container">
        <Link className="home_button nav-link" to="/">
          <i className="fas fa-book" /> cssBooks{" "}
          <span className="sr-only">(current)</span>
        </Link>
        <div className="navbar" id="navbarNav">
          { !loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          ) }
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
