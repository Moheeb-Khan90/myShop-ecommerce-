import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const roles = ['admin', 'user'];
const ADMIN_SCHEMA = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name must be required"],
        trim: true,
        minlength: [3, 'Must be at least 3'],
        validate: {
            validator: function (values) {
                console.log(values)
                const userName_REGEX = /^[a-zA-Z0-9]+$/
                const isValid = userName_REGEX.test(values);
                console.log("vlaid",isValid)
                if (isValid) {
                    throw new Error('Username can only contain letters and numbers, and must be at least 3 characters long');
                }
                return true
            }
        }

    },
    email: {
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

    password: {
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
    role: { 
        type: String, 
        enum: ['admin', 'user'], 
        required: true,
        validate: {
            validator: function (value) {
              return roles.includes(value);
            },
            message: 'Invalid role',
          },
    },
    
    
})

// Hash the password before saving to the database
ADMIN_SCHEMA.pre('save', function (next) {
    const admin = this;

    if (!admin.isModified('password')) return next();

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(admin.password, salt);

    admin.password = hashedPassword;
    next();
});
const ADMIN_MODEL = mongoose.model("admin", ADMIN_SCHEMA);

export default ADMIN_MODEL;
