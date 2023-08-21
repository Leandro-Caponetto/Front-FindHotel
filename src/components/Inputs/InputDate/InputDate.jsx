import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './InputDate.module.css';

const InputDate = ({ initInput, onChangeInput, errors, tag = '', style }) => {
  const [state, setState] = useState(initInput || '')

  useEffect(() => {
    initInput !== '' && setState(initInput)
  }, [initInput]);

  const handlerInputChange = (event) => {
    const { value } = event.target
    setState(value)
    onChangeInput(value)
  }

  return (
    <div className={styles.InputDate} style={{ ...style }} >
      {tag !== '' && <h3 style={{ fontFamily: 'CocoSharp', fontSize: '24px', ...style?.h3 }}>{tag}: </h3>}
      <input
        style={{ width: '200px', height: '45px', ...style?.input }}
        type='date'
        autoComplete="off"
        value={state}
        placeholder={`${tag}`}
        onChange={(event) => { handlerInputChange(event) }}
      />
      {errors && <label className={styles.ErrorLabel}>{errors}</label>}
    </div>
  )
}

InputDate.propTypes = {
  initInput: PropTypes.string,
  onChangeInput: PropTypes.func,
  errors: PropTypes.string,
  tag: PropTypes.string,
  style: PropTypes.object,

};

export default InputDate;
