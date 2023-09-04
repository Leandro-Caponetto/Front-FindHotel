import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './IconSelector.module.css';
import { IconContext } from 'react-icons';

import { FaTrashAlt, FaHeart, FaPhoneAlt, FaChartLine, FaBuilding, FaBed } from 'react-icons/fa';
import { MdNavigateNext, MdAttachMoney } from 'react-icons/md';
import { PiUserCircleFill } from 'react-icons/pi'

const IconSelector = ({ iconType = '', size = 30, color = 'white' }) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'favorite':
        return <FaHeart size={size} color={color} />
      case 'phone':
        return <FaPhoneAlt size={size} color={color} />
      case 'user':
        return <PiUserCircleFill size={size} color={color} />
      case 'trash':
        return <FaTrashAlt size={size} color={color} />
      case 'statistics':
        return <FaChartLine size={size} color={color} />
      case 'hotel':
        return <FaBuilding size={size} color={color} />
      case 'room':
        return <FaBed size={size} color={color} />
      case 'next':
        return <MdNavigateNext size={size} color={color} />
      case 'money':
        return <MdAttachMoney size={size} color={color} />
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
