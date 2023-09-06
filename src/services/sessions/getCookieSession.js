import Cookies from "js-cookie";
import { SESSION_NAME } from "../../const/const";
import { redirect } from "react-router-dom";

const getCookieSession = (nameCookie = SESSION_NAME) => {
    const cookie = Cookies.get(nameCookie);
    if (cookie) {
        return cookie
    } else {
        redirect('/')
    }
}

export default getCookieSession