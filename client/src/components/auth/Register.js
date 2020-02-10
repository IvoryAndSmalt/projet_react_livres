import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom";
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
// import axios from "axios";

const Register = ({setAlert, register, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormData({
    ...formData, [e.target.name]: e.target.value
  });

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2) {
      setAlert('passwords do not match', 'danger');
    }
    else{
      register({
        name, email, password
      })
    }
  }

  if(isAuthenticated) {
    return <Redirect to="/dashboard"/>
  }

  return (
    <Fragment>
      <div className='row my-5'>
        <div className='col-sm-6 offset-sm-3'>
          <form className="form" onSubmit={e=>onSubmit(e)}>
            <div className='form-group mt-4'>
              <label htmlFor='InputName'>Pseudonyme</label>
              <input
                type='text'
                name="name"
                value={name}
                onChange={e => onChange(e)}
                className='form-control'
                id='InputName'
                placeholder='Pseudonyme'
              />
            </div>
            <div className='form-group mt-4'>
              <label htmlFor='exampleInputEmail1'>Adresse e-mail</label>
              <input
                type='email'
                name="email"
                value={email}
                onChange={e => onChange(e)}
                className='form-control'
                id='exampleInputEmail1'
                aria-describedby='emailHelp'
                placeholder='Entrez votre adresse e-mail'
              />
              <small id='emailHelp' className='form-text text-muted'>
                Cette adresse email sera pulique.
              </small>
            </div>
            <div className='form-group mt-4'>
              <label htmlFor='exampleInputPassword1'>Mot de passe</label>
              <input
                type='password'
                name="password"
                value={password}
                onChange={e => onChange(e)}
                className='form-control'
                id='exampleInputPassword1'
                placeholder='Password'
              />
              <small id='pwHelp' className='form-text text-muted'>
                Le mot de passe doit contenir au moins 6 caractères.
              </small>
            </div>
            <div className='form-group mt-4'>
              <label htmlFor='exampleInputPassword2'>
                Confirmation du mot de passe
              </label>
              <input
                type='password'
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
                className='form-control'
                id='exampleInputPassword2'
                placeholder='Password'
              />
              <small id='pwHelp2' className='form-text text-muted'>
                Veuillez retaper votre mot de passe.
              </small>
            </div>
            <div className="form-button">
              <button type="submit" className="btn btn-primary">
                S'inscrire
              </button>
            </div>
          </form>
          <small id="haveAccountLogin" className="form-text text-muted mt-5">
            Vous avez déjà un compte ? <Link className="form-link" to="/login">Connectez-vous.</Link>
          </small>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
