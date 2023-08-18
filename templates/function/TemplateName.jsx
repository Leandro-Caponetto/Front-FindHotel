import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './TemplateName.module.css';

const TemplateName = (props) => {
    return (
        <div className={styles.TemplateName}> TemplateName Component </div>
        )
  }

TemplateName.propTypes = {};

export default TemplateName;
