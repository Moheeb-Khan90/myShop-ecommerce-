class Validation_USER_SCHEMA {

    static USER_NAME_VALIDATOR = async (values) => {
        const userName_REGEX = /^[a-zA-Z0-9]+$/
        const REGEX_MATCH = userName_REGEX.test(values)
        const userName_LENGTH = values.length >= 3

        const errors = {
        }

        if (!REGEX_MATCH) {
            throw new Error('Username can only contain letters and numbers')
        }
        if (!userName_LENGTH) {
            throw new Error('Username must be 3 characters')
        }

        return true
    }

    static USER_EMAIL_VALIDATOR= (values) => {
        const USER_EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const REGEX_MATCH = USER_EMAIL_REGEX.test(values)
        const errors = {
        
        }

        if (!REGEX_MATCH) {
            errors.email_InValid = 'Invalid email format'
        }

        return Object.values(errors).length === 0 ? true : errors
    }

    static USER_PASSWORD_VALIDATOR = (values) => {
        const USER_PASSWORd_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*/#?&])[A-Za-z\d@$!%^*#?&]{8,}$/
        const REGEX_MATCH = USER_PASSWORd_REGEX.test(values)
        const errors = {}

        if (!REGEX_MATCH) {
            errors.email_InValid = 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character'
        }

        return Object.values(errors).length === 0 ? true : errors
    }

    static USER_ADDRESS_VALIDATOR = (values) => {

        const errors = {}
        if (values.length === 0) {
            errors.email_InValid = 'address must be required'
        }

        return Object.values(errors).length === 0 ? true : errors
    }


    static USER_CONTACT_NUMBER_VALIDATOR = (values) => {

        const errors = {}
        if (values.length === 0) {
            errors.email_InValid = 'enter the correct phone number (11 digits)'
        }

        return Object.values(errors).length === 0 ? true : errors
    }

}

export default Validation_USER_SCHEMA
