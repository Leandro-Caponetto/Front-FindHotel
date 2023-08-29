import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './IconSelector.module.css';
import { IconContext } from 'react-icons';

import { FaRegUser, FaTrashAlt, FaHeart, FaPhoneAlt } from 'react-icons/fa';
import { PiUserCircleFill, PiUserCircleDuotone } from 'react-icons/pi'

const IconSelector = ({ iconType = '', size = 30, color = 'black' }) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'favorite':
        return <FaHeart size={size} />
      case 'phone':
        return <FaPhoneAlt size={size} />
      case 'user':
        return <PiUserCircleFill size={size} color={color} />
      case 'trash':
        return <FaTrashAlt size={size} color={color} />
      default:
        return null;
    }
  };
  return (
    <div className={styles.IconSelector}>
      <IconContext.Provider value={{ size: '2em' }}>
        {renderIcon()}
      </IconContext.Provider>
    </div>
  );
};

IconSelector.propTypes = {
  iconType: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default IconSelector;
