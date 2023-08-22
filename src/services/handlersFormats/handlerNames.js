const handlerNames = (name, realTime = false) => {
    if (name === undefined || name === null || name === "") {
        return "";
    } else {
        if (typeof name != 'string') {
            throw TypeError('El argumento debe ser una cadena de caracteres (text)')
        }
        if (realTime === true) {
            let long = name.length
            if (long === 0) return name
            if (long === 1 && /[a-zñ]/.test(name)) return name[0].toUpperCase()
            if (long >= 2) {
                if (/\s{2}$/.test(name)) return name.slice(0, -1)
                if (/\s[a-zñ]$/.test(name)) return name.slice(0, -1) + name[long - 1].toUpperCase()
                if (/(\.|,)\s{2}$/.test(name)) return name.slice(0, -2)
                if (/(\.|,)\s[a-zñ]$/.test(name)) return name.slice(0, -1) + name[long - 1].toUpperCase()
                if (/(\.|,)[a-zñ]$/.test(name)) return `${name.slice(0, -1)} ${name[long - 1].toUpperCase()}`
                return name
            }
        }
        else {
            return name
                .trim()
                .split(' ')
                .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
        }

    }
}

export default handlerNames