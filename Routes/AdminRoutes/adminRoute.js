import express from 'express';
import ADMIN from '../../Controller/Admin/adminController.js';
import { adminRouteValidation } from '../../Validation/RoutesValidation/AdminValidation/adminRouteValidation.js';
const ADMIN_ROUTES = express.Router()

//Add User 
ADMIN_ROUTES.post('/addUser',adminRouteValidation,ADMIN.ADD_USERS)

export default ADMIN_ROUTES