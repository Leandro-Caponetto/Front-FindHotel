import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mockData from "./mockData.json";
import styles from "./trendDestinations.module.css";

const TrendDestinations = () => {
  const settings = {
    dots: true, // Muestra los indicadores (puntitos)
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Cantidad de tarjetas visibles a la vez
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trending Destinations</h2>

      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {mockData.map((d) => (
            <div className={styles.cardContainer} key={d.id}>
              <div className={styles.card}>
                <img
                  className={styles.image}
                  src={d.img}
                  alt={`Imagen de ${d.Ciudad}, ${d.pais}`}
                  loading="lazy"
                />
                <div className={styles.info}>
                  <h3>{d.Ciudad}</h3>
                  <p>{d.pais}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

    </div>
  );
};

export default TrendDestinations;
