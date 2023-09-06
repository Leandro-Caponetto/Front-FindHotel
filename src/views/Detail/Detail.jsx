/* eslint-disable react-hooks/exhaustive-deps */

import { React, useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";
import styles from "./Detail.module.css";
import { FaStar } from "react-icons/fa";
import { MdLocationOn, MdHotel, MdWifi, MdRoomService, MdOutlinePriceChange } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import { setTypeRoomDetail } from "../../redux/hotels";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import MapComponent from "../../components/MapComponent/MapComponent"; 

import { setHotelReserva } from "../../redux/hotels";

import {
  
  updateStep2,
  
} from "../../redux/reservaSlice";

const Detail = () => {
  const dispatch = useDispatch();
  const { hotelId } = useParams();
  const [selectedRoom, setSelectedRoom] = useState("");

  

  const [hotelDetail, setHotelDetail] = useState({});

  const hotelsDetail = async (hotelId) => {
    try {
      const response = await axios.get(
        `https://19c2-179-6-14-10.ngrok.io/hotel/detail?id=${hotelId}`
      );

      setHotelDetail(response.data);
      console.log(hotelDetail);
      dispatch(setHotelReserva(response.data));
     
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };
  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
    console.log("option.id",e.target.value)
    const roonPrice = hotelDetail?.room?.find(value => value._id === e.target.value)?.price
    const roonName = hotelDetail?.room?.find(value => value._id === e.target.value)?.name
    dispatch(updateStep2({RoomType_id:e.target.value}))
    dispatch(setTypeRoomDetail({price:roonPrice, name: roonName }))
  };

  console.log(hotelDetail);
  console.log(hotelId);
  useEffect(() => {
    console.log("userEfect", hotelId);

    hotelsDetail(hotelId);
  }, [dispatch, hotelId]);

  console.log(hotelDetail);

  return (
    <>
    
      <div >
        <FaHotel className={styles.title}/>
        <h1>COUNTRY: {hotelDetail?.country} </h1>

      </div>
      {/* <MapComponent
        latitude={hotelDetail?.latitude}
        longitude={hotelDetail?.longitude}
        hotelName={hotelDetail?.name}
      /> */}

      <div className={styles.detailContainer}>
     
        <div>
          <img
            className={styles.cardImage}
            src={hotelDetail?.image?.[0]?.src}
            alt="hotel image"
          />
        </div>

        <div className={styles.textConten}>
          <h1>{hotelDetail?.name}</h1>
          <div className={styles.text}>
            <h5>
              <MdLocationOn/> We are located in {hotelDetail?.state},{" "}
              {hotelDetail?.country}, {hotelDetail?.address}
            </h5>
          </div>
          <div className={styles.star}>
            {Array.from({ length: hotelDetail?.category }, (_, index) => (
              <FaStar key={index} />
            ))}
          </div>
          <h5>Enjoy {hotelDetail?.services}</h5>
          <h5>
            The services that you will have in your room are{" "}
            {hotelDetail?.servicesRoom}
          </h5>
          <h5> Room information </h5>
          <div>
            <h5>
            <MdHotel/><strong>Type room:</strong>
              <select value={selectedRoom} defaultValue="Select room" onChange={handleRoomChange}>
                <option value="Select room" disabled>Select Room</option>
                {hotelDetail?.room?.map((option) => (
                  
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </h5>

            
          </div>
          <h5>
          <MdOutlinePriceChange/>  <strong>Room price:</strong> $ {hotelDetail?.room?.find(value => value._id === selectedRoom)?.price}
          </h5>
          {hotelDetail?.wifi ? (
            <h5>
             <MdWifi/> <strong>WiFi:</strong> Available
            </h5>
          ) : null}
          {hotelDetail?.roomService ? (
            <h5>
             <MdRoomService/> <strong>Room Service:</strong> Available
            </h5>
          ) : null}
        </div>
        <div className={styles.btn}>
          <Link className={styles.button} to="/results">
            {" "}
            Back
          </Link>

          <NavLink className={styles.button} to={`/reserva`}>
            {" "}
            Reserve
          </NavLink>
          
     
        </div>
       
      </div>
      
    </>
  );
};

export default Detail;
