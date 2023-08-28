import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './SignIn.module.css';
import firebase from '../../../services/firebase/configFirebase';
import SocialNetworks from '../../SocialNetworks/SocialNetworks';
import { InputPassword, InputText } from '../../Inputs';
import { handlerLoginValidate } from '../../../services';
import SignUp from '../SignUp/SignUp';
import ForgotPassword from '../ForgotPassword/ForgotPassword';

const SignIn = ({ isActiveSignIn = false, onChangeSignIn }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [error, setError] = useState({});
  const [viewSignUp, setViewSignUp] = useState(false);
  const [viewForgotPass, setViewForgotPass] = useState(false);

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

  const handlerChangeSignUp = () => { setViewSignUp(!viewSignUp) }
  const handlerChangeForgotPass = () => { setViewForgotPass(!viewForgotPass) }

  return (
    <>
      < div className={`${styles.SignIn} ${isActiveSignIn ? styles.active : ''}`
      }>
        <div className={styles.SignInForm}>
          <InputText
            tag={'email'}
            onChangeInput={(input) => handleInputChange('email', input)}
            style={{
              gap: '20px',
              alignItems: 'start',
              marginBottom: '30px',
              h3: { fontSize: '20px' },
              input: { width: '100%' }
            }}
            namesFormat={false}
          />
          <InputPassword
            tag={'password'}
            onChangeInput={(input) => handleInputChange('password', input)}
            style={{
              gap: '20px',
              alignItems: 'start',
              marginBottom: '20px',
              h3: { fontSize: '20px' },
              input: { width: '100%' }

            }} />

          <div className={styles.BtnSignIn}>
            <button className={styles.BtnLogIn} onClick={handlerLogin}>Login</button>
            <div className={styles.SocialNet}>
              <SocialNetworks redSocial={{ facebook: '' }} />
              <SocialNetworks redSocial={{ google: '' }} />
              <SocialNetworks redSocial={{ twitter: '' }} />
            </div>
          </div>
          <div className={styles.Links}>
            <label onClick={handlerChangeForgotPass}>Forgot your password?</label>
            <label style={{ fontSize: '25px' }} onClick={handlerChangeSignUp}>Sign up</label>
          </div>
        </div>
      </div >
      <SignUp viewSignUp={viewSignUp} onViewSignUp={handlerChangeSignUp} />
      <ForgotPassword viewForgot={viewForgotPass} onViewForgot={handlerChangeForgotPass} />
    </>
  )
}

SignIn.propTypes = {
  isActiveSignIn: PropTypes.bool.isRequired,
  onChangeSignIn: PropTypes.bool,
};

export default SignIn;