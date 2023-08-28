import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './LogIn.module.css';
import firebase from '../../../services/firebase/configFirebase';
import InputText from '../../Inputs/InputText/InputText';
import SignIn from '../SignIn/SignIn';
import IconSelector from '../../IconSelector/IconSelector';
import LoggedIn from '../LoggedIn/LoggedIn';

const LogIn = ({ imageSrc, onChangeImage, defaultImage, style = { size: '80px' }, sizeAvatar = '30' }) => {
  const dispatch = useDispatch();
  const login = useSelector(state => state)


  const [imageUrl, setImageUrl] = useState(imageSrc || defaultImage || '');
  const [viewLogin, setViewLogin] = useState(false)


  const handlerImageChange = (url) => {
    setImageUrl(url);
    onChangeImage(url)
  };

  const handlerClickLogin = () => {
    setViewLogin(!viewLogin)
  }

  return (
    <div className={styles.LogIn} >
      <span className={styles.PhotoWrapper} style={{
        width: `${style.size}`, height: `${style.size}`
      }} onClick={handlerClickLogin}>
        {imageUrl !== '' ? <img className={styles.Photo} src={imageUrl} alt='uploadImage' /> :
          <IconSelector className={styles.Icon}
            iconType={'user'}
            size={sizeAvatar}
            color={'#3A6561'} />}
      </span>
      <SignIn isActiveSignIn={viewLogin} />
      <LoggedIn isActiveSignIn={viewLogin} />
    </div>
  )
}

LogIn.propTypes = {
  imageSrc: PropTypes.string,
  onChangeImage: PropTypes.func,
  defaultImage: PropTypes.string,
  style: PropTypes.object,
  sizeAvatar: PropTypes.number,
};

export default LogIn;
