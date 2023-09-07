import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './LoggedIn.module.css';
import { UploadPhoto } from '../../Upload'
import { signOut } from '../../../redux/user';
import { MdPerson } from 'react-icons/md';
import { FaHotel, FaUserTie } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { readCookieSession } from '../../../services';

const LoggedIn = ({ isActiveLoggedIn = false, onChangeLoggedIn }) => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({})

  useEffect(() => {
    const cookie = readCookieSession()
    if (cookie) {
      const { _id, ...data } = cookie
      setUser(data)
    }
  }, [setUser]);


  const handlerLogOut = () => {
    dispatch(signOut())
  }

  return (
    <>
      <div className={`${styles.LoggedIn} ${isActiveLoggedIn ? styles.active : ''}`}>
        <div className={styles.LoggedInHeader}>
          <label htmlFor="">{user?.role}</label>
          <div className={styles.Photo}>
            <UploadPhoto imageSrc={
              (user?.image === '' || user?.image === null || user?.image === undefined) ? '' :
                user.image} size={'100%'} />
          </div>
        </div>

        <div className={styles.LoggedInForm}>
          <NavLink to={
            user?.role === 'user' ? "/user" :
              user?.role === 'hotel' ? "/hotel" :
                user?.role === 'admin' ? "/admin" : null}>
            <div className={styles.BodyLoggedIn}>
              {user?.role === 'user' ? <MdPerson className={styles.inputIcon} size={30} /> :
                user?.role === 'hotel' ? <FaHotel className={styles.inputIcon} size={30} /> :
                  user?.role === 'admin' ? <FaUserTie className={styles.inputIcon} size={30} /> : null}
              <label className={styles.Name} htmlFor="">{user?.firstName} {user?.lastName}</label>
            </div>
          </NavLink >
        </div>
        <div className={styles.LoggedInFooter}>
          <div className={styles.BtnSignOut}>
          </div>
        </div >
        <button className={styles.BtnLogOut} onClick={handlerLogOut}>Logout</button>
      </div>
    </>
  )
}

LoggedIn.propTypes = {
  isActiveLoggedIn: PropTypes.bool,
  onChangeLoggedIn: PropTypes.func,
};

export default LoggedIn;
