import React, { useState } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Forgot = ({ history }) => {
  const [values, setValues] = useState({
    email: '',
    buttonText: 'Password Reset'
  });

  const { email, buttonText } = values;

  const handleChange = name => event =>
    setValues({ ...values, [name]: event.target.value });

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'PUT',
      url: '/api/forgot-password',
      data: { email }
    })
      .then(response => {
        console.log('FORGOT PASSWORD SUCCESS', response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: 'Requested' });
      })
      // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
      .catch(error => {
        console.log('FORGOT PASSWORD', error.response.error);
        setValues({ ...values, buttonText: 'Password Reset' });
        toast.error(error.response.data.error);
      });
  };

  const forgotPasswordForm = () => (
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
        <h1 className='p-5 text-center'>Forgot Password</h1>
        {forgotPasswordForm()}
      </div>
    </Layout>
  );
};

export default Forgot;
