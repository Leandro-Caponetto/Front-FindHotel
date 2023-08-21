import axios from 'axios';
import styles from "./CreateHotel.module.css";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchCity } from '../../redux/countries';
import { InputText } from '../Inputs';

const CreateHotel = () => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const citys = useSelector(state => state.countries.city)

  useEffect(() => {
    dispatch(fetchCountries()); // Llama a la acción para obtener los países al cargar el componente
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCity(curCountry))
  }, [dispatch, curCountry])

  const [curCountry, setCurCountry] = useState("")
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const [errors, setErrors] = useState({})
  const [hotelData, setHotelData] = useState({
    name: '',
    image: '',
    country: '',
    city: '',
    address: '',
    category: '',
    room: {
      name: '',
      roomStock: '',
      roomPrice: '',
    },
    services: [],
    facilities: [],
    roomService: false,
    wifi: false,
    isActive: true,
  })

  useEffect(() => {
    dispatch(fetchCountries()); // Llama a la acción para obtener los países al cargar el componente
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCity(curCountry))
  }, [dispatch, curCountry])

  useEffect(() => {
    //? Get Data from localStorage
    const storedData = JSON.parse(localStorage.getItem('hotelData'));
    if (storedData) {
      console.log(storedData)
      setHotelData({ ...storedData });
    }
  }, []);

  const handleOnChange = (event) => {
    setHotelData({
      ...hotelData,
      [event.target.name]: event.target.value
    })
    console.log("🚀 ~ file: CreateHotel.jsx:70 ~ handleOnChange ~ hotelData:", hotelData)


    // if (selectedRoomType === "standar") {
    //   setHotelData({
    //     ...hotelData,
    //     room: {
    //       ...hotelData.room, name: selectedRoomType
    //     }
    //   })
    // }
  }


  //     const nameError =validateName(name);
  //     if (nameError) {
  //         errors.name = nameError
  //     }

  //     const imageError = validateImage(image);
  //     if(imageError){
  //         errors.image = imageError
  //     }

  //     setErrors(errors);

  // }

  const handleRoomTypesChange = (event) => {
    const selectedRoomType = event.target.value;
    console.log(selectedRoomType);

    if (selectedRoomType === "standar") {
      setHotelData({
        ...hotelData,
        room: {
          ...hotelData.room, name: selectedRoomType
        }
      })
    }
  };

  const handleServicesChange = (event) => {
    const serviceValue = event.target.value;
    if (event.target.checked) {
      setSelectedServices((prevServices) => [...prevServices, serviceValue]);
    } else {
      setSelectedServices((prevServices) =>
        prevServices.filter((service) => service !== serviceValue)
      );
    }
  };

  const handleFacilitiesChange = (event) => {
    const facilityValue = event.target.value;
    if (event.target.checked) {
      setSelectedFacilities((prevFacilities) => [...prevFacilities, facilityValue]);
    } else {
      setSelectedFacilities((prevFacilities) =>
        prevFacilities.filter((facility) => facility !== facilityValue)
      );
    }
  };

  const handleCountry = (event) => {
    const { value } = event.target;
    setCurCountry(value)
    setHotelData((prevData) => ({
      ...prevData,
      country: value,
    }))

  }

  const handleCity = (event) => {
    const { value } = event.target;
    setHotelData((prevData) => ({
      ...prevData,
      city: value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!hotelData.name) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\s]*$/.test(hotelData.name)) {
      newErrors.name = 'Name should only contain letters and spaces';
    } else if (hotelData.name.length > 50) {
      newErrors.name = 'Name should be no more than 50 characters';
    }

    if (!hotelData.image) {
      newErrors.image = 'Image URL is required';
    }

    if (!hotelData.country) {
      newErrors.country = 'Country is required';
    }

    if (!hotelData.city) {
      newErrors.city = 'City is required';
    }

    if (!hotelData.address) {
      newErrors.address = 'Address is required';
    }

    if (!hotelData.category) {
      newErrors.category = 'Category is required';
    }

    if (!hotelData.room.name) {
      newErrors.roomName = 'Room name is required';
    }

    if (!hotelData.room.price) {
      newErrors.roomPrice = 'Room price is required';
    }

    if (!hotelData.room.stock) {
      newErrors.roomStock = 'Room stock is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToSend = {
      name: hotelData.name,
      category: hotelData.category,
      facilities: selectedFacilities,
      services: selectedServices,
      image: hotelData.image,
      room: {
        name: hotelData.room.name,
        price: hotelData.roomPrice,
        stock: hotelData.roomStock,
      },
      country: hotelData.country,
      city: hotelData.city,
      address: hotelData.address,
    };

    console.log('Data to send:', dataToSend);

    axios.post('http://localhost:3001/hotel', dataToSend)
      .then((response) => {
        console.log('Response from server:', response.data);
        setIsSubmitted(true);
        setHotelData({
          name: '',
          image: '',
          country: '',
          city: '',
          address: '',
          category: '',
          room: {
            name: '',     // Reset room name
            price: '',
            stock: '',
          },
          services: [],
          facilities: [],
          roomService: false,
          wifi: false,
          isActive: true,
        });
        setSelectedRoomTypes([]);
        setSelectedServices([]);
        setSelectedFacilities([]);
        setErrors({});

        //? Clear localStorage
        localStorage.removeItem('hotelData');
      })
      .catch((error) => {
        console.error('Error during POST request:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setErrors({ server: 'The hotel with this name already exists. Please choose a different name.' });
        } else {
          setErrors({ server: 'Something went wrong. Please try again later.' });
        }
      });
  };


  const handleInputChange = (inputField, inputValue) => {
    const currentState = { ...hotelData, [inputField]: inputValue }
    setHotelData(currentState);

    //?Save On LocalStorage
    localStorage.setItem('hotelData', JSON.stringify(currentState));
    console.log(hotelData)
  };



  return (
    <div className={styles.container}>
      <div className={styles.boxForm}>
        <form className={styles.form} autoComplete="off">

          <div className={styles.index}>
            <div>
              <InputText initInput={hotelData.name} onChangeInput={(input) => handleInputChange('name', input)} tag={'Name Hotel'} errors={errors.name} />
              {/* <label>Name Hotel:</label>
              <input type="text" name="name" value={hotelData.name} onChange={handleOnChange} />
              {errors.name && <p className={styles.error}>{errors.name}</p>} */}
            </div>

            <div>
              <label>Image:</label>
              <InputText initInput={hotelData.image} onChangeInput={(input) => handleInputChange('image', input)} style={{ input: { width: '100px' } }} />
              {/* <input type="text" name="image" value={hotelData.image} onChange={handleOnChange} />
              {errors.image && <p className={styles.error}>{errors.image}</p>} */}
            </div>
          </div>

          <div className={styles.details}>

            <div>
              <label>Country:</label>
              <select name="country" id="country" onChange={handleCountry} >
                <option value="none" selected disabled hidden>Select an Option</option>
                {
                  countries.countries.map((data, index) => {
                    return (
                      <option value={data} key={index}>{data}</option>
                    )
                  })
                }
              </select>
              {errors.country && <p className={styles.error}>{errors.country}</p>}
            </div>

            <div>
              <label>City:</label>
              <select name="city" id="city" onChange={handleCity} >
                <option value="none" selected disabled hidden>Select an Option</option>
                {
                  citys.map((data, index) => {
                    return (
                      <option value={data} key={index}>{data}</option>
                    )
                  })
                }
              </select>
              {errors.city && <p className={styles.error}>{errors.city}</p>}
            </div>

            <div>
              <label>Adress:</label>
              <input type="text" name="address" value={hotelData.address} onChange={handleOnChange} />
              {errors.address && <p className={styles.error}>{errors.address}</p>}
            </div>

            <div>
              <label>Category (stars):</label>
              <input type="number" name="category" value={hotelData.category} onChange={handleOnChange} />
              {errors.category && <p className={styles.error}>{errors.category}</p>}
            </div>

            <p>Habitaciones:</p>

            <div>
              <label >Selecciona el tipo:</label>
              <select name="roomTypes" id="roomTypes" onChange={handleRoomTypesChange} >
                <option value="none" selected disabled hidden>Select an Option</option>
                <option value="standar">Standar</option>
              </select>

            </div>

            <div>
              <label>Stock:</label>
              <input type="number" name="roomPrice" value={hotelData.roomPrice} onChange={handleOnChange} />
            </div>

            <div>
              <label>Price:</label>
              <input type="number" name="roomStock" value={hotelData.roomStock} onChange={handleOnChange} />
            </div>



            <p>Services:</p>

            <div className={styles.types}>
              <label>
                <input type="checkbox" name="type" value="all inclusive" checked={selectedServices.includes("all inclusive")} onChange={handleServicesChange} />
                all inclusive
              </label>
              <label>
                <input type="checkbox" name="type" value="breakfast" checked={selectedServices.includes("breakfast")} onChange={handleServicesChange} />
                breakfast
              </label>
              <label>
                <input type="checkbox" name="type" value="lunch" checked={selectedServices.includes("lunch")} onChange={handleServicesChange} />
                lunch
              </label>
              <label>
                <input type="checkbox" name="type" value="dinner" checked={selectedServices.includes("dinner")} onChange={handleServicesChange} />
                dinner
              </label>
              <label>
                <input type="checkbox" name="type" value="bar" checked={selectedServices.includes("bar")} onChange={handleServicesChange} />
                bar
              </label>
            </div>



          </div>
          <p>Facilities:</p>

          <div className={styles.types}>
            <label>
              <input type="checkbox" name="type" value="beach" checked={selectedFacilities.includes("beach")} onChange={handleFacilitiesChange} />
              Beach
            </label>
            <label>
              <input type="checkbox" name="type" value="swimming" checked={selectedFacilities.includes("swimming")} onChange={handleFacilitiesChange} />
              Swimming Pool
            </label>
            <label>
              <input type="checkbox" name="type" value="gym" checked={selectedFacilities.includes("gym")} onChange={handleFacilitiesChange} />
              Gym
            </label>
            <label>
              <input type="checkbox" name="type" value="parking" checked={selectedFacilities.includes("parking")} onChange={handleFacilitiesChange} />
              Parking
            </label>
            <label>
              <input type="checkbox" name="type" value="roomservice'" checked={selectedFacilities.includes("roomservice")} onChange={handleFacilitiesChange} />
              Room Service
            </label>

          </div>


          <button type="submit" onClick={handleSubmit}>CREATE</button>

        </form>
      </div>
    </div>)
}

export default CreateHotel;