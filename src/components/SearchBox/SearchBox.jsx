import React from "react";
import styles from "./SearchBox.module.css"
import { ImSearch } from "react-icons/im"

console.log(styles.searchBox)

const SearchBox = () => {
  
    return (
        <div className={styles.searchBox}>
          <div>
            <h3 className={styles.text} >Destination</h3>
            <input type="text" />
          </div>
          <div>
            <h3 className={styles.text}>Dates</h3>
            <input type="date" />
          </div>
          <div>
            <h3 className={styles.text}>Rooms</h3>
            <input type="number" />
          </div>
          <div className= {styles.searchButtonContainer}>
            <h3 className={styles.text} ></h3>
            <button > <ImSearch className={styles.icon}/> Search</button>
          </div>
        </div>
      );
    };
    
export default SearchBox;
