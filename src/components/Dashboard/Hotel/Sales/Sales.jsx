import React from "react";
import { useState } from "react";
import styles from "./Sales.module.css";

function Sales() {
    
        const [selectedTab, setSelectedTab] = useState(1);

        const handleTabChange = (tabNumber) => {
          setSelectedTab(tabNumber);
        };
      
        return (
          <div>
            <h1 className={styles.text}>MANAGE YOUR RESERVATIONS</h1>
            <ul className={styles.menu}>
        <li className={selectedTab === 1 ? styles.active : ''} onClick={() => handleTabChange(1)}>Active reservations</li>
        <li className={selectedTab === 2 ? styles.active : ''} onClick={() => handleTabChange(2)}>Completed reservations</li>
        <li className={selectedTab === 3 ? styles.active : ''} onClick={() => handleTabChange(3)}>Canceled reservations</li>
        <li className={selectedTab === 4 ? styles.active : ''} onClick={() => handleTabChange(4)}>All reservations</li>
      </ul>
            <div className={styles.content}>
              {selectedTab === 1 && <p>Contenido de la Pestaña 1</p>}
              {selectedTab === 2 && <p>Contenido de la Pestaña 2</p>}
              {selectedTab === 3 && <p>Contenido de la Pestaña 3</p>}
              {selectedTab === 4 && <p>Contenido de la Pestaña 4</p>}
            </div>
          </div>
      );
    }

export default Sales;
