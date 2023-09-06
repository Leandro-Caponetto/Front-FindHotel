
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UploadPhoto.module.css';
import { AvatarSvg } from '../../Login/Avatar';
import LoadSelectorBox from '../LoadSelectorBox/LoadSelectorBox';

function UploadPhoto({ imageSrc, onChangeImage, defaultImage, size = '200px', background = '#D9D9D9', avatarFill = '#3A6561' }) {
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
      <span className={styles.PhotoWrapper} style={{ background: { background } }}>
        {imageUrl !== '' ? <img className={styles.Photo} src={imageUrl} alt='uploadImage' /> :
          <AvatarSvg size={size} fill={avatarFill} />}
      </span>
      <div style={{ backgroundColor: 'red' }}>
        <button className={styles.Button} onClick={() => viewUploadBox()}></button>
      </div>
      <LoadSelectorBox viewUpload={showUploadBox} onChangeImage={handlerImageChange} onChangeBox={setShowUploadBox} />
    </div>
  );
}

UploadPhoto.propTypes = {
  imageSrc: PropTypes.string,
  onChangeImage: PropTypes.string,
  defaultImage: PropTypes.string,
  avatarFill: PropTypes.string,
  background: PropTypes.string,
  size: PropTypes.string
};
export default UploadPhoto;
