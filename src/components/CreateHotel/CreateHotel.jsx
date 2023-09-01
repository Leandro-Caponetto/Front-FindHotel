import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, fetchCity } from "../../redux/countries";
import styles from "./CreateHotel.module.css";
import { MdAllInclusive, MdFreeBreakfast, MdLunchDining, MdPool, MdBed, MdAttachMoney } from 'react-icons/md';
import { GiBowlOfRice, GiMagicBroom, GiModernCity } from 'react-icons/gi';
import { IoMdWine } from 'react-icons/io';
import { FaUmbrellaBeach, FaMapMarkerAlt } from 'react-icons/fa';
import { CgGym } from 'react-icons/cg';
import { AiFillCar } from 'react-icons/ai';
import { RiHotelLine } from 'react-icons/ri';
import { BsImage, BsFillPinMapFill, BsStarFill } from 'react-icons/bs';
import { ImListNumbered } from 'react-icons/im';
import { UploadSquare } from "../Upload";
import { URL_FINDHOTEL } from '../../const/const'
import { image, style } from "d3";

const initState = {
  name: "",
  country: "",
  city: "",
  address: "",
  category: "",
  room: {
    name: "",
    stock: "",
    price: "",
  },
  services: [],
  facilities: [],
  roomService: false,
  wifi: false,
}

const MultiStepForm = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries.countries);
  const citys = useSelector((state) => state.countries.city);
  const [imageHotel, setImageHotel] = useState([])

  const [curCountry, setCurCountry] = useState("");
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({});
  const [hotelData, setHotelData] = useState(initState)

  useEffect(() => {
    dispatch(fetchCountries()); // Llama a la acción para obtener los países al cargar el componente
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCity(curCountry));
  }, [dispatch, curCountry]);

  useEffect(() => {
    //? Get Data from localStorage
    const storedData = JSON.parse(localStorage.getItem("hotelData"));
    if (storedData) {
      console.log(storedData);
      setHotelData({ ...storedData });
    }
  }, []);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleServicesChange = (event) => {
    const serviceValue = event.target.value;
    if (event.target.checked) {
      setHotelData({
        ...hotelData,
        services: [
          ...hotelData.services,
          serviceValue]
      });
    } else {
      setHotelData({
        ...hotelData,
        services: hotelData.services.filter((service) => service !== serviceValue)
      })
    }
  };

  const handlerUploadImage = (data) => {
    setImageHotel(data);
  }
  const handleFacilitiesChange = (event) => {
    const facilityValue = event.target.value;
    console.log(event.target.checked);
    if (event.target.checked) {
      setHotelData({
        ...hotelData,
        facilities: [
          ...hotelData.facilities,
          facilityValue,
        ]
      })
    } else {
      setHotelData({
        ...hotelData,
        facilities: hotelData.facilities.filter((facility) => facility !== facilityValue)
      })
    }
  };

  const handleCountry = (event) => {
    const { value } = event.target;
    setCurCountry(value);
    setHotelData((prevData) => ({
      ...prevData,
      country: value,
    }));
  };

  const handleCity = (event) => {
    const { value } = event.target;
    setHotelData((prevData) => ({
      ...prevData,
      city: value,
    }));
  };

  console.log(hotelData)
  const validate = () => {
    const newErrors = {};

    if (!hotelData.name) {
      newErrors.name = "Name is required";
    } else if (!/^[a-zA-Z\s]*$/.test(hotelData.name)) {
      newErrors.name = "Name should only contain letters and spaces";
    } else if (hotelData.name.length > 50) {
      newErrors.name = "Name should be no more than 50 characters";
    }

    if (!hotelData.image) {
      newErrors.image = "Image URL is required";
    }

    if (!hotelData.country) {
      newErrors.country = "Country is required";
    }

    if (!hotelData.city) {
      newErrors.city = "City is required";
    }

    if (!hotelData.address) {
      newErrors.address = "Address is required";
    }

    if (!hotelData.category) {
      newErrors.category = "Category is required";
    }

    if (!hotelData.room.name) {
      newErrors.roomName = "Room name is required";
    }

    if (!hotelData.room.price) {
      newErrors.roomPrice = "Room price is required";
    }

    if (!hotelData.room.stock) {
      newErrors.roomStock = "Room stock is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToSend = {
      User_id: '',
      email: '',
      ...hotelData
    };

    axios
      .post(`${URL_FINDHOTEL}/hotel`, dataToSend)
      .then(async (response) => {
        console.log("Response from server:", response.data);
        setHotelData(initState);
        setErrors({});

        // try {
        //   const [{ id, url }] = await Promise.all(files.map(uploadFile));
        //   const currentImage = {
        //     id: id,
        //     src: url,
        //     typeImage: files[0].type,
        //     size: files[0].size,
        //   }
        //   localStorage.setItem('files', JSON.stringify(currentImage));
        //   console.log(currentImage)
        // } catch (error) {
        //   console.error(error);
        // }

        //? Clear localStorage
        localStorage.removeItem("hotelData");
      })
      .catch((error) => {
        console.error("Error during POST request:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrors({
            server:
              "The hotel with this name already exists. Please choose a different name.",
          });
        } else {
          setErrors({
            server: "Something went wrong. Please try again later.",
          });
        }
      });
  };

  const handlerInputChange = (event) => {
    const { name, value } = event.target;
    let currentState = {}
    if (name === 'roomTypes' || name === 'stock' || name === 'price') {
      let field = name === 'roomTypes' ? 'name' : name
      currentState = { ...hotelData, room: { ...hotelData.room, [field]: value } }
    } else { currentState = { ...hotelData, [name]: value } }
    setHotelData(currentState);

    //?Save On LocalStorage
    localStorage.setItem('hotelData', JSON.stringify(currentState));
    console.log(hotelData)
  };

  console.log(imageHotel)
  console.log(hotelData)
  return (
    <div className={styles.registrationForm}>
      <h1 className={styles.heading}>REGISTER YOUR HOTEL</h1>
      <Form className={styles.Steps}>
        {step === 1 && (
          <div className={styles.div}>
            <Form.Group className={styles.FormGroup} controlId="step1">
              <Form.Label className={styles.formLabel}>Step 1: IMPORTANT INFORMATION </Form.Label>

              <div className={styles.inputContainer}>
                <label className={styles.atributtes}><RiHotelLine className={styles.icon} /> Name hotel:</label>
                <input className={styles.input} type="text" name="name" value={hotelData.name} onChange={handlerInputChange} />
                {errors.name && <p className={styles.error}>{errors.name}</p>}
              </div>


              <div className={styles.inputContainer}>
                <label className={styles.atributtes}><BsFillPinMapFill className={styles.icon} /> Country:</label>
                <select
                  name="country"
                  id="country"
                  onChange={handleCountry}
                >
                  <option value="none" selected disabled hidden>
                    Select an Option
                  </option>
                  {countries.map((data, index) => {
                    return (
                      <option value={data} key={index}>
                        {data}
                      </option>
                    );
                  })}
                </select>
                {errors.country && <p className={styles.error}>{errors.country}</p>}
              </div>

              <div className={styles.inputContainer}>
                <label className={styles.atributtes}><GiModernCity className={styles.icon} /> City:</label>
                <select name="city" id="city" onChange={handleCity}>
                  <option value="none" selected disabled hidden>  Select an Option </option>
                  {citys.map((data, index) => {
                    return (
                      <option value={data} key={index}> {data}</option>
                    )
                  })}
                </select>
                {errors.city && <p className={styles.error}>{errors.city}</p>}
              </div>

              <div className={styles.inputContainer}>
                <label className={styles.atributtes}><FaMapMarkerAlt className={styles.icon} /> Address:</label>
                <input className={styles.input} type="text" name="address" value={hotelData.address} onChange={handlerInputChange} />
                {errors.address && <p className={styles.error}>{errors.address}</p>}
              </div>

              <div className={styles.inputContainer}>
                <div className={styles.ImageContainer}>
                  <label className={styles.atributtes}><BsImage className={styles.icon} /> Images Hotel:</label>
                  <div className={styles.UploadImages}>
                    <UploadSquare onImageUpload={handlerUploadImage} />
                  </div>
                </div>
              </div>
            </Form.Group>
            <Button className={styles.button} onClick={handleNext}>Next</Button>
          </div>
        )}

        {step === 2 && (
          <div className={styles.div}>
            <Form.Group controlId="step2">
              <Form.Label className={styles.formLabel}>Step 2: HOTEL INFORMATION</Form.Label>
              <div className={styles.inputContainer}>
                <label className={styles.atributtes}><BsStarFill className={styles.icon} /> Category (stars):</label>
                <input className={styles.input}
                  type="number"
                  name="category"
                  value={hotelData.category}
                  onChange={handlerInputChange}
                  min={1}
                  max={5}
                />
                {errors.category && <p className={styles.error}>{errors.category}</p>}
              </div>
              <div className={styles.inputContainer}>
                <label className={styles.atributtes}><MdBed className={styles.icon} /> Type Room: </label>
                <select name="roomTypes" id="roomTypes" onChange={handlerInputChange} >
                  <option value="none" selected disabled hidden>Select an Option</option>
                  <option value="standar">Standar</option>
                </select>
              </div>
              {/* <InputSelect options={["standar"]} /> */}

              <div className={styles.inputContainer}>
                <label className={styles.atributtes}><ImListNumbered className={styles.icon} /> Stock:</label>
                <input className={styles.input} type="number" name="stock" value={hotelData.room.stock} onChange={handlerInputChange} min={1} />
                {errors.address && <p className={styles.error}>{errors.address}</p>}
              </div>
              {/* <div>
                <label className={styles.label}></label>
                <InputText
                  tag={"Stock"}
                  initInput={hotelData.stock}
                  onChangeInput={(input) => handleInputChange("stock", input)}
                  style={{flexDirection:"row" ,  h3:{fontSize:"20px", fontFamily:"Georgia"}, input:{width:"100px"}}}
                /> */}

              <div className={styles.inputContainer}>
                <label className={styles.atributtes}><MdAttachMoney className={styles.icon} /> Price:</label>
                <input className={styles.input} type="number" name="price" value={hotelData.room.price} onChange={handlerInputChange} min={1} />
                {/* <InputText
                  tag={"Price"}
                  initInput={hotelData.price}
                  onChangeInput={(input) => handleInputChange("price", input)}
                  style={{flexDirection:"row" ,  h3:{fontSize:"20px", fontFamily:"Georgia"}, input:{width:"100px"}}}
                /> */}
                {/* <input type="number" name="roomStock" value={hotelData.roomStock} onChange={handleOnChange} /> */}
              </div>
            </Form.Group>
            <div className={styles.align}>
              <Button className={styles.button} onClick={handlePrevious}>Prev</Button>
              <Button className={styles.button} onClick={handleNext}>Next</Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div >
            <Form.Group controlId="step3">
              <Form.Label className={styles.formLabel} >Step 3: CHOOSE THE SERVICES THAT SUIT YOUR HOTEL</Form.Label>

              <div className={styles.column} >
                <label className={styles.label}>
                  <MdAllInclusive className={styles.icon} /> <input
                    type="checkbox"
                    name="type"
                    value="all inclusive"
                    checked={hotelData.services.includes("all inclusive")}
                    onChange={handleServicesChange}
                  />
                  all inclusive
                </label>
                <label className={styles.label}>
                  <MdFreeBreakfast className={styles.icon} /> <input
                    type="checkbox"
                    name="type"
                    value="breakfast"
                    checked={hotelData.services.includes("breakfast")}
                    onChange={handleServicesChange}
                  />
                  breakfast
                </label>
                <label className={styles.label}>
                  <GiBowlOfRice className={styles.icon} /> <input
                    type="checkbox"
                    name="type"
                    value="lunch"
                    checked={hotelData.services.includes("lunch")}
                    onChange={handleServicesChange}
                  />
                  lunch
                </label>
                <label className={styles.label}>
                  <MdLunchDining className={styles.icon} />  <input
                    type="checkbox"
                    name="type"
                    value="dinner"
                    checked={hotelData.services.includes("dinner")}
                    onChange={handleServicesChange}
                  />
                  dinner
                </label>
                <label className={styles.label}>
                  <IoMdWine className={styles.icon} /> <input
                    type="checkbox"
                    name="type"
                    value="bar"
                    checked={hotelData.services.includes("bar")}
                    onChange={handleServicesChange}
                  />
                  bar
                </label>

                <label className={styles.label}>
                  <FaUmbrellaBeach className={styles.icon} /> <input
                    type="checkbox"
                    name="type"
                    value="beach"
                    checked={hotelData.facilities.includes("beach")}
                    onChange={handleFacilitiesChange}
                  />
                  Beach
                </label>
                <label className={styles.label}>
                  <MdPool className={styles.icon} /> <input
                    type="checkbox"
                    name="type"
                    value="swimming"
                    checked={hotelData.facilities.includes("swimming")}
                    onChange={handleFacilitiesChange}
                  />
                  Swimming Pool
                </label>
                <label className={styles.label}>
                  <CgGym className={styles.icon} /> <input
                    type="checkbox"
                    name="type"
                    value="gym"
                    checked={hotelData.facilities.includes("gym")}
                    onChange={handleFacilitiesChange}
                  />
                  Gym
                </label>
                <label className={styles.label}>
                  <AiFillCar className={styles.icon} /> <input
                    type="checkbox"
                    name="type"
                    value="parking"
                    checked={hotelData.facilities.includes("parking")}
                    onChange={handleFacilitiesChange}
                  />
                  Parking
                </label >
                <label className={styles.label}>
                  <GiMagicBroom className={styles.icon} /> <input
                    type="checkbox"
                    name="type"
                    value="roomservice"
                    checked={hotelData.facilities.includes("roomservice")}
                    onChange={handleFacilitiesChange}
                  />
                  Room Service
                </label>
              </div>
            </Form.Group >

            <div className={styles.centerButton}>
              <Button className={styles.button} onClick={handlePrevious}>Prev</Button>
              <Button className={styles.buttonCreate} type="submit" onClick={handleSubmit}>
                CREATE
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default MultiStepForm;
