
const validateName = (value) => {
    if (value === null || value === undefined || value === "")
        return `The name is required.`
    else {
        if (/\d/.test(value)) return 'The name must not contain numbers.'
        if (Math.max(...value.trim().split(' ').map(p => p.length)) > 15) return `Must not exceed 15 characters per name.`
        if (Math.min(...value.trim().split(' ').map(p => p.length)) < 2) return `A name must contain at least 2 characters`
        if (/[!-/:-@[-`{-~¿¡°]/.test(value.trim(value))) return `Remove special characters from the name.`

        return ''
    }
}

const validateEmail = (value) => {

}

const validatePassword = (value) => {

}

const validateConfirmPassword = (value) => {

}

const handlerValidateSignUp = (state) => {
    let signUpErrors = {
        firstName: validateName(state.firstName) || '',
        lastName: validateName(state.lastName) || '',
        email: validateEmail(state.email) || '',
        password: validatePassword(state.password) || '',
        confirmPassword: validateConfirmPassword(state.confirmPassword) || ''
    }
    return signUpErrors
}

export default handlerValidateSignUp