import React, { useState, useEffect } from "react";
import styles from "./HotelList.module.css";
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Pagination from "../Pagination/Pagination";
import Hotelist from "./hotelsData.json";

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [hotelsPorPage, setHotelsPorPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setHotels(Hotelist);
  }, []);

  const lastIndex = currentPage * hotelsPorPage;
  const firstIndex = lastIndex - hotelsPorPage;

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <span className={styles.resultsText}>Results Hotels</span>
        {hotels.slice(firstIndex, lastIndex).map((hotel) => (
          <Link key={hotel.id} to={`/detail/${hotel.id}`} className={styles.card}>
            <img src={hotel.img} alt="hotel image" className={styles.cardImage} />
            <div className={styles.cardContent}>
              <h1 className={styles.title}>{hotel.name}</h1>
              <div className={styles.location}>
                <h5 className={styles.textCity}>
                  {hotel.city}, {hotel.country}
                </h5>
              </div>
              <div className={styles.starIcon}>
                {Array.from({ length: hotel.category }, (_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <h5 className={styles.text}>{hotel.typeRoom}</h5>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        hotelsPorPage={hotelsPorPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalHotels={hotels.length}
      />
    </div>
  );
};

export default HotelList;
