import React from 'react';

import styles from './BannerHotel.module.css'
import banner from '../../assets/banner.json'

const BannerHotel = () => {
    return (
        <div className={styles.slider}>
          <div className={styles.slideTrack}>
            {banner.map((bannerItem, index) => (
              <div className={styles.slide} key={index}>
                <img
                  src={bannerItem.img}
                  alt={`Banner ${index + 1}`}
                  className={styles.bannerImage}
                />
              </div>
            ))}
          </div>
        </div>
      );
      
};

export default BannerHotel;
