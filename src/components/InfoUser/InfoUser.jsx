import React from 'react';
import bannerData from '../../assets/InfoUser.json';
import styles from './InfoUser.module.css';

const InfoUser = () => {
  return (
    <div className={styles.slider}>
      <h1>Foro</h1>
      <div className={styles.slideTrack}>
        {bannerData.comentarios.map((infoItem) => (
          <div className={styles.slide} key={infoItem.id}>
            <div className={styles.colorCircle}></div> 
            <img
              src={infoItem.img}
              alt={`Banner ${infoItem.id}`}
              className={styles.bannerImage}
            />
            <div className={styles.comment}>
              <h3>{infoItem.usuario}</h3>
              <div className={styles.stars}>{infoItem.calificacion}</div>
              <p>{infoItem.comentario}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoUser;
