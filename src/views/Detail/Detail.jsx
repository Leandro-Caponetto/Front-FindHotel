import React from 'react'; 
import NavBar from '../../components/NavBar/NavBar'
import Detail from '../../components/Detail/Detail';
import ReserveBox from "../../components/ReserveBox/ReserveBox"
import styles from "./Detail.module.css"

const DetailHotel = () => {
  return (

    <div>
      <NavBar/>   
      <div className={styles.contentContainer}>
        <div className={styles.detailContainer}>
          <Detail />
        </div>
        <div className={styles.reserveContainer}>
          <ReserveBox />
        </div>
      </div>
    </div>


  )
}

export default DetailHotel;