import express from 'express'
import PRODUCT_CATEGORY_CONTROLLER from '../Controller/categoriesController.js'
import {categoryValidation,  category_route_validate } from '../Validation/RoutesValidation/categoryRoutesValidtaion.js'

const category_route = express.Router()

//DEFINE ADD CATEGORY ROUTE
category_route.post('/create-category',
    categoryValidation
    , PRODUCT_CATEGORY_CONTROLLER.ADD_CATEGORY)

//DEFINE SHOW CATEGORY ROUTE
category_route.get('/all-category',
    PRODUCT_CATEGORY_CONTROLLER.SHOW_CATEGORY)

//DEFINE UPDATE CATEGORY ROUTE
category_route.put('/update-category/:categoryId',
    category_route_validate,
    categoryValidation,
    PRODUCT_CATEGORY_CONTROLLER.UPDATE_CATEGORY)

//DEFINE DELETE CATEGORY ROUTE
category_route.delete('/delete-category/:categoryId',
category_route_validate,
 PRODUCT_CATEGORY_CONTROLLER.DELETE_CATEGORY)

export default category_route