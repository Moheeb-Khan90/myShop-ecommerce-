import express from "express";
import USER_CONTROLLER from "../Controller/userController.js";
import authenticateToken from "../Middleware/authMiddleware.js";
import user_route_validate from "../Validation/RoutesValidation/RoutesValidation.js";

const route = express.Router()

//DEFINE ROUTE FOR USER SIGN_IN
route.post('/sign_in', USER_CONTROLLER.SIGN_IN)

//DEFINE ROUTE FOR USER INFORMATION
route.get('/personal_info/:id'
    , authenticateToken,
    user_route_validate,
    USER_CONTROLLER.GET_USER_INFO
)

//DEFINE ROUTE FOR UPDATE INFORMATION
route.get('/updateInfo/:id',
    user_route_validate,
    authenticateToken,
    USER_CONTROLLER.UPDATE_USER_INFO
)

//DEFINE ROUTE FOR CHANGE PASSWORD
route.put('/password/:id',
    user_route_validate,
    authenticateToken,
    USER_CONTROLLER.CHANGE_PASSWORD
)

//DEFINE ROUTE FOR FORGET PASSWORd
route.get('/forget_Password',
    USER_CONTROLLER.FORGET_PASSWORD
)

export default route