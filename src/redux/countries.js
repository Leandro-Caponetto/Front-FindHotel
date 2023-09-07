import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { URL_FINDHOTEL } from "../const/const"

const initialState = {
    countries: [],
    city: [],
};

export const countriesSlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        setCountries: (state, action) => {
            state.countries = action.payload; // Actualiza el estado con los países obtenidos
        },
        setCity: (state, action) => {
            state.city = action.payload
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

export const fetchCity = (city) => async (dispatch) => {
    try {
        const { data } = await axiosInstance.get(`/destination/states/${city}`)
        const cityNames = data[0].states.map(({ state_name }) => state_name)
        dispatch(setCity(cityNames));
    } catch (error) {
        error
    }
};

export const { setCountries, setCity } = countriesSlice.actions;

export default countriesSlice.reducer;
