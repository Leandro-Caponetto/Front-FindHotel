import styles from './Header.module.css'
import React , { useEffect, useState } from "react";
import { IoIosArrowForward } from 'react-icons/io';
import { InputText, InputNumber, InputDate } from '../Inputs';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setDestination } from '../../redux/destinations';
import { NavLink } from 'react-router-dom';

const Header = () => {
const dispatch = useDispatch();
    
const [search, setSearch] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: ''
})
    const handleSearch = () =>{ 
        dispatch(fetchData(search.destination))
        console.log("🚀 ~ file: Header.jsx:20 ~ handleSearch ~ search.destination:", search)
    }
    const handleInputChange = (inputField, inputValue) => {
        const currentState = { ...search, [inputField]: inputValue }
        setSearch(currentState);
    };
        console.log(search);
    
    return (
        <div className={styles.ContainerBox}>
            <div className={styles.boxInfo}>
                <p>Elevate your travel journey</p>
                <h1>Magic Experience For Your Trip!</h1>
            </div>
            <div className={styles.boxFind}>
                <h2>Book Now</h2>

                <div className={styles.search}>
                    <div className={styles.searchInfo}>
                        {/* <h3>Destination</h3> */}
                        <InputText tag={'Destination'} onChangeInput={(input) => handleInputChange('destination', input)} />
                        {/* <input type="text" /> */}
                    </div>
                    <div className={styles.searchInfo}>
                        {/* <h3>Check in</h3>
                    <input type="date" /> */}
                        <InputDate tag={'Check in'} />
                    </div>
                    <div className={styles.searchInfo}>
                        {/* <h3>Check out</h3>
                        <input type="date"/> */}
                        <InputDate tag={'Check out'} />
                    </div>
                    <div className={styles.searchInfo}>
                        {/* <h3>Guests</h3> */}
                        <InputNumber tag={'Guests'} />
                    </div>
                    <div className={styles.searchInfo}>
                        <h3></h3>
                       <NavLink to="/results"> <button  onClick={handleSearch}>Search</button> </NavLink>
                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;