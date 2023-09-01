/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import styles from "./Detail.module.css";
import { FaStar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md"

import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { setHotelReserva } from "../../redux/hotels";

import { URL_FINDHOTEL } from "../../const/const";


const Detail = () => {
  const dispatch = useDispatch()
  const {hotelId} = useParams()


  const [hotelDetail, setHotelDetail] = useState({})


  const hotelsDetail = async (hotelId) => {
    try {
      const response = await axios.get(`${URL_FINDHOTEL}/hotel/detail?id=${hotelId}`);

      setHotelDetail(response.data)
      console.log(hotelDetail);
      dispatch(setHotelReserva(response.data));

    } catch (error) {
      console.error('Error fetching hotel data:', error);
    }
  }



  console.log(hotelDetail)
  console.log(hotelId)
  useEffect(() => {
    console.log("userEfect", hotelId)

    hotelsDetail(hotelId)


  }, [dispatch, hotelId]);

  console.log(hotelDetail)

  return (

    <>
      <NavBar />
      <div>

        <h1>COUNTRY: {hotelDetail?.country} </h1>
      </div>

      <div className={styles.detailContainer}>
        <div>
          
          <h1>COUNTRY: {hotelDetail?.country} </h1>
        </div>
      
    <div className={styles.detailContainer}>
          <div>
            <img
              className={styles.cardImage}
              src={hotelDetail?.image?.[0]?.src}
              alt="hotel image"
            />
          </div>


        <div className={styles.textConten}>
          <h1 >{hotelDetail?.name}</h1>
          <div className={styles.text}>
           <h5>
           <MdLocationOn/> We are located in {hotelDetail?.city}, {hotelDetail?.country}, {hotelDetail?.address}
            </h5>
          </div>
        <div className={styles.star}>
          {Array.from({ length: hotelDetail?.category }, (_, index) => (
            <FaStar key={index} />
          ))}
        </div>
        <h5>Enjoy {hotelDetail?.services}</h5>
        <h5>
          The services that you will have in your room are {hotelDetail?.servicesRoom}
        </h5>
        <h5> Room information </h5>
        <h5><strong><strong>Type room:</strong> </strong>  {hotelDetail?.room?.name}</h5>
        <h5><strong>Room price:</strong>  $ {hotelDetail?.room?.price}</h5>
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