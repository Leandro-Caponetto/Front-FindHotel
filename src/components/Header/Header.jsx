import styles from './Header.module.css'
import { IoIosArrowForward } from 'react-icons/io';

const Header = () =>{
    return(
        <div className={styles.ContainerBox}>
            <div className={styles.boxInfo}>
                <p>Elevate your travel journey</p>
                <h1>Magic Experience For Your Trip!</h1>
            </div>
            <div className={styles.boxFind}>
                <h2>Book Now</h2>

                <div className={styles.search}>
                    <div className={styles.searchInfo}>
                        <h3>Destination</h3>
                        <input type="text" />
                    </div>
                    <div className={styles.searchInfo}>
                        <h3>Check in</h3>
                        <input type="date"/>
                        
                    </div>
                    <div className={styles.searchInfo}>
                        <h3>Check out</h3>
                        <input type="date"/>
                        
                    </div>
                    <div className={styles.searchInfo}>
                        <h3>Guests</h3>
                        <input type="number" />
                    </div>
                    <div className={styles.searchInfo}>
                        <h3></h3>
                        <button>Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;