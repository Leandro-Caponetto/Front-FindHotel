import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './LoadSelectorBox.module.css';

const LoadSelectorBox = ({ viewUpload, onChangeImage, onChangeBox }) => {
  const fileInputRef = useRef(null);
  const urlInputRef = useRef(null);

  //** Action close the upload Box **
  // Click close the upload dialog
  const handlerCloseBox = () => { onChangeBox(false); };
  // Check if the click was outside the load dialog
  const handlerExternalClick = (event) => {
    if (event.target.classList.contains(styles.UploadBox)) onChangeBox(false);
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChangeImage(reader.result);
        onChangeBox(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (event) => {
    event.preventDefault();
    const urlInputValue = urlInputRef.current.value;
    onChangeImage(urlInputValue);
    onChangeBox(false);
  };
  return (
    <div className={styles.LoadSelectorBox}>
      <>
        {viewUpload && (
          <div className={styles.UploadBox} onClick={handlerExternalClick}>
            <div className={styles.Box}>
              <h2>Upload Photo</h2>
              <button className={styles.BtnClose} onClick={handlerCloseBox}>
                Close
              </button>
              <div>
                <form onSubmit={handleUrlSubmit}>
                  <label>
                    Image URL:
                    <input type='text' ref={urlInputRef} />
                  </label>
                  <button type='submit'>Load from URL</button>
                  <label>
                    Choose a file:
                    <input
                      ref={fileInputRef}
                      type='file'
                      accept='image/*'
                      onChange={handleFileChange}
                    />
                  </label>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
      );
    </div>
  )
}

LoadSelectorBox.propTypes = {
  viewUpload: PropTypes.string,
  onChangeImage: PropTypes.string,
  onChangeBox: PropTypes.string
};

export default LoadSelectorBox;
