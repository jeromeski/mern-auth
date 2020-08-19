// eslint-disable-next-line react-hooks/exhaustive-deps

import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, show } = values;

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'POST',
      url: '/api/activation',
      data: { token }
    })
      .then(response => {
        console.log('ACTIVATION SUCCESS', response);
        setValues({
          ...values,
          show: false
        });
        toast.success(response.data.message);
      })
      .catch(error => {
        console.log('ACTIVATION ERROR', error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div>
      <h1 className='p-5 text-center'>{`Hey ${name}!, Ready to activate your account?`}</h1>
      <button className='btn btn-outline-primary' onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
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
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
