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
        } else {
            try {
                const { productCategory } = req.body

                const categoryExist = await PRODUCT_CATEGORY_MODEL.findOne(
                    {
                        product_category: productCategory
                    }
                )
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
                        status:"fullfilled",
                    })
                }

            } catch (error) {
                return res.status(500).json(
                    {
                        message: "internal server error",
                    }
                )
            }
        }
    }

    static SHOW_CATEGORY = async (req, res) => {
        try {
            const category = await PRODUCT_CATEGORY_MODEL.find()
            return res.json(
                {
                    status: 'fullfilled',
                    category,
                }
            )

        } catch (error) {
            return res.status(500).json(
                {
                    message: "internal server error",
                }
            )
        }

    }

    static UPDATE_CATEGORY = async (req, res) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            let firstError = error.array()[0]
            let firstErrorMessage = firstError.msg
            return res.status(403).json(
                {
                    msg: firstErrorMessage
                }
            )
        } else {
            try {
                const { categoryId } = req.params
                const { productCategory } = req.body
                const categoryExist = await PRODUCT_CATEGORY_MODEL.findOne(
                    {
                        product_category: productCategory
                    }
                )
                if (categoryExist) {
                    res.status(403).json(
                        {
                            error: 'Category already exists'
                        }
                    )
                } else {
                    const UPDATE_CATEGORY = (
                        {
                            product_category: productCategory
                        }
                    )
                    const update_category = await PRODUCT_CATEGORY_MODEL.findByIdAndUpdate(
                        categoryId,
                        UPDATE_CATEGORY
                    )
                    return res.status(200).json(
                        {
                            status:"fullfilled",
                            update_category
                        }
                    )
                }

            } catch (error) {
                return res.status(500).json(
                    {
                        message: "internal server error",
                    }
                )
            }
        }

    }

    static DELETE_CATEGORY = async (req, res) => {
        try {
            const { categoryId } = req.params
            await PRODUCT_CATEGORY_MODEL.findByIdAndDelete(
                categoryId
            )
            return res.status(200).json(
                {
                    status:"fullfilled",
                }
            )
        } catch (error) {
            return res.status(500).json(
                {
                    message: "internal server error",
                }
            )
        }
    }
}

export default PRODUCT_CATEGORY_CONTROLLER