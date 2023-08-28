import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './SignUp.module.css';
import SocialNetworks from '../../SocialNetworks/SocialNetworks';
import { MdLock, MdEmail, MdPerson } from 'react-icons/md';
import logo from '../../../assets/image/logoBlack2.png'
import { Link } from "react-router-dom";

const SignUp = ({ viewSignUp, onViewSignUp }) => {
  const [signUp, setSignUp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',

  })
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',

  })

  // const handlerValidate = () => {
  //   const error = {}
  //   if (!/^[a-zA-Z ]{1,20}$/.test(newNombre)) {
  //     setNombreError('The name Cannot contain special characters and must be less than 20 characters.');
  //   } else {
  //     setNombreError('');
  //   }
  // }
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleNombreChange = (event) => {
    const newNombre = event.target.value;
    setNombre(newNombre);

    if (!/^[a-zA-Z ]{1,20}$/.test(newNombre)) {
      setNombreError('The name Cannot contain special characters and must be less than 20 characters.');
    } else {
      setNombreError('');
    }
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(newEmail)) {
      setEmailError('Enter a valid email.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    if (newPassword.length < 8) {
      setPasswordError('Password must include at least 8 characters.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    if (newConfirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match.');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

  };

  const handlerInputChange = (event) => {
    const { name, value } = event.target
    setSignUp({ ...signUp, [name]: value })
  }

  const handlerCloseBox = () => { onViewSignUp(false); };
  // Check if the click was outside the load dialog
  const handlerExternalClick = (event) => {
    if (event.target.classList.contains(styles.SignUpContainer)) handlerCloseBox();

  };
  return (
    <>
      {viewSignUp && (<div className={styles.SignUpContainer} onClick={handlerExternalClick}>
        <div className={styles.SignUp} >
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
          <h2 className={styles.h2}>Register and elevate your travel journey</h2>
          <form onSubmit={handleSubmit}>

            {Object.keys(signUp).map((key, index) => {
              return (
                <div className={styles.inputGroup} key={index}>
                  {['firstName', 'lastName'].includes(key) ? <MdPerson className={styles.inputIcon} /> :
                    ['password', 'confirmPassword'].includes(key) ? <MdLock className={styles.inputIcon} /> :
                      <MdEmail className={styles.inputIcon} />}
                  <input
                    type={['password', 'confirmPassword'].includes(key) ? 'password' : 'text'}
                    placeholder={
                      {
                        firstName: 'First Name',
                        lastName: 'Last Name',
                        email: 'Email',
                        password: 'Password',
                        confirmPassword: 'Confirm Password'
                      }[key]
                    }
                    name={key}
                    value={signUp[key]}
                    onChange={(event) => { handlerInputChange(event) }}
                    className={styles.inputField}
                  />
                  {error[key] && <p className={styles.errorText}>{error[key]}</p>}
                </div>
              )
            })}

            <div className={styles.BtnSignUp}>
              <div className={styles.SocialNet}>
                <SocialNetworks redSocial={{ facebook: '' }} color={' rgb(44, 194, 180)'} gap={5} />
                <SocialNetworks redSocial={{ google: '' }} color={' rgb(44, 194, 180)'} gap={5} />
                <SocialNetworks redSocial={{ twitter: '' }} color={' rgb(44, 194, 180)'} gap={5} />
              </div>
              <button type="submit" className={styles.submitButton}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>)}
    </>

  );
};
SignUp.propTypes = {

  viewSignUp: PropTypes.boolean,
  onViewSignUp: PropTypes.func

};

export default SignUp;
