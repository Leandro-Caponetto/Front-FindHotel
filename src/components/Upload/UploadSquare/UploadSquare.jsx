import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './UploadSquare.module.css';

const UploadSquare = (props) => {
  return (
    <div className={styles.UploadSquare}>
      <label htmlFor="imageInput">
        <div className="image-upload-box">
          <span className="plus">+</span>
        </div>
        <input type="file" id="imageInput" className="image-input" />
      </label>
    </div>
  )
}

UploadSquare.propTypes = {};

export default UploadSquare;
