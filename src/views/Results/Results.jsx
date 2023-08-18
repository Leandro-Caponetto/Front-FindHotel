import React from "react";
import HotelList from "../../components/HotelList/HotelList";
import NavBar from "../../components/NavBar/NavBar";
import SearchBox from "../../components/searchBox/SearchBox";
import styles from "./Results.module.css";

const Results = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.conten}>
        <SearchBox />
        <HotelList />
      </div>
    </div>
  );
};

export default Results;
