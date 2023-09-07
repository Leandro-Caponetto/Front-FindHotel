import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { URL_FINDHOTEL } from "../const/const";

const initialState = {
    results: [],
};

export const resultsSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setResults: (state, action) => {
            state.results = action.payload; // Actualiza el estado con los países obtenidos
        },
    },
});

export const fetchCountries = () => async (dispatch) => {
    try {

        const response = await axiosInstance.get(`/destination/`);
        const countryNames = response.data.map(({ country_name }) => country_name);
        dispatch(setCountries(countryNames)); // Llama a la acción setCountries con los nombres de los países
    } catch (error) {
        // Manejo de errores si es necesario
    }
};

export const { setCountries, setCity } = resultsSlice.actions;

export default resultsSlice.reducer;
