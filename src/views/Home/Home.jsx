import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar'
import styles from './Home.module.css';
import TrendDestinations from '../../components/trendDestinations';

const Home = () => {
  return (

    <>
     <NavBar/>
     <TrendDestinations/>
    
    </>

  );
};

export default Home;
