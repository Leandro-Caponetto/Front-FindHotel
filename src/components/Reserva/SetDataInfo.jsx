import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Reserva.css";
import logo from '../../assets/../assets/image/logoBlack2.png';

const StepDataInfo = () => {
  const step1Data = useSelector((state) => state.reserva.step1);
  const step2Data = useSelector((state) => state.reserva.step2);
  const step3Data = useSelector((state) => state.reserva.step3);

  const [showInfo, setShowInfo] = useState(false);

  const toggleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div className="step-data-info ticket">
      
      <div className="ticket-header">
      
        <h1> Reservation Ticket</h1>
        <p>Date: {new Date().toLocaleDateString()}</p>
      </div>
      <div className="ticket-content">
        {/* ... */}
      </div>
      <div className="download-button">
        <button onClick={toggleShowInfo}>Show Ticket Info</button>
      </div>
      {showInfo && (
        <div className="ticket-info">
          <h2>Ticket Information</h2>
          <p>Step 1 Data:</p>
          <p><strong>First Name:</strong>  {step1Data.firstName}</p>
          <p><strong>Last Name:</strong>  {step1Data.lastName}</p>
          <p><strong>Email:</strong>  {step1Data.correo}</p>
          <p><strong>Guest:</strong>  {step1Data.guest}</p>

          <p>--------------------------------------</p>
          <p>Step 2 Data:</p>
          <p><strong>Address:</strong> {step2Data.address}</p>
          <p><strong>Country:</strong> {step2Data.country}</p>
          <p><strong>CheckIn:</strong> {step2Data.checkIn}</p>
          <p><strong>CheckOut:</strong> {step2Data.checkOut}</p>
          <p><strong>Schedule: </strong> {step2Data.time}</p>
          <p><strong>Quantity: </strong> {step2Data.quantity}</p>

          <p>--------------------------------------</p>
          <p>Step 3 Data:</p>
          <p><strong>City:</strong>  {step3Data.city}</p>
          <p><strong>Postal Code:</strong>  {step3Data.postalCode}</p>
          <p><strong>Phone:</strong>  {step3Data.phone}</p>
          <p><strong>Accepted Terms:</strong>  {step3Data.aceptaTerminos ? "Yes" : "No"}</p>
          <p>--------------------------------------</p>
        </div>
      )}
      <p><strong>{step1Data.firstName}</strong>  Thank you for choosing</p>
      <img src={logo} alt="" />
    </div>
  );
};

export default StepDataInfo;
