import axios from 'axios';
import styles from "./CreateHotel.module.css";
import { useState } from "react"

const CreateHotel = () => {

    const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedFacilities, setSelectedFacilities] = useState([]);

    

    const [isSubmitted, setIsSubmitted] = useState(false);


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

    const [errors, setErrors] = useState({})

    const handleOnChange = (event) =>{
        setHotelData({
            ...hotelData,
            [event.target.name]: event.target.value
        })
    }

    // const validate = ({name, image, hp, attack, defense, speed, height, weight}) => {
    //     const errors = {};

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
            // setHotelData((prevData) => ({
            //   ...prevData,
            //   room: {
            //     ...prevData.room,
            //     name: selectedRoomType
            //   }
            // }));
            setHotelData({...hotelData,
            room: {
                ...hotelData.room, name:selectedRoomType
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

    if (validate()) {
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

      axios
        .post('http://localhost:3001/hotel', dataToSend)
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
              name: '',
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
        })
        .catch((error) => {
          console.error('Error during POST request:', error);
          if (error.response && error.response.data && error.response.data.message) {
            setErrors({ server: 'The hotel with this name already exists. Please choose a different name.' });
          } else {
            setErrors({ server: 'Something went wrong. Please try again later.' });
          }
        });
    }
  };

  

    return(
        <div className={styles.container}>
        <div className={styles.boxForm}>
          <form className={styles.form} autoComplete="off">
    
            <div className={styles.index}>
                <div>
                    <label>Name Hotel:</label>
                    <input type="text" name="name" value={hotelData.name} onChange={handleOnChange}/>
                    {errors.name && <p className={styles.errors}>{errors.name}</p>}
                    
                </div>
    
                <div>
                    <label>Image:</label>
                    <input type="text" name="image" value={hotelData.image} onChange={handleOnChange}/>
                    {errors.image && <p className={styles.errors}>{errors.image}</p>}
                </div>
            </div>
    
            <div className={styles.details}>
    
            <div>
            <label>Country:</label>
            <input type="text" name="country" value={hotelData.country} onChange={handleOnChange}/>
            {errors.country && <p className={styles.errors}>{errors.country}</p>}
            </div>
    
            <div>
            <label>City:</label>
            <input type="text" name="city" value={hotelData.city} onChange={handleOnChange}/>
            {errors.city && <p className={styles.errors}>{errors.city}</p>}
            </div>

            <div>
            <label>Adress:</label>
            <input type="text" name="address" value={hotelData.address} onChange={handleOnChange}/>
            {errors.address && <p className={styles.errors}>{errors.address}</p>}
            </div>
    
            <div>
            <label>Category (stars):</label>
            <input type="number" name="category" value={hotelData.category} onChange={handleOnChange}/>
            {errors.category && <p className={styles.errors}>{errors.category}</p>}
            </div>

            <p>Rooms:</p>
    
            <div>
            <label >Selecciona el tipo:</label>
            <select name="roomTypes" id="roomTypes" onChange={handleRoomTypesChange} >
            <option value="none" selected disabled hidden>Select an Option</option>
            <option value="standar">Standar</option>
            </select>

            </div>

            <div>
            <label>Stock:</label>
            <input type="number" name="roomPrice" value={hotelData.roomPrice} onChange={handleOnChange}/>
            </div>

            <div>
            <label>Price:</label>
            <input type="number" name="roomStock" value={hotelData.roomStock} onChange={handleOnChange}/>
            </div>


    
            <p>Services:</p>
    
            <div className={styles.types}>
            <label>
              <input type="checkbox" name="type" value="all inclusive" checked={selectedServices.includes("all inclusive")} onChange={handleServicesChange}/>
              all inclusive
            </label>
            <label>
              <input type="checkbox" name="type" value="breakfast" checked={selectedServices.includes("breakfast")} onChange={handleServicesChange}/>
              breakfast
            </label>
            <label>
              <input type="checkbox" name="type" value="lunch" checked={selectedServices.includes("lunch")} onChange={handleServicesChange}/>
              lunch
            </label>
            <label>
              <input type="checkbox" name="type" value="dinner" checked={selectedServices.includes("dinner")} onChange={handleServicesChange}/>
              dinner
            </label>
            <label>
              <input type="checkbox" name="type" value="bar" checked={selectedServices.includes("bar")} onChange={handleServicesChange}/>
              bar
            </label>
            </div>
            

    
            </div>
            <p>Facilities:</p>
    
            <div className={styles.types}>
            <label>
              <input type="checkbox" name="type" value="beach" checked={selectedFacilities.includes("beach")} onChange={handleFacilitiesChange}/>
              Beach
            </label>
            <label>
              <input type="checkbox" name="type" value="swimming" checked={selectedFacilities.includes("swimming")} onChange={handleFacilitiesChange}/>
              Swimming Pool
            </label>
            <label>
              <input type="checkbox" name="type" value="gym" checked={selectedFacilities.includes("gym")} onChange={handleFacilitiesChange}/>
              Gym
            </label>
            <label>
              <input type="checkbox" name="type" value="parking" checked={selectedFacilities.includes("parking")} onChange={handleFacilitiesChange}/>
              Parking
            </label>
            <label>
              <input type="checkbox" name="type" value="roomservice'" checked={selectedFacilities.includes("roomservice")} onChange={handleFacilitiesChange}/>
              Room Service
            </label>

            </div>

            <div>
           
            
          </div>
    
    
            <button type="submit" onClick={handleSubmit}>CREATE</button>
    
          </form>
          </div>
        </div>

    )
}

export default CreateHotel;


