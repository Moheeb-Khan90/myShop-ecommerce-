import mongoose from "mongoose";
import bcrypt from 'bcrypt';
// import Validation_USER_SCHEMA from '../Validation/SchemaValidation/userSchemaValidation.js'

const USER_SCHEMA = new mongoose.Schema({
    User_Name: {
        type: String,
        required: [true, "user name must be required"],
        trim: true,
        minlength: [3, 'Must be at least 3'],
        validate: {

            validator: function (values) {
                const userName_REGEX = /^[a-zA-Z0-9]+$/
                const isValid = userName_REGEX.test(values) && values.length >= 3;
                if (!isValid) {
                    throw new Error('Username can only contain letters and numbers, and must be at least 3 characters long');
                }
                return true
            }
        }

    },


    User_Email: {
        type: String,
        required: [true, "email must be required"],
        trim: true,
        validate: {
            validator: function (values) {
                const USER_EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                const REGEX_MATCH = USER_EMAIL_REGEX.test(values)
                if (!REGEX_MATCH) {
                    throw new Error('Invalid email address');
                }
            }
        }
    },

    User_Password: {
        type: String,
        required: [true, "Password must be required"],
        trim: true,
        validate: {

            validator: function (values) {
                // Check if the password meets the minimum length requirement
            if (values.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }
                const USER_PASSWORd_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*/#?&])[A-Za-z\d@$!%^*#?&]{8,}$/
                const REGEX_MATCH = USER_PASSWORd_REGEX.test(values)
                if (!REGEX_MATCH) {
                    throw new Error('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character');
                }

            }
        }

    },

    User_Address: {
        type: String,
        required: [true, "address must be required"],
        trim: true,
        minlength: [6, 'Must be at least 6 characters'],
        validate: {
            validator: function (values) {

                if (values.length === 0) {
                    throw new Error('address must be required')
                }
            }

        }
    },

    User_Contact_Number: {
        type: String,
        required: [true, "phone number must be required"],
        trim: true,
        minlength: [11, 'Must be at least 11 characters'],
        validate: {
            validator: function (values) {
                if (values.length > 12) {
                    throw new Error('number must be 11 digits')
                }
            }
        }
    },

})

// Hash the password before saving to the database
USER_SCHEMA.pre('save', function (next) {
    const user = this;

    if (!user.isModified('User_Password')) return next();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.User_Password, salt);

    user.User_Password = hashedPassword;
    next();
});

const USER_MODEL = mongoose.model("user", USER_SCHEMA);

export default USER_MODEL;
