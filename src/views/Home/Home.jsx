import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Home.module.css';
import TrendDestinations from '../../components/trendDestinations';

const Home = () => {
  return (
    <div>
    <TrendDestinations/>
    </div>
  );
};

export default Home;
