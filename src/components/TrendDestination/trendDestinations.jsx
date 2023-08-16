import React from "react";
import mockData from "./mockData.json";
import styles from "./trendDestinations.module.css";

const TrendDestinations = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trending Destinations</h2>

      <div className={styles.cardsContainer}>
        {mockData.map((d) => (
          <div className={styles.card} key={d.id}>
            <img
              className={styles.image}
              src={d.img}
              alt={`Imagen de ${d.Ciudad}, ${d.pais}`}
            />
            <div className={styles.info}>
              <h3>{d.Ciudad}</h3>
              <p>{d.pais}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default TrendDestinations;
