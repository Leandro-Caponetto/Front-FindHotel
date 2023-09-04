import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./trendDestinations.module.css";
import axios from "axios";


const TrendDestinations = () => {

  const [stateData, setStateData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get('https://backendfindhotel-dev.fl0.io/trending/state');
        setStateData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []);

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
      <h1 className={styles.title}>Trending Destinations</h1>

      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {stateData.map((d) => (
            <div className={styles.cardContainer} key={d.id}>
              <div className={styles.card}>
                <img
                  className={styles.image}
                  src={d.image}
                  alt={`Imagen de ${d.country}, ${d.state}`}
                />
                <div className={styles.info}>
                  <h3>{d.country}</h3>
                  <p>{d.state}</p>
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
