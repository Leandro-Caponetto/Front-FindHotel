import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar'
import styles from './Home.module.css';

const Home = () => {
  return (
    <>
     <NavBar/>
    
    <div className={styles.Home}> Home Component </div>
    </>
  );
};

export default Home;
