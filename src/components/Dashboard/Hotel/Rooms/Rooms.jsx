import React, { useState } from "react";
import styles from "./Rooms.module.css";
import { RiProhibitedLine } from "react-icons/ri";
import { MdOutlineDryCleaning, MdSevereCold } from "react-icons/md";
import { FaBath, FaHotjar } from "react-icons/fa";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { IoMdWine } from "react-icons/io";
import Swal from "sweetalert2";
import axios from "axios";
import { URL_FINDHOTEL } from "../../../../const/const";

const Room = () => {
  const userId = "64e8277eef72051c7494bca0";
  const [rooms, setRooms] = useState(
    [{ nameRoom: "", quantity: "", price: "", services: [] }],
    
  );
  const [noServiceSelected, setNoServiceSelected] = useState(false);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRooms = [...rooms];
    newRooms[index][name] = value;
    setRooms(newRooms);
  };

  const handleCheckboxChange = (index, service) => {
    const newRooms = [...rooms];
    const selectedServices = newRooms[index].services;

    if (selectedServices.includes(service)) {
      newRooms[index].services = selectedServices.filter(s => s !== service);
    } else {
      newRooms[index].services = [...selectedServices, service];
    }

    setRooms(newRooms);

    if (service === "NoService") {
      setNoServiceSelected(!noServiceSelected);
    }
  };
  const sendData = (roomData) => {
    axios
      .post(`${URL_FINDHOTEL}/roomType/${userId}`, roomData)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };

  const handleAddRoom = () => {
    const newRoom = {
      name: rooms[rooms.length - 1].nameRoom,
      stock: rooms[rooms.length - 1].quantity,
      price: rooms[rooms.length - 1].price,
      services: rooms[rooms.length - 1].services,
      isActive: true
    };
 
    console.log("New Room:", newRoom);
    setRooms([...rooms, newRoom]);
    sendData(newRoom);
  };

  const handleRemoveRoom = (index) => {
    if (rooms.length > 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const newRooms = [...rooms];
          newRooms.splice(index, 1);
          setRooms(newRooms);

          Swal.fire("Deleted!", "Your room has been removed.", "success");
        }
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>REGISTER YOURS TYPE ROOMS</h1>
      <p className={styles.text}>
        Please make a record for each type of room that your hotel has
      </p>
      {rooms.map((room, index) => (
        <div key={index} className={styles.roomEntry}>
          <h2 className={styles.typeroom}>ROOM TYPE # {index + 1}</h2>
          <label className={styles.label} htmlFor={`type${index}`}>
            Room Name:
          </label>
          <input
            className={styles.input}
            type="text"
            id={`nameRoom${index}`}
            name="nameRoom"
            value={rooms[index].nameRoom}
            onChange={(event) => handleInputChange(index, event)}
          />

          <label className={styles.label} htmlFor={`quantity${index}`}>
            Stock:
          </label>
          <input
            className={styles.input}
            type="number"
            id={`quantity${index}`}
            name="quantity"
            value={rooms[index].quantity}
            onChange={(event) => handleInputChange(index, event)}
          />
          <label className={styles.label} htmlFor={`quantity${index}`}>
            Price:
          </label>
          <input
            className={styles.input}
            type="number"
            id={`price${index}`}
            name="price"
            value={rooms[index].price}
            onChange={(event) => handleInputChange(index, event)}
          />
          <div>
            <label className={styles.label}>
              <RiProhibitedLine className={styles.icon} />{" "}
              <input
                type="checkbox"
                name="NoService"
                checked={rooms[index].services.includes("NoService")}
                value="NoService"
                onChange={() => handleCheckboxChange(index, "NoService")}
              />
              No Services are available
            </label>
            <label className={styles.label}>
              <MdOutlineDryCleaning className={styles.icon} />{" "}
              <input
                type="checkbox"
                name="RoomService"
                checked={rooms[index].services.includes("RoomService")}
                disabled={noServiceSelected}
                value="RoomService"
                onChange={() => handleCheckboxChange(index, "RoomService")}
              />
              Room Service
            </label>
            <label className={styles.label}>
              <FaBath className={styles.icon} />{" "}
              <input
                type="checkbox"
                name="jacuzzi"
                checked={rooms[index].services.includes("jacuzzi")}
                disabled={noServiceSelected}
                value="jacuzzi"
                onChange={() => handleCheckboxChange(index, "jacuzzi")}
              />
              Jacuzzi
            </label>
            <label className={styles.label}>
              <CgSmartHomeRefrigerator className={styles.icon} />{" "}
              <input
                type="checkbox"
                name="fridge"
                checked={rooms[index].services.includes("fridge")}
                disabled={noServiceSelected}
                value="fridge"
                onChange={() => handleCheckboxChange(index, "fridge")}
              />
              Fridge
            </label>
            <label className={styles.label}>
              <IoMdWine className={styles.icon} />{" "}
              <input
                type="checkbox"
                name="bar"
                checked={rooms[index].services.includes("bar")}
                disabled={noServiceSelected}
                value="bar"
                onChange={() => handleCheckboxChange(index, "bar")}
              />
              Bar
            </label>
            <label className={styles.label}>
              <FaHotjar className={styles.icon} />{" "}
              <input
                type="checkbox"
                name="heater"
                checked={rooms[index].services.includes("heater")}
                disabled={noServiceSelected}
                value="heater"
                onChange={() => handleCheckboxChange(index, "heater")}
              />
              Heater
            </label>
            <label className={styles.label}>
              <MdSevereCold className={styles.icon} />{" "}
              <input
                type="checkbox"
                name="air-conditioning"
                checked={rooms[index].services.includes("air-conditioning")}
                disabled={noServiceSelected}
                value="air-conditioning"
                onChange={() => handleCheckboxChange(index, "air-conditioning")}
              />
              Air Conditioning
            </label>
          </div>

          {rooms.length > 1 && (
            <button
              className={styles.removeBottom}
              onClick={() => handleRemoveRoom(index)}
            >
              Remove Room
            </button>
          )}
          <hr className={styles.horizontalLine} />
        </div>
      ))}
      <button className={styles.addRoomButton} onClick={handleAddRoom}>
        Add Room
      </button>
    </div>
  );
};

export default Room;
