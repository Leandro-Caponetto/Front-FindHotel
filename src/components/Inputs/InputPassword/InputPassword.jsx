import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './InputPassword.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'

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

  const onChangePasswordView = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.InputPassword}
      style={{ flexDirection: 'column', alignItems: 'center', gap: '30px', ...style }} >
      {tag !== '' && <h3 style={{ fontFamily: 'CocoSharp', fontSize: '24px', ...style?.h3 }}>{tag}: </h3>}
      <div className={styles.DateFile} style={{ display: 'flex', alignItems: 'center' }}>
        <input
          style={{ height: '45px', ...style?.input }}
          type={showPassword ? 'text' : 'password'}
          autoComplete="off"
          value={state}
          placeholder={`${tag}`}
          onChange={(event) => { handlerInputChange(event) }}
        />
        <button className={styles.ViewPassword} onClick={onChangePasswordView} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          {showPassword ? <div style={{ display: 'flex' }}><FaEyeSlash color='rgb(44, 194, 180)' size={20} /></div> : <div style={{ display: 'flex' }}><FaEye size={20} /></div>}
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
