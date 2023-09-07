import React from 'react';
import styles from './PostPago.module.css';
import logo from '../../assets/image/logoBlack2.png';
import { NavLink } from 'react-router-dom'; // Importa NavLink de react-router-dom en lugar de react-bootstrap

const PostPago = () => {
  return (
    <div className={styles.container}>
      <h1>Your reservation was credited successfully!</h1>
      <div className='card'>
        <div className={styles.post}>
          <p>Thank you for choosing:</p>
          <img className={styles.logo} src={logo} alt="" />
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fbc52262225969.5a89af053bacd.gif" alt="" />
          <p>Your reservation has been processed correctly.</p>
          <p>You will receive an email with the details of your reservation.</p>
          <p>You can also check the status of your reservation and know the change and cancellation policies.</p>
          <NavLink to={`/`}>
            <button type="button" className={styles.btn}>Home</button>
          </NavLink>
          <NavLink to={`/user`}>
            <button type="button" className={styles.btn}>User Page</button>
          </NavLink>
        </div>
      </div>

      <div className={styles.poli}>

        <div className={styles.card}>


          <h1>Reservation Policies</h1>
          <img className={styles.logo} src={logo} alt="" />
          <ul>
            <li><strong>Cancellation Policy:</strong> This policy establishes the rules for canceling a reservation and potential cancellation charges. It may vary depending on the hotel and the selected rate.</li>
            <li><strong>Payment Policy:</strong> Defines how the reservation should be paid. Some hotels require an upfront payment, while others allow payment upon check-in.</li>
            <li><strong>Check-in/Check-out Policy:</strong> Indicates the check-in and check-out times. Additional charges may apply for late check-out.</li>
            <li><strong>Children and Pets Policy:</strong> Informs whether children or pets are welcome and if there are additional associated costs.</li>
            <li><strong>Deposit Policy:</strong> Some hotels may require a refundable deposit to cover potential damages or additional expenses.</li>
            <li><strong>No-Show Policy:</strong> Defines the consequences if the guest does not show up on the reservation date without prior cancellation.</li>
            <li><strong>Reservation Modification Policy:</strong> Describes how changes to dates or reservation details can be made and whether there are associated costs.</li>
            <li><strong>Taxes and Fees Policy:</strong> Informs about local taxes and fees that will be added to the reservation cost.</li>
            <li><strong>Privacy Policy:</strong> Explains how guest`s personal data will be handled and their online security.</li>
            <li><strong>Liability Policy:</strong> Establishes the hotel`s responsibility in case of issues with the reservation or services.</li>
            <li><strong>Breakfast and Meals Policy:</strong> Details if breakfast or meals are included in the rate and how they work.</li>
          </ul>

        </div>
      </div>
    </div>
  );
}

export default PostPago;
