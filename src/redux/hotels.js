

import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    hotelDetail: {},
    
};

export const hotelsSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        setHotelReserva: (state, action) => {
            state.hotelDetail = action.payload; // Actualiza el estado con los países obtenidos
        },
        
    },
});







export const { setHotelReserva } = hotelsSlice.actions;

export default hotelsSlice.reducer;

