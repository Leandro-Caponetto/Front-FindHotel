import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './LoggedIn.module.css';

const LoggedIn = ({ isActiveLoggedIn = false, onChangeLoggedIn }) => {

  return (
    <>
      <div className={`${styles.LoggedIn} ${isActiveLoggedIn ? styles.active : ''}`}>
        <div className={styles.LoggedInForm}>
          <div className={styles.BtnSignIn}>

          </div>
          <div className={styles.Links}>
          </div>
        </div>
      </div >
    </>
  )
}

LoggedIn.propTypes = {
  isActiveLoggedIn: PropTypes.bool,
  onChangeLoggedIn: PropTypes.bool,
};

export default LoggedIn;
