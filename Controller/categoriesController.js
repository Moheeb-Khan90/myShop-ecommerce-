import { validationResult } from "express-validator";
import PRODUCT_CATEGORY_MODEL from "../Models/categoriesModel.js";

class PRODUCT_CATEGORY_CONTROLLER {
    static ADD_CATEGORY = async (req, res) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            let firstError = error.array()[0]
            let firstErrorMessage = firstError.msg
            return res.status(403).json(
                {
                    msg: firstErrorMessage
                }
            )
        }
        const { productCategory } = req.body

        const categoryExist = await PRODUCT_CATEGORY_MODEL.findOne({ product_category: productCategory })
        try {
            if (categoryExist) {
                res.status(403).json(
                    {
                        error: 'Category already exists'
                    }
                )
            } else {

                const NEW_CATEGORY = new PRODUCT_CATEGORY_MODEL(
                    {
                        product_category: productCategory
                    }
                )

                await NEW_CATEGORY.save()
                return res.status(200).json({
                    status: 'fullfiled'
                })
            }

        } catch (error) {
            console.log(error)
        }




    }

    static SHOW_CATEGORY = async (req, res) => {

    }

    static UPDATE_CATEGORY = async (req, res) => {

    }

    static DELETE_CATEGORY = async (req, res) => {

    }
}

export default PRODUCT_CATEGORY_CONTROLLER