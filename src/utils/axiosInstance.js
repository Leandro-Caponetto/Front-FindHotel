import axios from 'axios'
import { readCookieSession } from '../services'
import { URL_FINDHOTEL } from '../const/const';

const axiosInstance = axios.create({
    baseURL: URL_FINDHOTEL, // Replace with your API base URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const auth = readCookieSession()
        //? ** If token is present add it to request's Authorization Header
        if (auth && auth._id) {
            if (config.headers) config.headers.authorization = auth._id;
        }
        return config;
    },
    (error) => {
        // Handle request errors here

        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Modify the response data here (e.g., parse, transform)

        return response;
    },
    (error) => {
        // Handle response errors here

        return Promise.reject(error);
    }
);

export default axiosInstance;
