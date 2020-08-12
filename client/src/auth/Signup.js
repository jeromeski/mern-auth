import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const { name, email, password, buttonText } = values;

  const handleChange = name => event => {};

  const clickSubmit = event => {};

  const signupForm = () => (
    <form action=''>
      <div className='form-group'>
        <lable className='text-muted'>Name</lable>
        <input
          type='text'
          value={name}
          onChange={handleChange('name')}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <lable className='text-muted'>Email</lable>
        <input
          type='email'
          value={email}
          onChange={handleChange('email')}
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <lable className='text-muted'>Password</lable>
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
        <ToastContainer />
        <h1 className='p-5 text-center'>Signup</h1>
        {signupForm()}
      </div>
    </Layout>
  );
};

export default Signup;
