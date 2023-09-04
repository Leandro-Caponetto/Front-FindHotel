import React, { useEffect, useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./hotelTrend.module.css";
import axios from "axios";
import { URL_FINDHOTEL } from "../../const/const";

const HotelTrend = () => {


  const [hotelData, setHotelData] = useState([]); // Use state to store hotelData

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL_FINDHOTEL}/trending/hotels`);
        setHotelData(response.data); // Update hotelData using the state setter
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
      centerMode: true,
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
                  src={d.image}

                  alt={`Imagen de ${d.city}, ${d.country}`}
                  loading="lazy"
                />
                <div className={styles.info}>
                  <h3>{d.name}</h3>
                  <p>{d.country}</p>

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
