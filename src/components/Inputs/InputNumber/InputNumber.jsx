import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './InputNumber.module.css';
import { GiBroom } from 'react-icons/gi'

const InputNumber = ({ initInput, onChangeInput, errors, tag = '', buttonClear = false, style }) => {
  const [state, setState] = useState()

  useEffect(() => {
    initInput !== '' && setState(initInput)
  }, [initInput]);

  const handlerInputChange = (event) => {
    const { value } = event.target
    setState(value)
    onChangeInput(value)
  }

  const handlerClearInput = () => {
    setState(0)
    onChangeInput(0)
  }

  return (
    <div className={styles.InputNumber} style={{ ...style }} >
      {tag !== '' && <h3 style={{ fontFamily: 'CocoSharp', fontSize: '24px', ...style?.h3 }}>{tag}</h3>}
      <div className={styles.DateFile}>
        <input
          style={{ width: '200px', height: '45px', ...style?.input }}
          type='number'
          autoComplete="off"
          value={state || 0}
          placeholder={`${tag}`}

          onChange={(event) => { handlerInputChange(event) }}
        />
        {buttonClear && <a className={styles.ClearInput} onClick={handlerClearInput}>
          <GiBroom className={styles.Icon} />
        </a>}
      </div>
      {errors && <label className={styles.ErrorLabel}>{errors}</label>}
    </div >
  )
}

InputNumber.propTypes = {
  initInput: PropTypes.number,
  onChangeInput: PropTypes.func,
  errors: PropTypes.string,
  tag: PropTypes.string,
  buttonClear: PropTypes.bool,
  style: PropTypes.object,

};

export default InputNumber;
