/* eslint-disable no-case-declarations */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './SignIn.module.css';
import SignUp from '../SignUp/SignUp';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import SocialNetworks from '../../SocialNetworks/SocialNetworks';
import { InputPassword, InputText } from '../../Inputs';
import { handlerLoginValidate } from '../../../services';
import {
  signIn,
  signInWithGoogle,
  signInWithTwitter,
  signInWithFacebook
} from '../../../services/firebase';

const SignIn = ({ isActiveSignIn = false, onChangeSignIn }) => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState({ email: null, password: null });
  const [error, setError] = useState({});
  const [viewSignUp, setViewSignUp] = useState(false);
  const [viewForgotPass, setViewForgotPass] = useState(false);

  const handleInputChange = (inputField, inputValue) => {
    const currentState = { ...login, [inputField]: inputValue }
    setLogin(currentState);
    setError(handlerLoginValidate(currentState))
  };

  const handlerLogin = async (Red) => {
    let user, _tokenResponse;

    try {
      switch (Red) {
        case 'google':
          ({ user, _tokenResponse } = await signInWithGoogle());
          break;
        case 'facebook':
          ({ user, _tokenResponse } = await signInWithFacebook());
          break;
        case 'twitter':
          ({ user, _tokenResponse } = await signInWithTwitter());
          break;
        default:
          ({ user, _tokenResponse } = await signIn(login.email, login.password));
          console.log(user)
          return;
      }
      if (user.emailVerified) {
        dispatch()
      }
      const idToken = await user.getIdToken();
      const refreshToken = await user
      console.log(refreshToken);
      const userLogged = {
        firstName: _tokenResponse.firstName || null,
        lastName: _tokenResponse.lastName || null,
        email: user.email || null,
        image: user.photoURL || null,
        provider: user.providerId || null,
        accessToken: await user.getIdToken() || null,
        refreshToken: user.refreshToken || null
      };
      console.log(userLogged)

    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
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
              <span onClick={() => { handlerLogin('google') }} >
                <SocialNetworks redSocial={{ google: '' }} />
              </span>
              <span onClick={() => { handlerLogin('twitter') }}>
                <SocialNetworks redSocial={{ twitter: '' }} />
              </span>
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