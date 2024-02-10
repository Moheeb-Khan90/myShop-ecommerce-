import { body } from 'express-validator'

//CHECK USER ID
const category_route_validate = (req, res, next) => {
    const {categoryId } = req.params
    if (mongoose.Types.ObjectId.isValid(categoryId )) {
        next();
    } else {
        res.status(400).send('This Page Is Not Found');
    }

}

const categoryValidation = [
    body('productCategory').notEmpty().withMessage("category name must be required")
]

export default categoryValidation