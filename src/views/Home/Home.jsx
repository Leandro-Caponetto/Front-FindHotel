import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar'
import styles from './Home.module.css';
import Footer from '../../components/Footer/Footer';
import TrendDestinations from '../../components/TrendDestination/trendDestinations';
import Header from '../../components/Header/Header';
import HotelTrend from '../../components/HotelTrend/hotelTrend';


const Home = () => {
  return (
    <div className={styles.container}>
     <NavBar/>
     <Header/>
     <TrendDestinations/>
     <HotelTrend/>
     

    </div>
  );
};

export default Home;
