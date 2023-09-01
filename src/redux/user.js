import axios from 'axios';
import { createSlice } from "@reduxjs/toolkit";
import { URL_FINDHOTEL } from "../const/const";

const initialState = {
    isLog: false,
    User_id: '',
    name: '',
    email: '',
    image: '',
    rol: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { User_id, firstName, lastName, email, image, rol } = action.payload;
            state.User_id = User_id;
            state.name = `${firstName} ${lastName}`;
            state.email = email;
            state.image = image;
            state.rol = rol;
        },
        signOut: (state, action) => {
            state.User_id = '';
            state.name = '';
            state.email = '';
            state.image = '';
            state.rol = null;
        }
    },
});

export const { setUser, signOut } = userSlice.actions;

// Async action to sign in
export const signIn = (email) => async (dispatch) => {
    try {
        const response = await axios.get(`${URL_FINDHOTEL}/user/sign-in?email=${email}`);
        const data = response.data;
        dispatch(setUser(data));
    } catch (error) {
        console.log("Error:", error);
    }
};

export default userSlice.reducer;
