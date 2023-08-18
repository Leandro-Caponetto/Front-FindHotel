import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Login.module.css';

const Login = ({ isActiveSignIn = false, onChangeSignIn }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [error, setError] = useState({});

  const handlerChangeLogin = (event) => {
    const { name, value } = event.target
    setLogin({ ...login, [name]: value })
  }

  const handlerLogin = (event) => {

  }

  return (
    <div className={styles.Login}>
      <div>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={login.email}
          onChange={(event) => handlerChangeLogin(event)}
        />
        {error.email !== '' ? <label className={styles.ErrorLabel}>{error.email}</label> : null}
        <input
          type="password"
          placeholder="Password"
          value={login.password}
          onChange={(event) => handlerChangeLogin(event)}
        />
        {error.password !== '' ? <label className={styles.ErrorLabel}>{error.password}</label> : null}
        <button onClick={handlerLogin}>Login</button>
        <button>Login with Google</button>
        <button>Login with Facebook</button>
        <button>Login with Twitter</button>
      </div>
      );
    </div>
  )
}

Login.propTypes = {
  isActiveSignIn: PropTypes.bool.isRequired,
  onChangeSignIn: PropTypes.bool,
};

export default Login;
