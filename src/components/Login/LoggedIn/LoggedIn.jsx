import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './LoggedIn.module.css';

const LoggedIn = (props) => {
    return (
        <div className={styles.LoggedIn}> LoggedIn Component </div>
        )
  }

LoggedIn.propTypes = {};

export default LoggedIn;
