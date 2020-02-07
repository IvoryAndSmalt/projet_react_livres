import React, { Fragment, useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  return (
    <Fragment>
      <div className='row my-5'>
        <div className='col-sm-6 offset-sm-3'>
          <form>
            <div className='form-group mt-4'>
              <label htmlFor='InputName'>Pseudonyme</label>
              <input
                type='text'
                value={name}
                className='form-control'
                id='InputName'
                placeholder='Pseudonyme'
              />
            </div>
            <div className='form-group mt-4'>
              <label htmlFor='exampleInputEmail1'>Adresse e-mail</label>
              <input
                type='email'
                value={email}
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
                value={password}
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
                value={password2}
                className='form-control'
                id='exampleInputPassword2'
                placeholder='Password'
              />
              <small id='pwHelp2' className='form-text text-muted'>
                Veuillez retaper votre mot de passe.
              </small>
            </div>
            <button type='submit' className='btn btn-primary'>
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
