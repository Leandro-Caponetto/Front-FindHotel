/** @format */

import React from "react";
import styles from "./About.module.css";
import data from "../../assets/About.json";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.container}>
      <h1>About</h1>

      <div className={styles.datos}>
        <p>
          FindHotel is a leading company in the field of travel and tourism,
          specialized in simplifying the search and reservation of hotels
          globally. Since its founding, FindHotel has stood out for its
          commitment to providing efficient and accessible travel solutions for
          travelers from all over the world, becoming a trusted benchmark in the
          industry. Our mission is to make hotel search and booking easy and
          affordable for everyone. We strive to offer an intuitive and
          transparent platform that allows travelers to find the perfect
          accommodation, regardless of destination or budget. Global Search:
          FindHotel offers travelers access to an extensive database of hotels
          around the world. Our platform guarantees a wide selection of
          accommodation options, from luxurious resorts to cozy hostels,
          covering a variety of preferences and needs. Reliable Reservations: We
          prioritize the security and confidentiality of our clients. Our
          booking platform is designed to rigorously protect personal and
          financial information, ensuring a worry-free experience. Reviews and
          Recommendations: At FindHotel, we provide truthful reviews and
          recommendations from other travelers who have experienced the hotels
          we offer. This helps our clients make informed decisions and select
          the accommodation that best meets their expectations. Customer
          Service: Our customer service team is available 24 hours a day, 7 days
          a week, to provide personalized assistance and resolve any query or
          requirement from our customers. Special Offers: We work closely with
          our hotel partners to negotiate special offers and exclusive
          discounts, ensuring that our clients get the best value for their
          money. Corporate values: Commitment to Excellence: At FindHotel, we
          strive for excellence in all aspects of our services and customer
          relationships. Transparency: We value transparency in all our
          operations, from the presentation of prices to the communication with
          our users. Innovation: We embrace innovation and technology to
          continually improve our services and provide our customers with more
          advanced search tools. Responsibility: We are responsible towards the
          environment and local communities, promoting sustainable and ethical
          tourism practices.
        </p>
      </div>

      <h1 className={styles.more}>know us more</h1>
      <div className={styles.cards}>
        {data.us.map((item) => (
          <div className={styles.card} key={item.id}>
            <div className={styles.slide}>
              <div className={styles.colorCircle}></div>
              <img
                src={item.img}
                alt={`about ${item.id}`}
                className={styles.bannerImage}
              />
              <div className={styles.comment}>
                <h1>{item.usuario}</h1>
                <div className={styles.stars}>{item.calificacion}</div>
                <p>{item.comentario}</p>
              </div>
              <div className={styles.redes}>
                <NavLink className={styles.git} to={item.git}>
                  <FaGithub />
                </NavLink>

                <NavLink className={styles.link} to={item.link}>
                  <FaLinkedin />
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
