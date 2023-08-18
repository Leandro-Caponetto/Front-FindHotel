import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countries";

const store = configureStore({
    reducer: {
      countries: countriesReducer, // Agrega tu slice al store
      // Otros reducers si los tienes
    },
  });

  

export default store;
