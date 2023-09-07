
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './LoggedInPhoto.module.css';
import { AvatarSvg } from '../Avatar';
import { useSelector } from 'react-redux';
import { readCookieSession } from '../../../services';

function UploadPhoto({ imageSrc, onChangeImage, defaultImage, size = '200px', background = '#D9D9D9', avatarFill = '#3A6561' }) {
  const [showUploadBox, setShowUploadBox] = useState(false)

  const user = useSelector(state => state.user.user)
  const [imageUrl, setImageUrl] = useState(imageSrc || defaultImage || '');

  useEffect(() => {
    const cookie = readCookieSession()
    if (cookie) {
      const { _id, ...data } = cookie
      setImageUrl(data?.image)
    }
  }, [setImageUrl, user]);

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
        {(imageUrl === '' || imageUrl === null || imageUrl === undefined) ?
          <AvatarSvg wsize={'200px'} fill={'#3A6561'} stroke={'#3A6561'} /> :
          <img className={styles.Photo} src={imageUrl} alt='uploadImage' />
        }
      </span>
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
