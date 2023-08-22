import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

const initialState = {
  destination: [],
};

export const destinationSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload; // Actualiza el estado con los países obtenidos
    }
  },
});

export const fetchData = (name) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/hotel?name=${name}`
    );
    const destino = response.data[0];
    console.log("🚀 ~ file: destinations.js:28 ~ fetchData ~ destino:", destino)
    dispatch(setDestination(destino));
  } catch (error) {
    console.log("error");
  }
};



export const { setDestination } = destinationSlice.actions;
export default destinationSlice.reducer;
