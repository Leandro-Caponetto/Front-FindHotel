import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import styles from "./HotelList.module.css";
import { FaStar } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'


const HotelList = ({ hotels }) => {

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer} key='hotels'>
        <span className={styles.span}>Results Hotels</span>
        {hotels.map((hotel) => (
          <NavLink key={hotel._id} to={`/detail/${hotel._id}`} className={styles.card}>
            <img
              src={hotel.image[0].src}
              alt="hotel image"
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <h1 className={styles.title}>{hotel.name}</h1>
              <div className={styles.location}>
                <h5 className={styles.textCity}>
                  {hotel.state}, {hotel.country}
                </h5>
              </div>
              <div className={styles.starIcon}>
                {Array.from({ length: hotel.category }, (_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <h5 className={styles.text}>{hotel.room.name}</h5>
            </div>
          </NavLink>
        ))}
      </div>
      {/* <Pagination
        hotelsPorPage={hotelsPorPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalHotels={totalHotels}
      /> */}
    </div>
  );
};
HotelList.propTypes = {
  hotels: PropTypes.array,

};
export default HotelList;
