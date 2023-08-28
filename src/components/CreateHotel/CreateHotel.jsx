import axios from 'axios';
import styles from "./CreateHotel.module.css";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchCity } from '../../redux/countries';
import { InputNumber, InputSelect, InputText } from '../Inputs';
// import CheckBox from '../Inputs/CheckBox/CheckBox';

const CreateHotel = () => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const citys = useSelector(state => state.countries.city)

  useEffect(() => {
    dispatch(fetchCountries()); // Llama a la acción para obtener los países al cargar el componente
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchCity(curCountry))
  // }, [dispatch, curCountry])

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
      stock: '',
      price: '',
    },
    services: [],
    facilities: [],
    roomService: false,
    wifi: false,
    isActive: true,
  })

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
  }


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
      newErrors.room.name = 'Room name is required';
    }

    if (!hotelData.room.price) {
      newErrors.room.price = 'Room price is required';
    }

    if (!hotelData.room.stock) {
      newErrors.room.stock = 'Room stock is required';
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
        price: hotelData.room.price,
        stock: hotelData.room.stock,
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


  const handlerValueChange = (inputField, inputValue) => {
    let currentState = {}
    if (inputField === 'typeRoom' || inputField === 'stock' || inputField === 'price') {
      let field = inputField === 'typeRoom' ? 'name' : inputField
      currentState = { ...hotelData, room: { ...hotelData.room, [field]: inputValue } }
    } else { currentState = { ...hotelData, [inputField]: inputValue } }
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
              <InputText tag={'Name Hotel'}
                initInput={hotelData.name}
                onChangeInput={(input) => handlerValueChange('name', input)}
                errors={errors.name}
                style={{ flexDirection: 'row', gap: '12px', input: { width: '200px', height: '40px' }, h3: { fontSize: '20px' } }} />
            </div>

            <div>
              <InputText tag={'Image'}
                initInput={hotelData.image}
                onChangeInput={(input) => handlerValueChange('image', input)}
                errors={errors.image}
                style={{ flexDirection: 'row', gap: '12px', input: { width: '200px', height: '40px' }, h3: { fontSize: '20px' } }} />
            </div>
          </div>

          <div className={styles.details}>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <div>
                  <InputSelect tag={'Country'}
                    initSelect={hotelData.country}
                    options={countries.countries}
                    onChangeSelect={(input) => handlerValueChange('country', input)}
                    errors={errors.country}
                  />
                </div>
                {errors.country && <p className={styles.error}>{errors.country}</p>}
              </div>

              <div>
                <InputSelect tag={'City'}
                  initSelect={hotelData.city}
                  options={citys}
                  onChangeSelect={(input) => handlerValueChange('city', input)}
                  errors={errors.city}
                />
                {errors.city && <p className={styles.error}>{errors.city}</p>}
              </div>
            </div>

            <div>
              <InputText tag={'Address'}
                initInput={hotelData.address}
                onChangeInput={(input) => handlerValueChange('address', input)}
                errors={errors.address}
                style={{ flexDirection: 'row', gap: '12px', input: { width: '200px', height: '40px' }, h3: { fontSize: '20px' } }} />
            </div>

            <div>
              <label>Category (stars):</label>
              <InputNumber tag={'Category'}
                initInput={hotelData.category}
                onChangeInput={(input) => handlerValueChange('category', input)}
                errors={errors.category}
                style={{ flexDirection: 'row', gap: '12px', input: { width: '200px', height: '40px' }, h3: { fontSize: '20px' } }} />
            </div>

            <div>
              <InputSelect tag={'Type Room'}
                initSelect={hotelData.room.name}
                options={['standar']}
                onChangeSelect={(input) => handlerValueChange('typeRoom', input)}
              // errors={errors.room.name}
              />
            </div>

            <div>
              <label>Stock:</label>
              <InputNumber tag={'Stock'}
                initInput={hotelData.room.stock}
                onChangeInput={(input) => handlerValueChange('stock', input)}
                // errors={errors.room.stock}
                style={{ flexDirection: 'row', gap: '12px', input: { width: '200px', height: '40px' }, h3: { fontSize: '20px' } }} />
            </div>

            <div>
              <InputNumber tag={'Price'}
                initInput={hotelData.room.price}
                onChangeInput={(input) => handlerValueChange('price', input)}
                // errors={errors.room.price}
                style={{ flexDirection: 'row', gap: '12px', input: { width: '200px', height: '40px' }, h3: { fontSize: '20px' } }} />
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
      </div >
    </div >)
}

export default CreateHotel;