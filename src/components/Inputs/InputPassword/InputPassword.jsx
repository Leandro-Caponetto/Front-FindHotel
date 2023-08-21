import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './InputPassword.module.css';

const InputPassword = ({ initInput, onChangeInput, errors, tag = '', style }) => {
  const [state, setState] = useState(initInput || '')
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    initInput !== '' && setState(initInput)
  }, [initInput]);

  const handlerInputChange = (event) => {
    const { value } = event.target;
    setState(value);
    onChangeInput(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.InputPassword} style={{ ...style }} >
      {tag !== '' && <h3 style={{ fontFamily: 'CocoSharp', fontSize: '24px', ...style?.h3 }}>{tag}: </h3>}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          style={{ width: '200px', height: '45px', ...style?.input }}
          type={showPassword ? 'text' : 'password'}
          autoComplete="off"
          value={state}
          placeholder={`${tag}`}
          onChange={(event) => { handlerInputChange(event) }}
        />
        <button onClick={togglePasswordVisibility} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          {showPassword ? <span>👁️</span> : <span>👁️‍🗨️</span>}
        </button>

      </div>
      {errors && <label className={styles.ErrorLabel}>{errors}</label>}
    </div>
  )
}

InputPassword.propTypes = {
  initInput: PropTypes.string,
  onChangeInput: PropTypes.func,
  errors: PropTypes.string,
  tag: PropTypes.string,
  style: PropTypes.object,

};

export default InputPassword;
