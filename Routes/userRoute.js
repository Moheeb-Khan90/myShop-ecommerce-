import express from "express";
// import {body} from 'express-validator'
import USER_CONTROLLER from "../Controller/userController.js";
import authenticateToken from "../Middleware/authMiddleware.js";
import { user_route_validate, signUpValidation, updateValidation, changePasswordValidation, userLoginValidation} from "../Validation/RoutesValidation/RoutesValidation.js";

const route = express.Router()


//DEFINE ROUTE FOR USER SIGN_IN
route.post('/sign_in',
    signUpValidation,
    USER_CONTROLLER.SIGN_IN)

//DEFINE ROUTE FOR USER INFORMATION
route.get('/personal_info/:id'
    , authenticateToken,

    user_route_validate,
    USER_CONTROLLER.GET_USER_INFO
)

//DEFINE ROUTE FOR UPDATE INFORMATION
route.put('/updateInfo/:id',
    user_route_validate,
    updateValidation,
    authenticateToken,
    USER_CONTROLLER.UPDATE_USER_INFO
)

//DEFINE ROUTE FOR CHANGE PASSWORD
route.put('/password/:id',
    user_route_validate,
    changePasswordValidation,
    authenticateToken,
    USER_CONTROLLER.CHANGE_PASSWORD
)

// //DEFINE ROUTE FOR FORGET PASSWORd
// route.post('/forget_Password',
//     ForgetPasswordValidation,
//     USER_CONTROLLER.FORGET_PASSWORD
// )

// //DEFINE ROUTE FOR SAVE NEW PASSWORd
// route.post('/reset-password/:id/:tk',
//     saveNewPassworddValidation,
//     USER_CONTROLLER.USER_NEW_PASSWORD
// )

//DEFINE ROUTE FOR LOGIN
route.post('/login',
userLoginValidation,
    USER_CONTROLLER.USER_LOGIN
)

export default route