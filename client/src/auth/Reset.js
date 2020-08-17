import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: 'Password Reset'
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = values;

  const handleChange = event => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'PUT',
      url: '/api/reset-password',
      data: { newPassword, resetPasswordLink: token }
    })
      .then(response => {
        console.log('RESET PASSWORD SUCCESS', response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: 'Done' });
      })
      // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
      .catch(error => {
        console.log('RESET PASSWORD', error.response.error);
        setValues({ ...values, buttonText: 'Reset Password' });
        toast.error(error.response.data.error);
      });
  };

  const passwordResetForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          value={newPassword}
          onChange={handleChange}
          className='form-control'
          placeholder='Enter new password'
          required
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
        <h1 className='p-5 text-center'>Hey {name}, type your new password</h1>
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

export default Reset;
