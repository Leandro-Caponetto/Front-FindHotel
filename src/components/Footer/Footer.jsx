import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Footer.module.css';
import { NavLink } from 'react-router-dom';
import SocialNetworks from '../SocialNetworks/SocialNetworks';

const redesSociales = {
  facebook: '',
  twitter: '',
  linkedin: '',
  instagram: '',
}

const Footer = () => {
  return (
    <div className={styles.Container}>
      <label className={styles.Copyright}>
        Copyright © FindBook.com™. All rights reserved
      </label>
      <div className={styles.LinksContact}>
        <NavLink to=''>About</NavLink>
        <NavLink to=''><label>Customer Care</label></NavLink>
        <NavLink to=''><label>Contact</label></NavLink>
      </div>
      <div className={styles.RedSocial}>
        <SocialNetworks redSocial={redesSociales} size={45} gap={20} />
      </div>
      <div className={styles.PayLogoIcons}>
        <div className={styles.Pay} />
        <div className={styles.FindHotel} />
      </div>
      <div className={styles.Footer}></div>
    </div>
  )
}

export default Footer;
