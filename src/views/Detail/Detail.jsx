/* eslint-disable react-hooks/exhaustive-deps */
import {React, useEffect, useState} from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import styles from "./Detail.module.css";
import { FaStar  } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md"

import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";


const Detail = () => {
  const [hotelDetail, SetHotelDetail] = useState([]); 

const {hotelId} = useParams()
console.log(hotelId)
  useEffect(() => {

    const fetchDetail = async (hotelId) => {
      try {
        const response = await axios.get(`http://localhost:3001/hotel/detail?id=${hotelId}`);
        SetHotelDetail(response.data); 
        console.log(response.data);
      } catch (error) {
        // console.error('Error fetching hotel data:', error);
      }
    };

    fetchDetail(hotelId);
  }, []);

  

  return (

    <>
      <NavBar/>
        <div>
          <h1>COUNTRY: {hotelDetail.country} </h1>
        </div>
      
    <div className={styles.detailContainer}>
          <div>
            <img
              className={styles.cardImage}
              src={hotelDetail?.image}
              alt="hotel image"
            />
          </div>

          <div className={styles.textConten}>
          <h1 >{hotelDetail?.name}</h1>
          <div className={styles.text}>
           <h5>
           <MdLocationOn/> We are located in {hotelDetail.city}, {hotelDetail.country}, {hotelDetail.address}
            </h5>
          </div>
        <div className={styles.star}>
          {Array.from({ length: hotelDetail?.category }, (_, index) => (
            <FaStar key={index} />
          ))}
        </div>
        <h5>Enjoy {hotelDetail?.services}</h5>
        <h5>
          The services that you will have in your room are {hotelDetail.servicesRoom}
        </h5>
        <h5> Room information </h5>
        <h5><strong><strong>Type room:</strong> </strong>  {hotelDetail.room?.name}</h5>
        <h5><strong>Room price:</strong>  $ {hotelDetail.room?.price}</h5>
        {hotelDetail?.wifi ? <h5><strong>WiFi:</strong>  Available</h5> : null}
        {hotelDetail?.roomService ? <h5><strong>Room Service:</strong>  Available</h5> : null}
        </div>
        <div className={styles.btn}>

        <Link className={styles.button} to="/results"> Back</Link>
      
        <NavLink className={styles.button} to={`/reserva`}> Reserve</NavLink>
        </div>
      
    </div>
    </>
  );
};

export default Detail;