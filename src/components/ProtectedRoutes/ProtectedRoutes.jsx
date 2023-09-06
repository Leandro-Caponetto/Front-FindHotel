import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { SESSION_NAME, URL_FINDHOTEL } from '../../const/const';
import { verifyCookieSession, getCookieSession } from '../../services';

// const user = useSelector(state => state.user.user)
// if (!user) {
//   return <Navigate to='/home' />
// }
const ProtectedRoutes = ({ children, path, redirect = '/' }) => {
  const dispatch = useDispatch()
  const location = useLocation();
  const [toHome, setToHome] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    const cookie = getCookieSession()
    if (cookie === undefined) {
      // dispatch()
      setToHome(true);
    } else {
      console.log('login')
      checkCookieAndRedirect()
      setToHome(false)
    }

  }, []);

  const checkCookieAndRedirect = async () => {
    const cookie = verifyCookieSession()
    if (cookie === undefined) {
      setUser({})
      return setToHome(true)
    }
    setUser(cookie)
    return setToHome(false)
  };



  const handlerProtectedClick = (event) => {
    if (!event.target.classList.contains('ProtectedRoutes')) {
      checkCookieAndRedirect();
    }
  }

  return (
    <span className='ProtectedRoutes' onClick={handlerProtectedClick}>
      {!toHome && user.paths.includes(path) ? <Outlet /> : <Navigate to={'/'} />}
      {toHome && <Navigate to={'/'} />};
    </span>
  )
}

ProtectedRoutes.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  path: PropTypes.string,
  redirect: PropTypes.string
};


export default ProtectedRoutes;
