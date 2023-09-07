import axiosInstance from '../utils/axiosInstance.js';
import { createSlice } from "@reduxjs/toolkit";
import {
    SESSION_NAME,
} from "../const/const";
import { setCookieSession, readCookieSession, removeCookieSession } from '../services';
import { logOut } from '../services/firebase';

const initialState = {
    user: {},
    login: {
        view: false,
        status: true
    },

};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogIn: (state, action) => {
            state.user = action.payload;
            state.login = {
                view: false,
                status: false
            }
        },
        setLogOut: (state, action) => {
            state.user = {}
            state.login = state.login = {
                view: false,
                status: true
            }
        },
        setViewLogin: (state, action) => {
            state.login.view = !state.login.view
        },
        setStatusLogin: (state, action) => {
            state.login.status = action.payload
        }
    },
});
// Async action to sign in
export const signIn = (userCredentials) => async (dispatch) => {
    try {
        const { data, status } = await axiosInstance.post(`/user/auth/sign-in`, userCredentials)
        if (status === 200) {
            const { _id, expires, ...user } = data
            setCookieSession(SESSION_NAME, data)
            dispatch(setLogIn(user));
        } else {
            console.error('Error when closing session')
        }
        // if (data) {
        //     // let paths = []
        //     // switch (data.rol) {
        //     //     case 'admin':
        //     //         paths = USER_ADMIN
        //     //         break
        //     //     case 'hotel':
        //     //         paths = USER_HOTEL
        //     //         break
        //     //     case 'user':
        //     //         paths = USER_CUSTOM
        //     //         break
        //     //     default:
        //     //         paths = USER
        //     // }

        // }

    } catch (error) {
        // Captura cualquier error que pueda ocurrir durante la solicitud
        console.error('Error:', error);
    }
};

export const signOut = () => async (dispatch) => {
    try {
        const { _id } = readCookieSession(SESSION_NAME)
        console.log("🚀 ~ file: user.js:84 ~ signOut ~ _id:", _id)

        const { status } = await axiosInstance.post(`/user/auth/sign-out`)
        if (status === 200) {
            logOut()
            dispatch(setLogOut());
            removeCookieSession()
            window.location.href = '/';
        }
        else {
            console.error('Error when closing session')
        }
    }
    catch (error) {
        console.error('Error:', error);
    }

}

export const viewFormLog = () => (dispatch) => {
    const cookies = readCookieSession()
    if (cookies) {
        dispatch(setStatusLogin(false))
        dispatch(setViewLogin())
    } else {
        dispatch(setStatusLogin(true))
        dispatch(setViewLogin())
    }
}

export const { setLogIn, setLogOut, setStatusLogin, setViewLogin } = userSlice.actions;

export default userSlice.reducer;
