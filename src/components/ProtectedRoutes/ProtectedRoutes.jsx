import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
  const param = useLocation()
  console.log(param)
  // const user = useSelector(state => state.user.user)
  // if (!user) {
  //   return <Navigate to='/home' />
  // }

  return children
}

ProtectedRoutes.propTypes = {
  childComponent: PropTypes.func,
  redirecto: PropTypes.string,
};

export default ProtectedRoutes;
