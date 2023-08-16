import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Card.module.css';

function Card(props) {
    return (
        <div className={styles.Card}> Card Component </div>
        )
  }

export default Card;
