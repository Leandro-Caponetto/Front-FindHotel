import handlerIsObjectEmpty from "./handlerIsObjectEmpty";

const handlerClearObject = (obj) => {
    for (const key in obj) {
        const value = obj[key];

        if (Array.isArray(value)) {
            obj[key] = value.filter(item => item !== "");
            if (obj[key].length === 0) {
                delete obj[key];
            }
        } else if (typeof value === 'object') {
            if (handlerIsObjectEmpty(value)) {
                delete obj[key];
            } else {
                handlerClearObject(value);
                if (handlerIsObjectEmpty(value)) {
                    delete obj[key];
                }
            }
        } else if (value === "" || value === null || value === undefined) {
            delete obj[key];
        }
    }
}

export default handlerClearObject