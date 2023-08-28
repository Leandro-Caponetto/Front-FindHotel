import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './InputText.module.css';
import { GiBroom } from 'react-icons/gi'
import { handlerNames } from '../../../services';

const InputText = ({ initInput, onChangeInput, errors, tag = '', buttonClear = false, namesFormat = false, style }) => {
  const [state, setState] = useState(initInput || '')

  useEffect(() => {
    initInput !== '' && setState(initInput)
  }, [initInput]);

  const handlerInputChange = (event) => {
    const { value } = event.target
    const currentValue = namesFormat ? handlerNames(value, true) : value
    setState(currentValue)
    onChangeInput(currentValue)
  }

  const handlerClearInput = () => {
    setState('')
    onChangeInput('')
  }
  return (
    <div className={styles.InputText}
      style={{ flexDirection: 'column', alignItems: 'center', gap: '30px', ...style }} >
      {tag !== '' && <h3 style={{ fontFamily: 'CocoSharp', fontSize: '24px', ...style?.h3 }}>{tag} </h3>}
      <div className={styles.DateFile}>
        <input
          style={{ width: '200px', height: '45px', ...style?.input }}
          type='text'
          autoComplete="off"
          value={state}
          placeholder={`${tag}`}
          onChange={(event) => { handlerInputChange(event) }}
        />
        {buttonClear && <a className={styles.ClearInput} onClick={handlerClearInput}>
          <GiBroom className={styles.Icon} />
        </a>}
      </div>
      {errors && <label className={styles.ErrorLabel}>{errors}</label>}
    </div>
  )
}

InputText.propTypes = {
  initInput: PropTypes.string,
  onChangeInput: PropTypes.func,
  errors: PropTypes.string,
  tag: PropTypes.string,
  buttonClear: PropTypes.bool,
  namesFormat: PropTypes.bool,
  style: PropTypes.object,

};

export default InputText;
