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

const signInValidate = (state) => {
    let signUpErrors = {
        email: validateEmail(state.email) || '',
        password: validatePassword(state.password) || '',
    }
    return signUpErrors
}

export default signInValidate