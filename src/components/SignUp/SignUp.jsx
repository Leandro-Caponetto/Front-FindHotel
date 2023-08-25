import React, { useState } from 'react';
import { MdLock, MdEmail, MdPerson } from 'react-icons/md';
import styles from './SignUp.module.css'; 
import logo from '../../assets/image/logoBlack-removebg-preview.png'
import { Link } from "react-router-dom";

const SignUp = () => {
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

  return (
    <div className={styles.registrationForm}>
      <Link to="/">
      <img src={logo} alt="Logo" className={styles.logo} /> 
      </Link>
      <h2 className={styles.h2}>Register and elevate your travel journey</h2>
      <form onSubmit={handleSubmit}>
        <div className={`${styles.inputGroup} ${nombreError ? styles.error : ''}`}>
          <MdPerson className={styles.inputIcon} />
          <input
            type="text"
            placeholder="Name"
            value={nombre}
            onChange={handleNombreChange}
            required
            className={styles.inputField}
          />
        </div>
        {nombreError && <p className={styles.errorText}>{nombreError}</p>}

        <div className={`${styles.inputGroup} ${emailError ? styles.error : ''}`}>
          <MdEmail className={styles.inputIcon} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
            className={styles.inputField}
          />
        </div>
        {emailError && <p className={styles.errorText}>{emailError}</p>}

        <div className={`${styles.inputGroup} ${passwordError ? styles.error : ''}`}>
          <MdLock className={styles.inputIcon} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
            className={styles.inputField}
          />
        </div>
        {passwordError && <p className={styles.errorText}>{passwordError}</p>}

        <div className={`${styles.inputGroup} ${confirmPasswordError ? styles.error : ''}`}>
          <MdLock className={styles.inputIcon} />
          <input
            type="password"
            placeholder="Repeat Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className={styles.inputField}
          />
        </div>
        {confirmPasswordError && <p className={styles.errorText}>{confirmPasswordError}</p>}

        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
