import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar'
import styles from './Home.module.css';
import TrendDestinations from '../../components/trendDestinations';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (

    <>
      <NavBar />
      <TrendDestinations />
      <div className={styles.Footer}>
        <Footer />
      </div>

    </>
  )
}

export default Home;
