import { body } from 'express-validator'

//CHECK USER ID
const product_route_validate = (req, res, next) => {
    const {productId } = req.params
    if (mongoose.Types.ObjectId.isValid(productId)) {
        next();
    } else {
        res.status(400).send('This Page Is Not Found');
    }

}



const productValidation = [
    body('product_title').notEmpty().withMessage("product title must be required"),
    body('product_description').notEmpty().withMessage("product description must be required"),
    body('product_price').notEmpty().withMessage("product price name must be required"),
    body('product_colors').notEmpty().withMessage("product colors must be required"),
    body('product_sizes').notEmpty().withMessage("product sizes must be required"),
    body('product_category').notEmpty().withMessage("product category must be required"),
    body('product_delivery_charges').notEmpty().withMessage("delivery charges must be required"),
    body('product_delivery_days').notEmpty().withMessage("delivery days must be required"),
    body('product_stock').notEmpty().withMessage("product stock must be required")
]


export {product_route_validate, productValidation}