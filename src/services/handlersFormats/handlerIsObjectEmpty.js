const handlerIsObjectEmpty = (obj) => {
    if (obj === null || obj === undefined) return true;
    if (typeof obj !== 'object') return false;

    for (const key in obj) {
        const value = obj[key];

        if (Array.isArray(value)) {
            if (!value.every(item => item === "")) {
                return false;
            }
        } else if (typeof value === 'object') {
            if (!handlerIsObjectEmpty(value)) {
                return false;
            }
        } else if (value !== "" && value !== null && value !== undefined) {
            return false;
        }
    }

    return true;
}

export default handlerIsObjectEmpty