import React, { useState } from 'react';
import styles from './CheckBox.module.css';
import {
  handlerNames
} from '../../../services';
import PropTypes from 'prop-types';
/**
 * CheckBox
 * @param {*} infoCheck Selection information that renders the component 
 * @param {*} initCheck 
 * @param {*} onChange 
 * @param {*} errors
 * @param {*} param:boolean = false   ref: false-->key; true-->value
 * @returns 
 */
const CheckBox = ({ infoCheck, initCheck, onChangeCheck, errors, param = false }) => {
  const [check, setChecked] = useState(initCheck || []);


  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    let currentCheck = []
    if (checked) {
      currentCheck = [...check, value]
      setChecked(currentCheck);
    } else {
      currentCheck = check.filter((item) => item !== value)
      setChecked(currentCheck)
    }
    onChangeCheck(currentCheck)
  };

  return (

    <div className={styles.CheckBox}>
      {infoCheck.map(obj => Object.values(obj)).map(value => {
        return (
          <label className={styles.Check} key={value[param ? 1 : 0]}>
            <input
              type="checkbox"
              value={value[param ? 1 : 0]}
              checked={check.includes(value[param ? 1 : 0].toString())}
              onChange={(e) => { handleCheckboxChange(e) }}
            />
            <span className={styles.Checkmark}></span>
            <span className={styles.CheckLabel}>{handlerNames(value[1])}</span>
          </label>)
      })}
      {errors && <label className={styles.ErrorLabel}>{errors}</label>}
    </div>

  )
};

CheckBox.propTypes = {
  infoCheck: PropTypes.array,
  initCheck: PropTypes.array,
  onChangeCheck: PropTypes.func,
  errors: PropTypes.string,
  param: PropTypes.bool,



};
export default CheckBox;
