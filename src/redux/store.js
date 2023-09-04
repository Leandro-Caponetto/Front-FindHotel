import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countries";
import destinationReducer from "./destinations";
import reservaReducer from './reservaSlice'; 
import userReducer from './user'
// import detailReserv from './DetailReserSlice'
import hotelsReducer from './hotels'

const store = configureStore({

  reducer: {
    countries: countriesReducer,
    destination: destinationReducer,
    reserva: reservaReducer,
    user: userReducer,
    hotels: hotelsReducer,
    // Otros reducers si los tienes
  },
});

export default store