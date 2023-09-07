const validateName = (name, Type = 'name') => {
    if (name == "" || name == null || name == undefined) {
        `The ${Type} is required.`
    }
    else {
        if (/[\s]{2,}/.test(name) == true) {
            return `Delete multi-spaces between names.`
        }

        if (/\d/.test(name) == true) {
            return `The ${Type} mustn't contain numbers.`
        }

        if (Math.max(...name.split(' ').map(p => p.length)) > 15) {
            return `Delete words longer than 15 characters.`
        }

        if (Math.min(...name.split(' ').map(p => p.length)) < 3) {
            return `Remove words of less than 3 characters`
        }

        if (/[!-/:-@[-`{-~¿¡°]/.test(name) == true) {
            return `Remove special characters from the ${Type}.`
        }
    }
    return ''
}

const validateEmail = (email) => {
    // This field is required.
    if (email == "" || email == null || email == undefined) {
        return 'The email is required.'
    }
    else {
        if (email.match(/@/)?.length != 1) { return "Add only one @ symbol." }

        if (/([!-,/:-@[-^`{-~¿¡°])(?=@)/.test(email) == true) { return "Username email only supports '._-' characters." }

        if (/\s+/.test(email) == true) { return "Remove spaces." }

        if (/[A-ZÑ]/.test(email) == true) {
            return "Remove capital letters."
        }

        if (/^([!-/:-@[-`{-~¿¡°])/.test(email) == true) {
            return "Remove special characters at start."
        }

        if (/([ -/:-@[-`{-~¿¡°])(?=@)/.test(email) == true) {
            return "remove special characters at end."
        }

        if (/[_.-]{2,}/.test(email) == true) {
            return "Remove consecutive special characters."
        }
    }
}

const validatePassword = (password) => {
    // This field is required.
    if (password == "" || password == null || password == undefined) {
        return "The password is required."
    }
    else {
        if (/\s+/.test(password) == true) {
            return "Remove spaces.";
        }

        if (8 > password.length || password.length > 20) {
            return "Write 8 to 20 characters.";
        }

        if (/[À-ÆÈ-ÏÒ-ÖÙ-Ýà-æè-ïò-öù-ýÿ]/.test(password) == true) {
            return "Remove acent characters.";
        }

        if (/[A-ZÑ]/.test(password) == false) {
            return "Add at least 1 capital letter."
        }

        if (/[a-zñ]/.test(password) == false) {
            return "Add at least 1 lowercase letter."
        }

        if (/\d/.test(password) == false) {
            return "Add at least 1 number."
        }

        if (/[!-/:-@[-`{-~¿¡°]/.test(password) == false) {
            return "Add at least 1 special character."
        }
    }
}



const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword == ""
        || confirmPassword == null
        || confirmPassword == undefined) {
        return "Retype your confirmPassword."
    }
    else if (confirmPassword != confirmPassword) {
        return "Password did not match"
    } else {
        return ''
    }
}

const signUpValidate = (state) => {
    let signUpErrors = {
        firstName: validateName(state.firstName, 'firstname') || '',
        lastName: validateName(state.lastName, 'lastname') || '',
        email: validateEmail(state.email) || '',
        password: validatePassword(state.password) || '',
        confirmPassword: validateConfirmPassword(state.confirmPassword) || '',
    }
    return signUpErrors
}

export default signUpValidate