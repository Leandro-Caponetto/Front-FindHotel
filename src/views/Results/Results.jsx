import React, { useState } from "react";
import HotelList from "../../components/HotelList/HotelList";
import NavBar from "../../components/NavBar/NavBar";
import SearchBox from "../../components/SearchBox/SearchBox";
import styles from "./Results.module.css";
import { useSelector, useDispatch } from "react-redux";
import Paginated from '../../components/Paginated/Paginated'

const Results = () => {
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.destination.destination)
  const [paginated, setPaginated] = useState([]);

  // useEffect(() => {
  //    const destination = useSelector((state) => state.destination)
  // }, [dispatch]);

  const handlerPaginated = (dataPaginated) => {
    setPaginated(dataPaginated)
  }


  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.conten}>
        <SearchBox />
        <HotelList hotels={paginated} />
      </div>
      <div className={styles.Pages}>
        <Paginated Data={destination} onDataSlice={handlerPaginated} itemsPerPage={5} />
      </div>
    </div>
  );
};

export default Results;
