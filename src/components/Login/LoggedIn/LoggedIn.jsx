import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './LoggedIn.module.css';

const LoggedIn = ({ isActiveLoggedIn = false, onChangeLoggedIn }) => {

  return (
    <>
      <div className={`${styles.LoggedIn} ${isActiveLoggedIn ? styles.active : ''}`}>
        LoggedIn Component
      </div>
    </>
  )
}

LoggedIn.propTypes = {
  isActiveLoggedIn: PropTypes.bool,
  onChangeLoggedIn: PropTypes.bool,
};

export default LoggedIn;
