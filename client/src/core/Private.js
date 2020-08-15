import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth, getCookie, signout } from '../auth/helpers';

const Private = ({ history }) => {
  const [values, setValues] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const token = getCookie('token');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `/api/user/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('PRIVATE PROFILE UPDATE', response);
        const { role, name, email } = response.data;
        setValues({ ...values, role, name, email });
      })
      .catch(error => {
        console.log('PROFILE UPDATE ERROR', error.response.data.error);
        if (error.response.data === 401) {
          signout(() => {
            history.push('/');
          });
        }
      });
  };

  const { role, name, email, password, buttonText } = values;

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
          role: '',
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

  const updateForm = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Role</label>
        <input type='text' value={role} readOnly className='form-control' />
      </div>
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
        <input type='email' defaultValue={email} className='form-control' />
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

        <p className='pt-5 mb-0 lead text-center'>PRIVATE</p>
        <h1 className='text-center'>Profile Update</h1>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Private;
