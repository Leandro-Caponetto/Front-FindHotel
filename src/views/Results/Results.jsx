import React, { useState, useEffect } from "react";
import HotelList from "../../components/HotelList/HotelList";
import NavBar from "../../components/NavBar/NavBar";
import SearchBox from "../../components/SearchBox/SearchBox";
import styles from "./Results.module.css";
import { useSelector, useDispatch } from "react-redux";
import Paginated from '../../components/Paginated/Paginated'
import FilterOrder from "../../components/FilterOrder/FilterOrder";


const Results = () => {
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.destination.destination)
  const filteredHotels = useSelector((state) => state.destination.filteredHotels)

  const [hotels, setHotels] = useState([])
  const [paginated, setPaginated] = useState([]);

  useEffect(() => {
    handleChange()
    setHotels(filteredHotels)
  }, [hotels, filteredHotels]);

  const handlerPaginated = (dataPaginated) => {
    setPaginated(dataPaginated)
  }

  const handleChange = (data) => {

  }

  console.log(paginated.image)

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.conten}>
        <div className={styles.leftBar}>
          <FilterOrder data={destination} onChangeFilter={handleChange} />
          <SearchBox />
        </div>
        <div>
          <HotelList hotels={paginated} />
          <Paginated Data={filteredHotels} onDataSlice={handlerPaginated} itemsPerPage={5} />

        </div>
      </div>
    </div>
  );
};

export default Results;
