import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './LogIn.module.css';
import InputText from '../../Inputs/InputText/InputText';
import SignIn from '../SignIn/SignIn';
import { AvatarSvg } from '../Avatar';
import IconSelector from '../../IconSelector/IconSelector';
import LoggedIn from '../LoggedIn/LoggedIn';
import Cookies from 'js-cookie';
import { SESSION_NAME } from '../../../const/const';
import { viewFormLog } from '../../../redux/user';
import { getCookieSession } from '../../../services';

const LogIn = ({ imageSrc, onChangeImage, defaultImage, style = { size: '80px' }, sizeAvatar = '30' }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user)
  const login = useSelector(state => state.user.login)
  const [imageUrl, setImageUrl] = useState(imageSrc || defaultImage || '');

  const handlerClickLogin = () => {
    dispatch(viewFormLog())
  }

  console.log(imageUrl)
  const handlerChangeLogin = (image) => {
    setImageUrl(image);
  }

  return (
    <div className={styles.LogIn} title='login'>
      <span className={styles.PhotoWrapper} style={{
        width: `${style.size}`, height: `${style.size}`
      }} onClick={handlerClickLogin}>
        {user?.image !== '' ? <img className={styles.Photo} src={imageUrl} alt='uploadImage' /> :
          <AvatarSvg wsize={'200px'} fill={'#3A6561'} stroke={'#3A6561'} />}
      </span>
      {login.view && <SignIn isActiveSignIn={login.status} />}
      {login.view && < LoggedIn isActiveLoggedIn={!login.status} onChangeLoggedIn={handlerChangeLogin} />}
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
