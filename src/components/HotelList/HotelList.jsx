/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
import styles from "./HotelList.module.css";
import { FaStar } from 'react-icons/fa'
import { NavLink,  } from 'react-router-dom'
import Pagination from '../Pagination/Pagination'

const HotelList = ({ hotels }) => {

  const [hoteles, setHoteles] = useState([]);

  const totalHotels = hoteles.length
  const [hotelsPorPage, setHotelsPorPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1); 
  useEffect(() => {

    setHoteles(hotels);
  }, []);
  // const destinations = useSelector(state => state.destination);

  const lastIndex = currentPage * hotelsPorPage;
  const firstIndex = lastIndex - hotelsPorPage;
  const uniqueCountries = Array.from(new Set(hotels.map((hotel) => hotel.country)));


  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer} key='hotels'>
        <span className={styles.resultsText}> Results Hotels: {uniqueCountries.join(', ')}</span>
        {hotels.slice(firstIndex,lastIndex ).map((hotel) => (
          <NavLink key={hotel._id} to={`/detail/${hotel._id}`} className={styles.card}>
            <img
              src={hotel.image}
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
      <Pagination
        hotelsPorPage={hotelsPorPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalHotels={totalHotels}
      />
    </div>
  );
};
HotelList.propTypes = {
  hotels: PropTypes.array,

};
export default HotelList;