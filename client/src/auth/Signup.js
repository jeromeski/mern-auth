// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth } from './helpers';
import { Helmet } from 'react-helmet';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const { name, email, password, buttonText } = values;

  const handleChange = name => event =>
    setValues({ ...values, [name]: event.target.value });

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'POST',
      url: '/api/signup',
      data: { name, email, password }
    })
      .then(response => {
        console.log('SIGNUP SUCCESS', response);
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          buttonText: 'Submitted'
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log('SIGNUP ERROR', error.response.data);
        setValues({ ...values, buttonText: 'Submit' });
        toast.error(error.response.data.error);
      });
  };

  const head = () => (
    <Helmet>
      <meta charSet='utf-8' />
      <title>MERN Stack | Signup</title>
    </Helmet>
  );

  const signupForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          value={name}
          onChange={handleChange('name')}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          value={email}
          onChange={handleChange('email')}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          value={password}
          onChange={handleChange('password')}
          className='form-control'
        />
      </div>
      <div>
        <button className='btn btn-primary' onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout>
      {head()}
      <div className='col-md-6 offset-md-3'>
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {isAuth() ? <Redirect to='/' /> : null}
        <h1 className='p-5 text-center'>Signup</h1>
        {signupForm()}
        <br />
        <Link
          to='/auth/password/forgot'
          className='btn btn-sm btn-outline-danger'>
          Forgot Password
        </Link>
      </div>
    </Layout>
  );
};

export default Signup;
