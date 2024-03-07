import { body } from "express-validator";
const USER_PASSWORd_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%^*/#?&])[A-Za-z\d@$!%^*#?&]{8,}$/

const adminRouteValidation = [
    body('name').isLength({ min: 3 }).withMessage("Enter the name minimum 2 or 3 letters"),

    body('email').notEmpty().withMessage('email must required').isEmail().withMessage('enter the valid email'),

    body('password').notEmpty().withMessage('password must required').matches(USER_PASSWORd_REGEX).withMessage('Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long'),

    body('role').notEmpty().withMessage("role must be required"),

]
export { adminRouteValidation }