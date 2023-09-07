import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './LoadSelectorBox.module.css';
import { MdClose } from 'react-icons/md'

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

    <>
      {viewUpload && (<div className={styles.LoadSelectorBox}>
        <div className={styles.UploadBox} onClick={handlerExternalClick}>
          <div className={styles.Box}>
            <div className={styles.HeaderLoadFile}>
              <span className={styles.BtnClose} onClick={handlerCloseBox}>
                <MdClose className={styles.BtnClose} size={30} />
              </span>
            </div>
            <div>
              <form onSubmit={handleUrlSubmit}>
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
      </div >
      )}
    </>
  )
}

LoadSelectorBox.propTypes = {
  viewUpload: PropTypes.string,
  onChangeImage: PropTypes.string,
  onChangeBox: PropTypes.string
};

export default LoadSelectorBox;
