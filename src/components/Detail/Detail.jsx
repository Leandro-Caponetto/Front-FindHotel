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
          name: "Hard Rock",
          city: "Cancun",
          country: "Mexico",
          price: "30 usd",
          typeRoom: "Habitacion matrimonial",
          score: 5.5,
          category: 4,
          img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdGVsfGVufDB8fDB8fHww&w=1000&q=80",
        },
        {
          id: 2,
          name: "Hard Rock",
          city: "Cartagena",
          country: "Colombia",
          price: "30 usd",
          typeRoom: "Habitacion matrimonial",
          score: 5.5,
          category: 1,
          img: "https://viajasanandres.com/wp-content/uploads/2019/02/decameron-isleno.jpg",
        },
        {
          id: 3,
    
          name: "Hard Rock",
          city: "Buenos Aires",
          country: "Argentina",
          price: "30 usd",
          typeRoom: "Habitacion matrimonial",
          score: 5.5,
          category: 5,
          img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/ca/0c/8b/sp-nh-collection-royal.jpg?w=1200&h=-1&s=1",
        },
        {
          id: 4,
    
          name: "Hard Rock",
          city: "Lima",
          country: "Peru",
          price: "30 usd",
          typeRoom: "Habitacion matrimonial",
          score: 5.5,
          category: 3,
          img: "https://www.infobae.com/new-resizer/r8gfDonqfwbvJkfGOfoZMKpM7GQ=/1200x900/filters:format(webp):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/05/30122005/hoteles-lujo-destacada-1.jpg",
        },
        {
          id: 5,
    
          name: "Hard Rock",
          city: "Paris",
          country: "Francia",
          price: "30 usd",
          typeRoom: "Habitacion matrimonial",
          score: 5.5,
          category: 1,
          img: "https://www.momondo.com.co/himg/62/c0/84/ice-85676218-68620422_3XL-430714.jpg",
        }
         
     ]
  const { hotelId } = useParams();
  const hotel = hotels.find((hotel) => hotel.id === parseInt(hotelId));

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <div>
      <h1>Hotel Detail</h1>
      <div className={styles.cardsContainer}>

      <div className={styles.card}>
        <img src={hotel.img} alt="hotel image" className={styles.cardImage} />
        <div className={styles.cardContent}>
          <h1 className={styles.title}>{hotel.name}</h1>
          <div className={styles.location}>
            <h5 className={styles.textCity}>
              {hotel.city}, {hotel.country}
            </h5>
            
          </div>
          <div className={styles.starIcon}>
            {Array.from({ length: hotel.category }, (_, index) => (
              <FaStar key={index} />
            ))}
          </div>
          <h5 className={styles.text}>{hotel.typeRoom}</h5>
        </div>
        <button className={styles.button}><Link to="/results"> Back </Link></button>
      </div>
      </div>
    </div>
  );
};

export default Detail;
