import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar'
import styles from './Home.module.css';
import TrendDestinations from '../../components/TrendDestination/trendDestinations';
import Header from '../../components/Header/Header';
import HotelTrend from '../../components/HotelTrend/hotelTrend';
import BannerHotel from '../../components/BannerHotel/BannerHotel';
import { setDestination } from '../../redux/destinations';
import InfoUser from '../../components/InfoUser/InfoUser';


const Home = () => {

  return (
    <div className={styles.container}>
     <NavBar/>
     <div className={styles.componet}>

     <Header/>
     <TrendDestinations/>
     <HotelTrend/>
     </div>
     <div className={styles.info}>

     <InfoUser />
     </div>
     <div className={styles.banner}>

     <BannerHotel/>
     </div>
    </div>
  );
};

export default Home;
