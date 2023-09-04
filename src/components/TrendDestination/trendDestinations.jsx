import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./trendDestinations.module.css";
import axios from "axios";
import { fetchData } from '../../redux/destinations';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';




const TrendDestinations = () => {

  const dispatch = useDispatch();

  const handleSearch = (country) => {
      dispatch(fetchData(country))
  }

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
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Cantidad de tarjetas visibles a la vez
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true

  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trending Destinations</h2>

      <div className={styles.carouselContainer}>
        <Slider {...settings}>
          {stateData.map((d) => (
            <div className={styles.cardContainer} key={d.id}>
              <NavLink to='/results' onClick={() => handleSearch(d.country)}>
              <div className={styles.card}  key={d.id}>
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
              </NavLink>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TrendDestinations;
