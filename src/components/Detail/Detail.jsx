import React from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./Detail.module.css";
import { FaStar  } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md"
import NavBar from "../NavBar/NavBar";



const Detail = () => {

  const hotels = [
    {
      id: 1,
      name: "Sunset Resort",
      category: 3,
      services: "Relaxation and Entertainment",
      img: "https://a0.muscache.com/im/pictures/9ded2f45-801c-4e9a-bc20-d4f4911ce1ea.jpg?im_w=1200",
      servicesRoom: ["all inclusive", "bar"],
      room: {
        name: "Standard Room",
        price: 150,
        stock: 20,
      },
      roomTypes: "standard",
      country: "United States",
      city: "Miami",
      address: "456 Beach Boulevard",
      roomService: true,
      wifi: true,
      isActive: true,
    },
    {
      id: 2,
      name: "Sunset Resort",
      category: 3,
      services: "Relaxation and Entertainment",
      img: "https://a0.muscache.com/im/pictures/9ded2f45-801c-4e9a-bc20-d4f4911ce1ea.jpg?im_w=1200",
      servicesRoom: ["all inclusive", "bar"],
      room: {
        name: "Standard Room",
        price: 150,
        stock: 20,
      },
      roomTypes: "standard",
      country: "United States",
      city: "Miami",
      address: "456 Beach Boulevard",
      roomService: true,
      wifi: true,
      isActive: true,
    },
    {
      id: 3,
      name: "Sunset Resort",
      category: 3,
      services: "Relaxation and Entertainment",
      img: "https://a0.muscache.com/im/pictures/9ded2f45-801c-4e9a-bc20-d4f4911ce1ea.jpg?im_w=1200",
      servicesRoom: ["all inclusive", "bar"],
      room: {
        name: "Standard Room",
        price: 150,
        stock: 20,
      },
      roomTypes: "standard",
      country: "United States",
      city: "Miami",
      address: "456 Beach Boulevard",
      roomService: true,
      wifi: true,
      isActive: true,
    },
    {
      id: 4,
      name: "Sunset Resort",
      category: 3,
      services: "Relaxation and Entertainment",
      img: "https://a0.muscache.com/im/pictures/9ded2f45-801c-4e9a-bc20-d4f4911ce1ea.jpg?im_w=1200",
      servicesRoom: ["all inclusive", "bar"],
      room: {
        name: "Standard Room",
        price: 150,
        stock: 20,
      },
      roomTypes: "standard",
      country: "United States",
      city: "Miami",
      address: "456 Beach Boulevard",
      roomService: true,
      wifi: true,
      isActive: true,
    },
    {
      id: 5,
      name: "Sunset Resort",
      category: 3,
      services: "Relaxation and Entertainment",
      img: "https://a0.muscache.com/im/pictures/9ded2f45-801c-4e9a-bc20-d4f4911ce1ea.jpg?im_w=1200",
      servicesRoom: ["all inclusive", "bar"],
      room: {
        name: "Standard Room",
        price: 150,
        stock: 20,
      },
      roomTypes: "standard",
      country: "United States",
      city: "Miami",
      address: "456 Beach Boulevard",
      roomService: true,
      wifi: true,
      isActive: true,
    },
  ];

  const { hotelId } = useParams();
  const hotel = hotels.find((hotel) => hotel.id === parseInt(hotelId));

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <div className={styles.detailContainer}>
      <div>
        <div className={styles.title}>
          <h1>{hotel.name}</h1>
        </div>
        <div>
          <div>
            <img
              className={styles.cardImage}
              src={hotel.img}
              alt="hotel image"
            />
          </div>
          <div className={styles.text}>
           <h5>
           <MdLocationOn/> We are located in {hotel.city}, {hotel.country}, {hotel.address}
            </h5>
          </div>
        </div>
        <div>
        <div className={styles.star}>
          {Array.from({ length: hotel.category }, (_, index) => (
            <FaStar key={index} />
          ))}
        </div>

        <div className={styles.textConten}>
        <h5>Enjoy {hotel.services}</h5>
        <h5>
          The services that you will have in your room are {hotel.servicesRoom}
        </h5>
        <h5>Room information </h5>
        <h5> Type room: {hotel.room.name}</h5>
        <h5> Room price: {hotel.room.price}</h5>
        {hotel.wifi ? <h5>WiFi: Available</h5> : null}
        {hotel.roomService ? <h5>Room Service: Available</h5> : null}
        </div>
        <button className={styles.button}><Link to="/results"> Back </Link></button>
      </div>
    </div>
    </div>
  );
};

export default Detail;
