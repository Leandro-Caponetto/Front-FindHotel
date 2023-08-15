import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    lastName: null,
    email: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action) => {
            const { name, lastName, email } = action.payload;
            state.name = name;
            state.lastName = lastName;
            state.email = email;
        },
        changeEmail: (state, action) => {
            state.email = action.payload;
        },
    },
});

export const { addUser, changeEmail } = userSlice.actions;
export default userSlice.reducer;