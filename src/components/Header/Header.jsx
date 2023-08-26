import styles from './Header.module.css'
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from 'react-icons/io';
import { InputText, InputNumber, InputDate } from '../Inputs';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setDestination } from '../../redux/destinations';
import { NavLink } from 'react-router-dom';
import { handlerNames } from '../../services';

const Header = () => {
    const dispatch = useDispatch();

    const [search, setSearch] = useState({
        destination: '',
        checkIn: '',
        checkOut: '',
        guests: ''
    })
    const handleSearch = () => {
        dispatch(fetchData(search.destination))
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

                    <InputText
                        tag={'Destination'}
                        onChangeInput={(input) => handleInputChange('destination', input)}
                        buttonClear={true}
                        namesFormat={true}
                    />

                    {/* <InputDate
                        tag={'Check in'}
                        onChangeInput={(input) => handleInputChange('checkIn', input)}
                        maxDate={search.checkOut}
                        buttonClear={true}
                    />
                    <InputDate
                        tag={'Check out'}
                        onChangeInput={(input) => handleInputChange('checkOut', input)}
                        minDate={search.checkIn}
                        buttonClear={true}
                    /> */}

                    {/* <InputNumber tag={'Guests'} onChangeInput={(input) => handleInputChange('guests', input)} /> */}

                    <div className={styles.searchInfo}>
                        <h3></h3>
                        <NavLink to="/results"> <button onClick={handleSearch}>Search</button> </NavLink>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;