import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { authenticate, isAuth } from './helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Google from './Google';

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const { email, password, buttonText } = values;

  const handleChange = name => event =>
    setValues({ ...values, [name]: event.target.value });

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'POST',
      url: '/api/signin',
      data: { email, password }
    })
      .then(response => {
        console.log('SIGNIN SUCCESS', response);
        // save the response (user, token) to localstorage
        authenticate(response, () => {
          setValues({
            ...values,
            email: '',
            password: '',
            buttonText: 'Submitted'
          });
        });
        // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
        isAuth() && isAuth().role === 'admin'
          ? history.push('/admin')
          : history.push('/private');
      })
      .catch(error => {
        console.log('SIGNIN ERROR', error.response.data);
        setValues({ ...values, buttonText: 'Submit' });
        toast.error(error.response.data.error);
      });
  };

  const signinForm = () => (
    <form onSubmit={clickSubmit}>
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

        <h1 className='p-5 text-center'>Signin</h1>
        <Google />
        {signinForm()}

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

export default Signin;
