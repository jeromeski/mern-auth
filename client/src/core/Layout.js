import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';

const Layout = ({ children, history }) => {
  const isActive = path => {
    if (history.location.pathname === path) {
      return { color: '#000' };
    } else {
      return { color: '#fff' };
    }
  };

  const nav = () => (
    <ul className='nav nav-tabs bg-primary'>
      <li className='nav-item'>
        <Link to='/' className='nav-link' style={isActive('/')}>
          Home
        </Link>
      </li>
      {isAuth() && isAuth().role === 'admin' && (
        <li className='nav-item'>
          <Link to='/admin' className='nav-link' style={isActive('/admin')}>
            {isAuth().name}
          </Link>
        </li>
      )}
      {isAuth() && isAuth().role === 'subscriber' && (
        <Link to='/private' className='nav-link' style={isActive('/private')}>
          {isAuth().name}
        </Link>
      )}

      {!isAuth() && (
        <Fragment>
          <li className='nav-item'>
            <Link to='/signup' className='nav-link' style={isActive('/signup')}>
              Signup
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/signin' className='nav-link' style={isActive('/signin')}>
              Signin
            </Link>
          </li>
        </Fragment>
      )}

      {isAuth() && (
        <li className='nav-item'>
          <span
            className='nav-link'
            style={{ cursor: 'pointer', color: 'white' }}
            onClick={() => {
              signout(() => {
                history.push('/');
              });
            }}>
            Signout
          </span>
        </li>
      )}
    </ul>
  );

  return (
    <Fragment>
      {nav()}
      <div className='container'>{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
