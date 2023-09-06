import Cookies from "js-cookie";
import { SESSION_NAME } from "../../const/const";
import getCookieSession from "./getCookieSession";

const readCookieSession = (nameCookie = SESSION_NAME) => {
    try {
        const cookie = getCookieSession(nameCookie)
        if (cookie) {
            const cookieDecode = JSON.parse(cookie);
            return cookieDecode
        } else {
            return
        }
    } catch (error) {

        console.log('Cookie does not exist');
    }
}

export default readCookieSession