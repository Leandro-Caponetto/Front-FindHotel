import React from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { FaStar } from "react-icons/fa";
import Hotelist from "../HotelList/hotelsData.json";
import NavBar from "../NavBar/NavBar";


const Detail = () => {
    
  const { hotelId } = useParams();
  const hotel = Hotelist .find((hotel) => hotel.id === parseInt(hotelId));

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <div>
      <NavBar/>
      <h1>Hotel Detail</h1>
      <div className={styles.cardsContainer}>

      <div className={styles.card} >
        <img src={hotel.img} alt="hotel image" className={styles.cardImage} />
        <div className={styles.cardContent}>
          <h1 className={styles.title}>{hotel.name}</h1>
          <div className={styles.location}>
            <h5 className={styles.textCity}>
              {hotel.city}, {hotel.country}
            </h5>
            
          </div>
          <div className={styles.star}>
            {Array.from({ length: hotel.category }, (_, index) => (
              <FaStar key={index} />
            ))}
          </div>
          <h5 className={styles.text}>{hotel.typeRoom}</h5>
        </div>
      </div>
      </div>
      
    </div>
  );
};

export default Detail;
