import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from '../../assets/image/logoBlack-removebg-preview.png'
import LogIn from '../Login/LogIn/LogIn'
// import UploadSquare from '../Upload/UploadSquare/UploadSquare';
const NavBar = (props) => {
  return (
    <div className={styles.conteiner}>

      <nav className={styles.navbar}>
        <div className={styles.navbar_logo}>
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className={styles.navbar_buttons}>
          {/* <Link to="/form" className={styles.navbar_button}>
            Create Hotel
          </Link>
          <Link to="/register" className={styles.navbar_button}>
            Register
          </Link>
          <Link to="/signin" className={styles.navbar_button}>
            Sign In
          </Link> */}
          <div className={styles.navbar_login}>
            <LogIn style={{ size: '75px' }} sizeAvatar={90} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
