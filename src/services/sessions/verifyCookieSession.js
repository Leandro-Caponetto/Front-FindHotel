import axiosInstance from "../../utils/axiosInstance";
import { SESSION_NAME, URL_FINDHOTEL } from "../../const/const";
import readCookieSession from "./readCookieSession";
import setCookieSession from "./setCookieSession";
import removeCookieSession from "./removeCookieSession";

const verifyCookieSession = async (nameCookie = SESSION_NAME) => {
    try {
        const cookie = readCookieSession(nameCookie)
        const { data, status } = await axiosInstance.get(`/user/auth/session`)
        if (status === 200) {
            const sessionExpires = new Date(cookie.expires);
            const currentDate = new Date()
            const timeSession = sessionExpires.getTime() - currentDate.getTime()
            if (timeSession < (60 * 1000)) {
                const { status, data } = await axiosInstance.put(`/user/auth/session`)
                if (status === 200) {
                    setCookieSession(nameCookie, data)
                    return data
                } else {
                    removeCookieSession()

                }

            }
            return data
        } else {
            return data
        }

    } catch (error) {
        console.error(error)
    }

}

export default verifyCookieSession