import React from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import hotelData from "./hotelData.json";
import styles from "./hotelTrend.module.css";

const HotelTrend = () => {

  const settings = {
    dots: true, // Muestra los indicadores (puntitos)
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Cantidad de tarjetas visibles a la vez
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]

  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trending Hotels</h2>

      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {hotelData.map((d) => (
            <div className={styles.cardContainer} key={d.id}>
              <div className={styles.card}>
                <img
                  className={styles.image}
                  src={d.img}
                  alt={`Imagen de ${d.city}, ${d.country}`}
                  loading="lazy"
                />
                <div className={styles.info}>
                  <h3>{d.name}</h3>
                  <p>{d.city}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

    </div>
  );
};

export default HotelTrend;
