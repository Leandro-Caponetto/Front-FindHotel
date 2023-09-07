import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { URL_FINDHOTEL } from '../../../const/const';
import PropTypes from 'prop-types';
import styles from './SignUp.module.css';
import logo from '../../../assets/image/logoBlack2.png'
import { MdLock, MdEmail, MdPerson } from 'react-icons/md';
import { Link } from "react-router-dom";
import { signUpValidate } from '../../../services';
import { createUser } from '../../../services/firebase';
import Swal from 'sweetalert2';
import axiosInstance from '../../../utils/axiosInstance';


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

  const handlerSignUp = async (event) => {
    event.preventDefault();
    try {
      const { status, user } = await createUser(
        signUp.email,
        signUp.password,
      )

      if (status === 200) {
        axiosInstance.post(`/user/auth/sign-up`, {
          user: user,
          firstName: signUp.firstName,
          lastName: signUp.lastName
        })
      } else if (status == 400) {
        Swal.fire({
          title: 'User Registered',
          text: 'The user is already registered',
          icon: 'error',
          confirmButtonText: 'OK',
        })
        return
      }
    } catch (error) {
      console.log(error)
    }

  };

  const handlerInputChange = (event) => {
    const { name, value } = event.target
    const currentValue = { ...signUp, [name]: value }
    setSignUp(currentValue)
    setError(signUpValidate(currentValue))
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
          <form>

            {Object.keys(signUp).map((key, index) => {
              return (
                <span className={styles.GroupInput} key={index}>
                  <div className={styles.inputGroup}>
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
                  </div>
                  {error[key] && <div className={styles.errorText}>{error[key]}</div>}
                </span>)
            })}

            <div className={styles.BtnSignUp}>
              <button type="submit" className={styles.submitButton} onClick={handlerSignUp}>
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
