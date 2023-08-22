import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    hotels: [],
    filteredHotels: [],
    order: "",
}

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setFilterHotels: (state, action) => {
            state.filteredHotels = action.payload.hotels; 
            state.order = action.payload.order;
        },
        sortHotels: (state) => {
            const { order } = state;
            if (order === "Ascendant") {
                state.filteredHotels.sort((a, b) => a.name.localeCompare(b.name));
            } else if (order === "Descendent") {
                state.filteredHotels.sort((a, b) => b.name.localeCompare(a.name));
            } else if (order === "TopCategory") {
                state.filteredHotels.sort((a, b) => a.category - b.category);
            } else if (order === "LowCategory") {
                state.filteredHotels.sort((a, b) => b.category - a.category);
            } else if (order === "PriceLow") {
                state.filteredHotels.sort((a, b) => a.price - b.price);
            } else if (order === "PriceHigh") {
                state.filteredHotels.sort((a, b) => b.price - a.price);
            }
        },
    },
});

export const {setFilterHotels, sortHotels} = filterSlice.actions;

export default filterSlice.reducer;
