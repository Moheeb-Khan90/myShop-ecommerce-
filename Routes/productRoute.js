import express from "express";
import PRODUCT_CONTROLLER from "../Controller/productController.js";
import {productValidation}  from "../Validation/RoutesValidation/productRoutes.js";
import adminAuthenticateToken from "../Middleware/Admin/adminMiddleware.js";

const PRODUCT_ROUTE = express.Router()

//DEFINE ADD PRODUCT ROUTE
PRODUCT_ROUTE.post('/create-product',productValidation ,PRODUCT_CONTROLLER.ADD_PRODUCT)

//DEFINE SHOW PRODUCT ROUTE
PRODUCT_ROUTE.get('/all-product', PRODUCT_CONTROLLER.SHOW_PRODUCT)


//DEFINE PAGINATION PRODUCT ROUTE
PRODUCT_ROUTE.get('/pagination-product/', PRODUCT_CONTROLLER.PAGINATION_PRODUCT)


//DEFINE UPDATE PRODUCT ROUTE
PRODUCT_ROUTE.put('/update-product/:productId', PRODUCT_CONTROLLER.UPDATE_PRODUCT)

//DEFINE DELETE PRODUCT ROUTE
PRODUCT_ROUTE.delete('/delete-product/:productId', PRODUCT_CONTROLLER.DELETE_PRODUCT)

export default PRODUCT_ROUTE 