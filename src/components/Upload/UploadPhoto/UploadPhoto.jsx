
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UploadPhoto.module.css';
import LoadSelectorBox from '../LoadSelectorBox/LoadSelectorBox';

function UploadPhoto({ imageSrc, onChangeImage, defaultImage }) {
  const [imageUrl, setImageUrl] = useState(imageSrc || defaultImage || '');
  const [showUploadBox, setShowUploadBox] = useState(false)

  const handlerImageChange = (url) => {
    setImageUrl(url);
    onChangeImage(url)
  };

  const viewUploadBox = () => {
    setShowUploadBox(!showUploadBox)
  }

  return (
    <div className={styles.UploadPhoto}>
      <span className={styles.PhotoWrapper}>
        <img className={styles.Photo} src={imageUrl} alt='uploadImage' />
      </span>
      <div style={{ backgroundColor: 'red' }}>
        <button className={styles.Button} onClick={() => viewUploadBox()}></button>
        <LoadSelectorBox viewUpload={showUploadBox} onChangeImage={handlerImageChange} onChangeBox={setShowUploadBox} />
      </div>
    </div>
  );
}

UploadPhoto.propTypes = {
  imageSrc: PropTypes.string,
  onChangeImage: PropTypes.string,
  defaultImage: PropTypes.string
};
export default UploadPhoto;
