import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
// import axios from "axios";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // redirect if logged in

  if(isAuthenticated){
    return <Redirect to="/dashboard"/>
  }

  return (
    <Fragment>
      <div className="row my-5">
        <div className="col-sm-6 offset-sm-3">
          <form className="form" onSubmit={e => onSubmit(e)}>
            <div className="form-group mt-4 form-email">
              <label htmlFor="exampleInputEmail1">Adresse e-mail</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={e => onChange(e)}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Entrez votre adresse e-mail"
                required
              />
            </div>
            <div className="form-group mt-4 form-pw">
              <label htmlFor="exampleInputPassword1">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                required
              />
            </div>
            <div className="form-button">
              <button type="submit" className="btn btn-success">
                Se connecter
              </button>
            </div>
          </form>
          <small id="noAccountSignUp" className="form-text text-muted mt-5">
            Vous n'avez pas de compte ? <Link className="form-link" to="/register">Créez-en un.</Link>
          </small>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
