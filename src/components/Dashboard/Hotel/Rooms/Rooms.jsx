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
  const [rooms, setRooms] = useState([
    { nameRoom: "", quantity: "", busy: "", free: "", price: "", services: [] },
  ]);
  const [noServiceSelected, setNoServiceSelected] = useState(false);
  const [errorMessages, setErrorMessages] = useState({
    nameRoom: "",
    quantity: "",
    busy: "",
    free: "",
    price: "",
  });

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRooms = [...rooms];
    if (name === "quantity" || name === "free" || name === "busy" || name === "price") {
      // Verificar si el valor no es un número o es un número negativo
      if (!Number.isInteger(Number(value)) || Number(value) < 0) {
        setErrorMessages((prevMessages) => ({
          ...prevMessages,
          [name]: "Este campo debe ser un número entero no negativo.",
        }));
        return;
      }
    }
    newRooms[index][name] = value;

    if ((name === "free" || name === "busy") && newRooms[index].free !== "" && newRooms[index].busy !== "") {
      const free = parseInt(newRooms[index].free) || 0;
      const busy = parseInt(newRooms[index].busy) || 0;
      const quantity = free + busy;
  
      if (quantity < 0) {
        setErrorMessages((prevMessages) => ({
          ...prevMessages,
          quantity: "La suma de 'Free' y 'Busy' no puede ser negativa.",
        }));
      } else {
        newRooms[index].quantity = quantity;
        setErrorMessages((prevMessages) => ({
          ...prevMessages,
          quantity: "", 
        }));
      }
    }
  
    setRooms(newRooms);
  
    if (value.trim() === "") {
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        [name]: "This field is required",
      }));
    } else {
      setErrorMessages((prevMessages) => ({
        ...prevMessages,
        [name]: "",
      }));
    }
  };
  const handleCheckboxChange = (index, service) => {
    const newRooms = [...rooms];
    const selectedServices = newRooms[index].services;
  
    if (service === "no services") {
      if (selectedServices.includes("no services")) {
        // Si "No Services" ya estaba seleccionado, deseléctalo
        newRooms[index].services = selectedServices.filter((s) => s !== "no services");
        setNoServiceSelected(false);
      } else {
        // Si "No Services" no estaba seleccionado, selecciónalo y deselecciona los otros servicios
        newRooms[index].services = ["no services"];
        setNoServiceSelected(true);
  
        // También deselecciona los otros servicios
        const otherServices = ["room service", "jacuzzi", "fridge", "bar", "heater", "air-conditioning"];
        otherServices.forEach((otherService) => {
          newRooms[index].services = newRooms[index].services.filter((s) => s !== otherService);
        });
      }
    } else {
      // Si se selecciona cualquier otro servicio, asegúrate de que "No Services" esté deseleccionado
      setNoServiceSelected(false);
  
      if (selectedServices.includes("no services")) {
        // Si "No Services" estaba seleccionado anteriormente, quítalo
        newRooms[index].services = selectedServices.filter((s) => s !== "no services");
      }
  
      if (selectedServices.includes(service)) {
        // Si el servicio ya está seleccionado, quítalo
        newRooms[index].services = selectedServices.filter((s) => s !== service);
      } else {
        // Agrega el servicio seleccionado
        newRooms[index].services = [...selectedServices, service];
      }
    }
  
    setRooms(newRooms);
  };
  // const sendData = (roomData) => {
  //   axios
  //     .post(`https://backendfindhotel-dev.fl0.io/roomType/${userId}`, roomData)
  //     .then((response) => {
  //       console.log("Respuesta del servidor:", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error en la solicitud:", error);
  //     });
  // };

  const handleAddRoom = () => {
    const newRoom = {
      name: rooms[rooms.length - 1].nameRoom,
      stock: rooms[rooms.length - 1].quantity,
      price: rooms[rooms.length - 1].price,
      busy: rooms[rooms.length - 1].busy,
      free: rooms[rooms.length - 1].free,
      services: noServiceSelected ? ["no services"] : rooms[rooms.length - 1].services,
      isActive: true,
    };

    console.log("New Room:", newRoom);
    if (!validateFields(newRoom)) {
      return; // Si los campos no son válidos, no continúes con la solicitud POST
    }
    axios

      .post(`${URL_FINDHOTEL}/roomType/${userId}`, roomData)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);

        setRooms([...rooms, newRoom]);

        Swal.fire({
          title: "Room Created!",
          text: "Your room has been created successfully.",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);

        Swal.fire({
          title: "Error!",
          text: "An error occurred while creating the room. All fields are required.",
          icon: "error",
        });
      });
  };
  const validateFields = (room) => {
    // Realiza la validación de campos aquí
    if (!room.name || !room.stock || !room.price || !room.busy || !room.free) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
      });
      return false;
    }
    return true;
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
          <label className={styles.label} htmlFor={`nameRoom${index}`}>
            Room Name:
          </label>
          <input
            className={styles.input}
            type="text"
            id={`nameRoom${index}`}
            name="nameRoom"
            value={rooms[index].nameRoom}
            onChange={(event) => handleInputChange(index, event)}
            required
          />
          {errorMessages.nameRoom && (
            <p className={styles.error}>{errorMessages.nameRoom}</p>
          )}
          
          <label className={styles.label} htmlFor={`free${index}`}>
            Rooms Free:
          </label>
          <input
            className={styles.input}
            type="number"
            id={`free${index}`}
            name="free"
            value={rooms[index].free}
            onChange={(event) => handleInputChange(index, event)}
            required
          />
          {errorMessages.free && (
            <p className={styles.error}>{errorMessages.free}</p>
          )}
          <label className={styles.label} htmlFor={`busy${index}`}>
            Rooms Busy:
          </label>
          <input
            className={styles.input}
            type="number"
            id={`busy${index}`}
            name="busy"
            value={rooms[index].busy}
            onChange={(event) => handleInputChange(index, event)}
            required
          />
          {errorMessages.busy && (
            <p className={styles.error}>{errorMessages.busy}</p>
          )}
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
            required
          />
          {errorMessages.quantity && (
            <p className={styles.error}>{errorMessages.quantity}</p>
          )}
          <label className={styles.label} htmlFor={`price${index}`}>
            Price:
          </label>
          <input
            className={styles.input}
            type="number"
            id={`price${index}`}
            name="price"
            value={rooms[index].price}
            onChange={(event) => handleInputChange(index, event)}
            required
          />
          {errorMessages.price && (
            <p className={styles.error}>{errorMessages.price}</p>
          )}
          <div>
            <label className={styles.label}>
              <RiProhibitedLine className={styles.icon} />{" "}
              <input
                type="checkbox"
                name="no services"
                checked={rooms[index].services.includes("no services")}
                value="no services"
                onChange={() => handleCheckboxChange(index, "no services")}
              />
              No Services are available
            </label>
            <label className={styles.label}>
              <MdOutlineDryCleaning className={styles.icon} />{" "}
              <input
                type="checkbox"
                name="room service"
                checked={rooms[index].services.includes("room service")}
                disabled={noServiceSelected}
                value="room service"
                onChange={() => handleCheckboxChange(index, "room service")}
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
