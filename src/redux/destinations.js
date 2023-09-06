import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
import { URL_FINDHOTEL } from "../const/const";

const initialState = {
  destination: [],
  filteredHotels: [],
  order: 'all',
};

export const destinationSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload; // Actualiza el estado con los países obtenidos
    },
    setFilteredHotels: (state, action) => {
      state.order = action.payload;
    },
    sortAscendant: (state, action) => {
      state.filteredHotels = [...action.payload]
        .sort((a, b) => a.name.localeCompare(b.name));

    },
    sortDescendent: (state, action) => {
      state.filteredHotels = [...action.payload]
        .sort((a, b) => b.name.localeCompare(a.name))
    },
    sortTopCategory: (state, action) => {
      state.filteredHotels = [...action.payload]
        .sort((a, b) => a.category - b.category)
    },
    sortLowCategory: (state, action) => {
      state.filteredHotels = [...action.payload]
        .sort((a, b) => b.category - a.category)
    },
    sortPriceLow: (state, action) => {
      state.filteredHotels = [...action.payload]
        .sort((a, b) => a.room.price - b.room.price)
    },
    sortPriceHigh: (state, action) => {
      state.filteredHotels = [...action.payload]
        .sort((a, b) => b.room.price - a.room.price)
    },
    selectAll: (state, action) => {
      state.filteredHotels = action.payload
    },
  },
});

export const fetchData = (name) => async (dispatch) => {
  try {
    const {data}= await axios.get(

      `${URL_FINDHOTEL}/hotel?name=${name}`
    );
    console.log(data);
    const destino = data;
    dispatch(setDestination(destino));
  } catch (error) {
    console.log("error");
  }
};

export const { setDestination, selectAll, setFilteredHotels, sortAscendant, sortDescendent, sortLowCategory, sortPriceHigh, sortPriceLow, sortTopCategory } = destinationSlice.actions;
export default destinationSlice.reducer;
