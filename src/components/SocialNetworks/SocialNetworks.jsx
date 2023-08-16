import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaPinterest
} from 'react-icons/fa';

import styles from './SocialNetworks.module.css';

// eslint-disable-next-line react/prop-types
const SocialNetworks = ({ redSocial, size = 30, gap = 20 }) => {
  console.log(redSocial)
  return (
    <div className={styles.SocialNetworks} style={{ gap: `${gap}px` }}>
      {Object.entries(redSocial).map((red, index) => {
        return (
          <a href={red[1]} key={index} target="_blank" rel="noopener noreferrer">
            {red[0] === 'facebook' && <FaFacebook className={styles.FaFacebook} size={size} />}
            {red[0] === 'twitter' && <FaTwitter className={styles.FaTwitter} size={size} />}
            {red[0] === 'instagram' && <FaInstagram className={styles.FaInstagram} size={size} />}
            {red[0] === 'github' && <FaGithub className={styles.FaGithub} size={size} />}
            {red[0] === 'linkedin' && <FaLinkedin className={styles.FaLinkedin} size={size} />}
            {red[0] === 'pinterest' && <FaPinterest className={styles.FaPinterest} size={size} />}
            {red[0] === 'youtube' && <FaYoutube className={styles.FaYoutube} size={size} />}
          </a>
        )
      })}
    </div>
  )
}

export default SocialNetworks;
