import React from "react";
import styles from "./ReserveBox.module.css"

console.log(styles.searchBox)

const ReserveBox = () => {
    return (
        <div className={styles.searchBox}>
          <div>
            <h3 className={styles.text} >Check-in</h3>
            <input type="date" />
          </div>
          <div>
            <h3 className={styles.text}>Check-out</h3>
            <input type="date" />
          </div>
          <div>
            <h3 className={styles.text}>Guest</h3>
            <input type="number" />
          </div>
          <div className= {styles.searchButtonContainer}>
            <h3 className={styles.text} ></h3>
            <button className={styles.expandingButton}> Reserve</button>
          </div>
        </div>
      );
    };
    
export default ReserveBox;
