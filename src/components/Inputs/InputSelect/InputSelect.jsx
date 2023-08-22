import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './InputSelect.module.css';
import { handlerNames } from '../../../services';

const InputSelect = ({ initSelect, options, onChangeSelect, errors, tag = '', params = false, style }) => {
  const [selected, setSelected] = useState(initSelect || '');

  useEffect(() => {
    initSelect !== '' && setSelected(initSelect)
  }, [initSelect]);
  console.log(initSelect)

  const handleSelectChange = (event) => {
    const { value } = event.target
    if (selected !== value) {
      setSelected(value);
      onChangeSelect(value)
    }
  };

  return (
    <div className={styles.InputSelect}>
      {tag !== '' && <h3 style={{ fontFamily: 'CocoSharp', fontSize: '24px', ...style?.h3 }}>{tag} </h3>}
      <select className={styles.Selecter} value={selected} onChange={handleSelectChange}>
        <option value="" selected disabled hidden>Select an Option</option>
        {Array.isArray(options) ?
          options.map((value, index) => {
            return (
              <option
                key={index}
                value={value}
                className={styles.Selected}
              >{handlerNames(value)}
              </option>
            )
          })
          : options.map(obj => Object.values(obj)).map((value, index) => {
            return (
              <option
                key={index}
                value={value[params ? 1 : 0]}
                className={styles.Selected}
              >{handlerNames(value[1])}
              </option>
            )
          })}
      </select>
      {errors && <label className={styles.ErrorLabel}>{errors}</label>}
    </div>
  )
}

InputSelect.propTypes = {
  initSelect: PropTypes.string,
  options: PropTypes.obj,
  onChangeSelect: PropTypes.func,
  errors: PropTypes.string,
  tag: PropTypes.string,
  params: PropTypes.bool,
  style: PropTypes.object
};

export default InputSelect;
