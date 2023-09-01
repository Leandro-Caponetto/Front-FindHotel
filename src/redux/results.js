import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";

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
        const response = await axios.get('https://backendfindhotel-dev.fl0.io/destination/');
        const countryNames = response.data.map(({ country_name }) => country_name);
        dispatch(setCountries(countryNames)); // Llama a la acción setCountries con los nombres de los países
    } catch (error) {
        // Manejo de errores si es necesario
    }
};

export const { setCountries, setCity } = resultsSlice.actions;

export default resultsSlice.reducer;
