import Cookies from "js-cookie"
import { SESSION_NAME } from "../../const/const"

const removeCookieSession = (nameCookie = SESSION_NAME) => {
    Cookies.remove(nameCookie)
}

export default removeCookieSession