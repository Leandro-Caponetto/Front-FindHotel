import Cookies from "js-cookie"

const setCookieSession = (nameCookie, dataCookie) => {
    try {
        const { expires, _id, ...user } = dataCookie

        const sessionExpires = new Date(expires);
        const currentDate = new Date()
        const timeSession = sessionExpires.getTime() - currentDate.getTime()
        const cookieExpires = (timeSession / (1000 * 60 * 60 * 24));


        Cookies.set(nameCookie, JSON.stringify({ _id, ...user }), {
            expires: cookieExpires,
            path: '/',
        });
    } catch (error) {
        console.log(' No fue posible iniciar session')
    }

}

export default setCookieSession