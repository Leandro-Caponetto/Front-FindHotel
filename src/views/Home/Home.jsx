import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar'
import styles from './Home.module.css';
import Footer from '../../components/Footer/Footer';
import TrendDestinations from '../../components/TrendDestination/trendDestinations';

const Home = () => {
  return (


    <div className={styles.container}>
     <NavBar/>
     <TrendDestinations/>
     <TrendDestinations/>
     <Footer />
    </div>


  )
}

export default Home;
