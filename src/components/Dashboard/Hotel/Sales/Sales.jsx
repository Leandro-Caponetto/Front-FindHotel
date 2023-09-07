import React from "react";
import { useState, useEffect } from "react";
import styles from "./Sales.module.css";
import axiosInstance from '../../../../utils/axiosInstance'

function Sales() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [activeDeals, setActiveDeals] = useState([]);
  const [hotelName, setHotelName] = useState("");
  const [activeReservations, setActiveReservations] = useState([]);
  const [noActiveReservations, setNoActiveReservations] = useState(true);
  const [activeUser, setActiveUser] = useState([]);
  const [activeCheckIn, setActiveCheckIn] = useState([]);
  const [activeCheckOut, setActiveCheckOut] = useState([]);
  const [activeUserPhones, setActiveUserPhones] = useState([]);
  const [activeUserImages, setActiveUserImages] = useState([]);
  const [activeRoomTypeNames, setActiveRoomTypeNames] = useState([]);
  const [activeRoomTypePrices, setActiveRoomTypePrices] = useState([]);
  const [cancelledReservations, setCancelledReservations] = useState([]);
  const [noCancelledReservations, setNoCancelledReservations] = useState(true);
  const [finishedReservations, setFinishedReservations] = useState([]);
  const [noFinishedReservations, setNoFinishedReservations] = useState(true);
  const [allReservations, setAllReservations] = useState([]);
  const [noAllReservations, setNoAllReservations] = useState(true);
  const [bookingReservations, setBookingReservations] = useState([]);
  const [noBookingReservations, setNoBookingReservations] = useState(true);

  const hotelId = "64e3bee4446b4b4eef196c92";

  const handleTabChange = (tabNumber) => {
    setSelectedTab(tabNumber);
  };

  const fetchHotelInfo = async () => {
    try {
      const response = await axiosInstance.get(`/deals/hotel/${hotelId}`
      );
      console.log("hola", response);
      const hotelData = response.data;
      console.log("hotelData", hotelData);
      const hotelName =
        hotelData.dealsHotel.name || "Nombre del Hotel No Encontrado";
      console.log("hotelName", hotelName);
      setHotelName(hotelName);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  };
  const fetchBookingReservations = async () => {
    try {
      const response = await axiosInstance.get(`/deals/hotel/${hotelId}?status=booking`
      );
      const bookingDeals = response.data.dealsHotel.deals;
      if (bookingDeals.length === 0) {
        setNoBookingReservations(true);
      } else {
        setNoBookingReservations(false);
        setBookingReservations(bookingDeals);
      }
    } catch (error) {
      console.error("Error fetching booking reservations:", error);
    }
  };
  const fetchFinishedReservations = async () => {
    try {
      const response = await axiosInstance.get(`/deals/hotel/${hotelId}?status=finished`
      );
      const finishedDeals = response.data.dealsHotel.deals;
      if (finishedDeals.length === 0) {
        setNoFinishedReservations(true);
      } else {
        setNoFinishedReservations(false); // Cambia a false si hay reservas finalizadas
        setFinishedReservations(finishedDeals);
      }
    } catch (error) {
      console.error("Error fetching finished reservations:", error);
    }
  };

  const fetchCancelledReservations = async () => {
    try {
      const response = await axiosInstance.get(`/deals/hotel/${hotelId}?status=cancelled`
      );
      const cancelledDeals = response.data.dealsHotel.deals;
      if (cancelledDeals.length === 0) {
        setNoCancelledReservations(true);
      } else {
        setNoCancelledReservations(false);
        setCancelledReservations(cancelledDeals);
      }
    } catch (error) {
      console.error("Error fetching cancelled reservations:", error);
    }
  };

  const fetchAllReservations = async () => {
    try {
      const response = await axiosInstance.get(`/deals/hotel/${hotelId}`
      );
      const allDeals = response.data.dealsHotel.deals;
      if (allDeals.length === 0) {
        setNoAllReservations(true);
      } else {
        setNoAllReservations(false); // Cambia a false si hay reservas
        setAllReservations(allDeals);
      }
    } catch (error) {
      console.error("Error fetching all reservations:", error);
    }
  };

  const fetchActiveReservations = async () => {
    try {
      const response = await axiosInstance.get(`/deals/hotel/${hotelId}?status=active`
      );
      console.log(response.data);
      const deals = response.data.dealsHotel.deals;
      console.log("active", deals);
      setActiveDeals(deals);

      const userIDs = deals.map((deal) => deal.user._id);
      const checkInDates = deals.map((deal) => deal.checkIn);
      const checkOutDates = deals.map((deal) => deal.checkOut);
      const userPhones = deals.map((deal) => deal.user.phone);
      const userImages = deals.map((deal) => deal.user.image);
      const roomTypeNames = deals.map((deal) => deal.roomType.name);
      const roomTypePrices = deals.map((deal) => deal.roomType.price);

      setActiveReservations(userIDs);
      setActiveCheckIn(checkInDates);
      setActiveCheckOut(checkOutDates);
      setActiveUserPhones(userPhones);
      setActiveUserImages(userImages);
      setActiveRoomTypeNames(roomTypeNames);
      setActiveRoomTypePrices(roomTypePrices);
    } catch (error) {
      console.error("Error fetching active reservations:", error);
    }
  };

  useEffect(() => {
    fetchHotelInfo();
    fetchActiveReservations();
    fetchCancelledReservations();
    fetchFinishedReservations();
    fetchAllReservations();
    fetchBookingReservations();
  }, [selectedTab]);

  return (
    <div>
      <h1 className={styles.text}>MANAGE YOUR RESERVATIONS</h1>
      <ul className={styles.menu}>
        <li
          className={selectedTab === 1 ? styles.active : ""}
          onClick={() => handleTabChange(1)}
        >
          Active reservations
        </li>
        <li
          className={selectedTab === 2 ? styles.active : ""}
          onClick={() => handleTabChange(2)}
        >
          Pending for pay
        </li>
        <li
          className={selectedTab === 3 ? styles.active : ""}
          onClick={() => handleTabChange(3)}
        >
          Completed reservations
        </li>
        <li
          className={selectedTab === 4 ? styles.active : ""}
          onClick={() => handleTabChange(4)}
        >
          Canceled reservations
        </li>
        <li
          className={selectedTab === 5 ? styles.active : ""}
          onClick={() => handleTabChange(5)}
        >
          All reservations
        </li>
      </ul>
      <div className={styles.content}>
        {selectedTab === 1 && (
          <div>
            <p className={styles.p}>Reservas Activas en el hotel {hotelName}</p>
            <ul>
              {activeReservations.length > 0 ? (
                activeReservations.map((userID, index) => (
                  <li key={userID} className={styles.card}>
                    <p className={styles.cardID}>ID de usuario: {userID}</p>
                    <div className={styles.imageContainer}>
                      {activeUserImages[index] ? (
                        <img
                          src={activeUserImages[index]}
                          alt="Imagen de usuario"
                        />
                      ) : (
                        <img
                          src="https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                          alt="Imagen predeterminada"
                        />
                      )}
                    </div>
                    <p className={styles.cardText}>Email: {activeDeals[index].user.email}</p>
                    <p className={styles.cardText}>Teléfono: {activeUserPhones[index]}</p>
                    <p className={styles.cardText}>Tipo de Habitación: {activeRoomTypeNames[index]}</p>
                    <p className={styles.cardText}>Check-In: {activeCheckIn[index]}</p>
                    <p className={styles.cardText}>Check-Out: {activeCheckOut[index]}</p>
                    <p className={styles.cardText}>Precio: {activeRoomTypePrices[index]} USD</p>
                  </li>
                ))
              ) : (
                <li>No hay reservaciones activas</li>
              )}
            </ul>
          </div>
        )}

        {selectedTab === 2 && (
          <div>
            <p className={styles.p}>Reservas en estado pendiente de pago en el hotel {hotelName}</p>
            <ul>
              {noBookingReservations ? (
                <p className={styles.dontExist}>No hay reservas con estado Booking</p>
              ) : (
                bookingReservations.map((deal) => (
                  <li key={deal._id} className={styles.card}>
                    <p className={styles.cardID}>ID de usuario: {deal.user._id}</p>
                    <div className={styles.imageContainer}>
                      <img
                        src={deal.user.image || "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"}
                        alt="Imagen de usuario"
                      />
                    </div>
                    <p className={styles.cardText}>Email: {deal.user.email}</p>
                    <p className={styles.cardText}>Estado: {deal.status}</p>
                    <p className={styles.cardText}>Teléfono: {deal.user.phone}</p>
                    <p className={styles.cardText}>Tipo de Habitación: {deal.roomType.name}</p>
                    <p className={styles.cardText}>Check-In: {deal.checkIn}</p>
                    <p className={styles.cardText}>Check-Out: {deal.checkOut}</p>
                    <p className={styles.cardText}>Precio: {deal.roomType.price} USD</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {selectedTab === 3 && (
          <div>
            <p className={styles.p}>
              Reservas Finalizadas en el hotel {hotelName}
            </p>
            <ul>
              {noFinishedReservations ? (
                <p className={styles.dontExist}>No hay reservas finalizadas</p>
              ) : (
                finishedReservations.map((deal) => (
                  <li key={deal._id} className={styles.card}>
                    <p className={styles.cardID}>ID de usuario: {deal.user._id}</p>
                    <div className={styles.imageContainer}>
                      <img
                        src={
                          deal.user.image ||
                          "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                        }
                        alt="Imagen de usuario"
                      />
                    </div>
                    <p className={styles.cardText}>Email: {deal.user.email}</p>
                    <p className={styles.cardText}>Estado: {deal.status}</p>
                    <p className={styles.cardText}>Teléfono: {deal.user.phone}</p>
                    <p className={styles.cardText}>Tipo de Habitación: {deal.roomType.name}</p>
                    <p className={styles.cardText}>Check-In: {deal.checkIn}</p>
                    <p className={styles.cardText}>Check-Out: {deal.checkOut}</p>
                    <p className={styles.cardText}>Precio: {deal.roomType.price} USD</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        {selectedTab === 4 && (
          <div>
            <p className={styles.p}>
              Reservas Canceladas en el hotel {hotelName}
            </p>
            <ul>
              {noCancelledReservations ? (
                <p className={styles.dontExist}>No hay reservas canceladas</p>
              ) : (
                cancelledReservations.map((deal) => (
                  <li key={deal._id} className={styles.card}>
                    <p className={styles.cardID}>ID de usuario: {deal.user._id}</p>
                    <div className={styles.imageContainer}>
                      <img
                        src={
                          deal.user.image ||
                          "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                        }
                        alt="Imagen de usuario"
                      />
                    </div>
                    <p className={styles.cardText}>Email: {deal.user.email}</p>
                    <p className={styles.cardText}>Estado: {deal.status}</p>
                    <p className={styles.cardText}>Teléfono: {deal.user.phone}</p>
                    <p className={styles.cardText}>Tipo de Habitación: {deal.roomType.name}</p>
                    <p className={styles.cardText}>Check-In: {deal.checkIn}</p>
                    <p className={styles.cardText}>Check-Out: {deal.checkOut}</p>
                    <p className={styles.cardText}>Precio: {deal.roomType.price} USD</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
        {selectedTab === 5 && (
          <div>
            <p className={styles.p}>
              Todas las Reservas en el hotel {hotelName}
            </p>
            <ul>
              {noAllReservations ? (
                <p className={styles.dontExist}>No hay reservas</p>
              ) : (
                allReservations.map((deal) => (
                  <li key={deal._id} className={styles.card}>
                    <p className={styles.cardID}>ID de usuario: {deal.user._id}</p>
                    <div className={styles.imageContainer}>
                      <img
                        src={
                          deal.user.image ||
                          "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
                        }
                        alt="Imagen de usuario"
                      />
                    </div>
                    <p className={styles.cardText}>Email: {deal.user.email}</p>
                    <p className={styles.cardText}>Estado: {deal.status}</p>
                    <p className={styles.cardText}>Teléfono: {deal.user.phone}</p>
                    <p className={styles.cardText}>Tipo de Habitación: {deal.roomType.name}</p>
                    <p className={styles.cardText}>Check-In: {deal.checkIn}</p>
                    <p className={styles.cardText}>Check-Out: {deal.checkOut}</p>
                    <p className={styles.cardText}>Precio: {deal.roomType.price} USD</p>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sales;
