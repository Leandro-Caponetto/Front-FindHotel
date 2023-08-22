import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countries";
import destinationReducer from "./destinations";

const store = configureStore({
    reducer: {
      countries: countriesReducer,
      destination: destinationReducer  // Agrega tu slice al store
      // Otros reducers si los tienes
    },
  });

  

export default store;
