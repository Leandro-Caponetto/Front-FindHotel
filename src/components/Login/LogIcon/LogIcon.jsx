import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './LogIcon.module.css';

const LogIcon = (props) => {
    return (
        <div className={styles.LogIcon}> LogIcon Component </div>
        )
  }

LogIcon.propTypes = {};

export default LogIcon;
