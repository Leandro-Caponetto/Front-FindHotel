import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { URL_FINDHOTEL } from "../const/const";


const initialState = {
    hotelDetail: {},
    userHotels: [],
    typeRoom: [],
    typeRoomDetail: {}
};

export const hotelsSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        setHotelReserva: (state, action) => {
            state.hotelDetail = action.payload; // Actualiza el estado con los países obtenidos
        },
        setTypeRoomDetail: (state, action) => {
            state.typeRoomDetail = action.payload;
        },
        setTypeRoom: (state, action) => {
            state.typeRoom = action.payload;
        },
        setUserHotels: (state, action) => {
            state.userHotels = action.payload;
        }
    }
})


export const typeRoom = (userId) => async (dispatch) => {
    const { data } = await axiosInstance.get(`/roomType/user/${userId}`)
    dispatch(setTypeRoom(data))
}


export const userHotels = (userId) => async (dispatch) => {
    const { data } = await axiosInstance.get(`/hotelRoom/user/${userId}`)
    dispatch(setUserHotels(data))
}

export const { setHotelReserva, setTypeRoom, setTypeRoomDetail, setUserHotels } = hotelsSlice.actions;

export default hotelsSlice.reducer;

