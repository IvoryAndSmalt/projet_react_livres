import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className='my-5 card card-nav-tabs text-center'>
      <div className='card-header card-header-primary'>
        Bienvenue sur CSS Books !
      </div>
      <div className='card-body'>
        <p className='card-text'>
          Commencez par vous inscrire, ou si vous avez déjà un compte,
          connectez-vous.
        </p>
        <Link to='/register' className='btn btn-primary'>
          S'inscrire
        </Link>
        <Link to='/login' className='btn btn-success'>
          Se connecter
        </Link>
      </div>
      <div className='card-footer text-muted'>The end is nigh.</div>
    </div>
  );
};

export default Landing;
