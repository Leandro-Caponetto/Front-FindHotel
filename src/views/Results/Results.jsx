import React from "react";
import HotelList from "../../components/HotelList/HotelList";
import NavBar from "../../components/NavBar/NavBar";
import SearchBox from "../../components/SearchBox/SearchBox";
import styles from "./Results.module.css";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchData } from "../../redux/destinations";


const Results = () => {
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.destination.destination)
  console.log("🚀 ~ file: Results.jsx:14 ~ Results ~ destination:", destination)

  // useEffect(() => {
  //    const destination = useSelector((state) => state.destination)
  // }, [dispatch]);
  
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.conten}>
        <SearchBox />
        <HotelList hotels = {destination} />
        
      </div>
    </div>
  );
};

export default Results;
