import mongoose from "mongoose";
import { body } from 'express-validator'

//CHECK USER ID
const user_route_validate = (req, res, next) => {
    if (mongoose.Types.ObjectId.isValid(req.user.USERID)) {
        next();
    } else {
        res.status(400).send('This Page Is Not Found');
    }

}
const USER_EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const USER_PASSWORd_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*/#?&])[A-Za-z\d@$!%^*#?&]{8,}$/
const signUpValidation = [
    body('User_Name').isLength({ min: 3 }).withMessage("Enter the name minimum 2 or 3 letters"),

    body('User_Email').notEmpty().withMessage('email must required').isEmail().withMessage('enter the valid email'),

    body('User_Password').notEmpty().withMessage('password must required').matches(USER_PASSWORd_REGEX).withMessage('Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long'),

    body('User_Address').notEmpty().withMessage("address must required"),

    body('User_Contact_Number').isLength({ min: 11, max: 11 }).withMessage('Contact number must be exactly 11 digits'),

]

const updateValidation = [
    body('User_Name').isLength({ min: 3 }).withMessage("Enter the name minimum 2 or 3 letters"),
    body('User_Address').notEmpty().withMessage("address must required"),
    body('User_Contact_Number').isLength({ min: 11, max: 11 }).withMessage('Contact number must be exactly 11 digits'),

]

const changePasswordValidation = [
    body('old_password').notEmpty().withMessage('old password must required'),

    body('new_password').notEmpty().withMessage('new password must required').matches(USER_PASSWORd_REGEX).withMessage('Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long'),
]

// const ForgetPasswordValidation = [
//     body('email').notEmpty().withMessage(''),
// ]

// const saveNewPassworddValidation = [
//     body('newPassword').notEmpty().withMessage('password must required').matches(USER_PASSWORd_REGEX).withMessage('Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long'),

//     body('confirmPassword').custom((value, { req }) => {
//         if (value !== req.body.newPassword) {
//             throw new Error('Password confirmation does not match password');
//         }
//         return true;
//     })
// ]
const userLoginValidation = [
    body('email').notEmpty().withMessage('email must be required'),
    body('password').notEmpty().withMessage('password must be required')
]

export { user_route_validate, signUpValidation, updateValidation, changePasswordValidation, userLoginValidation }