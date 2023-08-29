import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaGoogle,
  FaWhatsapp,
  FaApple,
  FaPinterest,
  FaFacebookMessenger,
  FaTiktok,
  FaDiscord,
} from 'react-icons/fa';
import styles from './SocialNetworks.module.css';
import { Link } from 'react-router-dom';

/**
 * 
 * @param {*} redSocial = { facebook: 'http://facebook.com/'}
 * @param {*} size = number --> Icon size
 * @param {*} gap = number --> Icon spacing
 * @returns 
 */
const SocialNetworks = ({ redSocial, size = 30, gap = 20, color = 'white' }) => {
  return (
    <div className={styles.SocialNetworks} style={{ gap: `${gap}px` }}>
      {Object.entries(redSocial).map((red, index) => {
        return (
          <a href={red[1] !== '' ? red[1] : null} key={index} target="_blank" rel="noopener noreferrer" style={{ color: color }}>
            {red[0] === 'apple' && <FaApple className={styles.FaApple} size={size} />}
            {red[0] === 'facebook' && <FaFacebook className={styles.FaFacebook} size={size} />}
            {red[0] === 'github' && <FaGithub className={styles.FaGithub} size={size} />}
            {red[0] === 'instagram' && <FaInstagram className={styles.FaInstagram} size={size} />}
            {red[0] === 'linkedin' && <FaLinkedin className={styles.FaLinkedin} size={size} />}
            {red[0] === 'pinterest' && <FaPinterest className={styles.FaPinterest} size={size} />}
            {red[0] === 'twitter' && <FaTwitter className={styles.FaTwitter} size={size} />}
            {red[0] === 'youtube' && <FaYoutube className={styles.FaYoutube} size={size} />}
            {red[0] === 'whatsapp' && <FaWhatsapp className={styles.FaWhatsapp} size={size} />}
            {red[0] === 'messenger' && < FaFacebookMessenger className={styles.FaMessenger} size={size} />}
            {red[0] === 'discord' && < FaDiscord className={styles.FaDiscord} size={size} />}
            {red[0] === 'tiktok' &&
              <div className={styles.Tiktok}>
                < FaTiktok className={styles.TiktokIni} size={size} />
                < FaTiktok className={styles.TiktokMid} size={size} />
                < FaTiktok className={styles.TiktokEnd} size={size} />
              </div>
            }

            {red[0] === 'google' && < FaGoogle className={styles.FaGoogle} size={size} />}

          </a>
        )
      })}
    </div >
  )
}

SocialNetworks.propTypes = {
  redSocial: PropTypes.object.isRequired,
  size: PropTypes.number,
  gap: PropTypes.number,
  color: PropTypes.string,
};

export default SocialNetworks;
