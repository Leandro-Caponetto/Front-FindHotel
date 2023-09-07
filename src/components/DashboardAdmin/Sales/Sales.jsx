import React from "react";
import { useState, useEffect } from "react";
import styles from "./Sales.module.css";


function Sales() {
  const [selectedTab, setSelectedTab] = useState(1);
  const [hotelData, setHotelData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (tabNumber) => {
    setSelectedTab(tabNumber);
  };

  const handleDeactivateHotel = (hotelId) => {
    fetch(`https://backendfindhotel-dev.fl0.io/admin/hotelDesactive/${hotelId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          // Actualizar el estado de los hoteles después de la desactivación
          setHotelData((prevData) =>
            prevData.map((hotel) =>
              hotel._id === hotelId ? { ...hotel, isActive: false } : hotel
            )
          );
          console.log("Hotel desactivado exitosamente.");
        } else {
          console.error("Error al desactivar el hotel.");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud PUT:", error);
      });
  };

  const handleDeactivateUser = (userId) => {
    const requestBody = {
      id_userUpdate: userId,
      atts_userUpdate: {
        status: "inactive"
      }
    };

    fetch("https://backendfindhotel-dev.fl0.io/admin/userUpdated", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then((response) => {
        if (response.ok) {
          // Actualizar el estado de los usuarios después de la desactivación
          setUserData((prevData) =>
            prevData.map((user) =>
              user._id === userId ? { ...user, status: "inactive" } : user
            )
          );
          console.log("Usuario desactivado exitosamente.");
        } else {
          console.error("Error al desactivar el usuario.");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud PUT:", error);
      });
  };

  useEffect(() => {
    if (selectedTab === 1) {
      setIsLoading(true);

      fetch("https://backendfindhotel-dev.fl0.io/admin/allHotels")
        .then((response) => response.json())
        .then((data) => {
          setHotelData(data.hotels);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching hotel data:", error);
          setIsLoading(false);
        });
    }

    if (selectedTab === 2) {
      setIsLoading(true);

      fetch("https://backendfindhotel-dev.fl0.io/admin/allUsers")
        .then((response) => response.json())
        .then((data) => {
          setUserData(data.users);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setIsLoading(false);
        });
    }
  }, [selectedTab]);

  return (
    <div>
      <h1 className={styles.text}>MANAGE YOUR FINDHOTEL</h1>
      <ul className={styles.menu}>
        <li
          className={selectedTab === 1 ? styles.active : ""}
          onClick={() => handleTabChange(1)}
        >
          Active Hotels
        </li>
        <li
          className={selectedTab === 2 ? styles.active : ""}
          onClick={() => handleTabChange(2)}
        >
          Active Users
        </li>
        {/* Other tabs */}
      </ul>
      <div className={styles.content}>
        {selectedTab === 1 ? (
          isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {hotelData.map((hotel) => (
                <li key={hotel._id} className={styles.hotel}>
                  {hotel.image && hotel.image[0] && hotel.image[0].src && (
                    <img src={hotel.image[0].src} alt={hotel.name} />
                  )}
                  <h2>{hotel.name}</h2>
                  <p>Category: {hotel.category}</p>
                  <p>Estado: {hotel.isActive ? "Activo" : "Inactivo"}</p>
                  <button onClick={() => handleDeactivateHotel(hotel._id)}>
                    Desactivar Hotel
                  </button>
                  {/* Otros datos del hotel */}
                </li>
              ))}
            </ul>
          )
        ) : selectedTab === 2 ? (
          isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {userData.map((user) => (
                <li key={user._id} className={styles.user}>
                  <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                  <h2>{user.firstName} {user.lastName}</h2>
                  <p>Email: {user.email}</p>
                  <p>Estado: {user.status === "active" ? "Activo" : "Inactivo"}</p>
                  <button onClick={() => handleDeactivateUser(user._id)}>
                    Desactivar Usuario
                  </button>
                  {/* Otros datos del usuario */}
                </li>
              ))}
            </ul>
          )
        ) : (
          // Render content for other tabs
          <>
            {selectedTab === 3 && <p>Contenido de la Pestaña 3</p>}
            {selectedTab === 4 && <p>Contenido de la Pestaña 4</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default Sales;