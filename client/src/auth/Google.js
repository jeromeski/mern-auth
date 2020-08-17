import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

const Google = () => {
  const responseGoogle = response => {
    console.log(response.tokenId);
    axios({
      method: 'POST',
      url: '/google-login',
      data: { idToken: response.tokenId }
    })
      .then(response => {
        console.log('GOOGLE SIGIN SUCCESS', response);
      })
      .catch(error => {
        console.log('GOOGLE SIGIN ERROR', error.response);
      });
  };
  return (
    <div className='pb-3'>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='btn btn-danger btn-lg btn-block'>
            <i className='fab fa-google pr-2'></i>Login with Google
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      ,
    </div>
  );
};

export default Google;
