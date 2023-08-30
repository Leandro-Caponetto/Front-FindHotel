import React, { useState } from "react";
import styles from "./Rooms.module.css";
import { RiProhibitedLine } from 'react-icons/ri';
import { MdOutlineDryCleaning, MdSevereCold } from 'react-icons/md';
import { FaBath, FaHotjar } from 'react-icons/fa';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { IoMdWine } from 'react-icons/io';

const Room = () => {
  const [rooms, setRooms] = useState([
    { nameRoom: "", description: "", quantity: "", price: "", options: []  },
  ]);
  const [noServiceSelected, setNoServiceSelected] = useState(false);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRooms = [...rooms];
    newRooms[index][name] = value;
    setRooms(newRooms);
  };

  const handleCheckboxChange = (index, option) => {
    const newRooms = [...rooms];
    const selectedOptions = newRooms[index].options;

    if (selectedOptions.includes(option)) {
      newRooms[index].options = selectedOptions.filter((opt) => opt !== option);
    } else {
      newRooms[index].options = [...selectedOptions, option];
    }

    setRooms(newRooms);
    console.log(newRooms);

    if (option === "NoService") {
        setNoServiceSelected(!noServiceSelected);
      }
  };

  const handleAddRoom = () => {
    setRooms([
      ...rooms,
      { nameRoom: "", description: "", quantity: "", price: "", options: [] },
    ]);
  };
  const handleRemoveRoom = (index) => {
    if (rooms.length > 1) {
        const shouldRemove = window.confirm("Are you sure you want to remove this room?");
    if (shouldRemove) {
      const newRooms = [...rooms];
      newRooms.splice(index, 1);
      setRooms(newRooms);
    }
}
  };
  
  return (
    <div className={styles.formContainer}>
        <h1 className={styles.heading}>REGISTER YOURS TYPE ROOMS</h1>
        <p className={styles.text}>Please make a record for each type of room that your hotel has</p>
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
            value={room.nameRoom}
            onChange={(event) => handleInputChange(index, event)}
          />
          <label className={styles.label} htmlFor={`description${index}`}>
            Description:
          </label>
          <textarea
            className={styles.input}
            type="text"
            id={`description${index}`}
            name="description"
            value={room.description}
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
            value={room.quantity}
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
            value={room.price}
            onChange={(event) => handleInputChange(index, event)}
          />
          <div>
            <label className={styles.label}>
            <RiProhibitedLine className={styles.icon}/> <input
                type="checkbox"
                name="NoService"
                checked={room.options.includes("NoService")}
                value="NoService"
                onChange={() => handleCheckboxChange(index, "NoService")}
              />
              No Services are available
            </label>
            <label className={styles.label}>
              <MdOutlineDryCleaning className={styles.icon}/> <input
                type="checkbox"
                name="RoomService"
                checked={room.options.includes("RoomService")}
                disabled={noServiceSelected}
                value="RoomService"
                onChange={() => handleCheckboxChange(index, "RoomService")}
              />
              Room Service
            </label>
            <label className={styles.label}>
             <FaBath className={styles.icon}/> <input
                type="checkbox"
                name="Jacuzzi"
                checked={room.options.includes("Jacuzzi")}
                disabled={noServiceSelected}
                value="Jacuzzi"
                onChange={() => handleCheckboxChange(index, "Jacuzzi")}
              />
              Jacuzzi
            </label>
            <label className={styles.label}>
             <CgSmartHomeRefrigerator className={styles.icon}/> <input
                type="checkbox"
                name="fridge"
                checked={room.options.includes("fridge")}
                disabled={noServiceSelected}
                value="fridge"
                onChange={() => handleCheckboxChange(index, "fridge")}
              />
              Fridge
            </label>
            <label className={styles.label}>
              <IoMdWine className={styles.icon}/> <input
                type="checkbox"
                name="bar"
                checked={room.options.includes("bar")}
                disabled={noServiceSelected}
                value="bar"
                onChange={() => handleCheckboxChange(index, "bar")}
              />
              Bar
            </label>
            <label className={styles.label}>
            <FaHotjar className={styles.icon}/> <input
                type="checkbox"
                name="heater"
                checked={room.options.includes("heater")}
                disabled={noServiceSelected}
                value="heater"
                onChange={() => handleCheckboxChange(index, "heater")}
              />
              Heater
            </label>
            <label className={styles.label}>
              <MdSevereCold className={styles.icon}/> <input
                type="checkbox"
                name="airConditioning"
                checked={room.options.includes("airConditioning")}
                disabled={noServiceSelected}
                value="airConditioning"
                onChange={() => handleCheckboxChange(index, "airConditioning")}
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
