import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import firebase from '../../../services/firebase/configFirebase';
import InputText from '../../Inputs/InputText/InputText';
import { handlerLoginValidate } from '../../../services';

const Login = ({ isActiveSignIn = false, onChangeSignIn }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [error, setError] = useState({});

  const handlerLogin = (event) => {

  }

  const handleInputChange = (inputField, inputValue) => {
    const currentState = { ...login, [inputField]: inputValue }
    setLogin(currentState);
    setError(handlerLoginValidate(currentState))
  };

  const handleSocialLogin = async (provider) => {
    try {
      const authProvider = new firebase.auth[`${provider}AuthProvider`]();
      await firebase.auth().signInWithPopup(authProvider);
      // El usuario ha iniciado sesión correctamente
    } catch (error) {
      // Manejar errores de autenticación aquí
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <div className={styles.Login}>
      <div>
        <InputText onChangeInput={(input) => handleInputChange('email', input)} tag={'email'} />
        <InputText onChangeInput={(input) => handleInputChange('password', input)} />

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
