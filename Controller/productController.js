import dotenv from "dotenv"
dotenv.config()
import PRODUCT_MODEL from "../Models/productModel.js"
import { validationResult } from "express-validator"


class PRODUCT_CONTROLLER {
    static ADD_PRODUCT = async (req, res) => {
        const errors = validationResult(req)
        console.log(errors)
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0].msg;
            console.log(firstError)
            res.status(403).json(
                {
                    msg: firstError
                }
            )
        } else {
            try {
                const {
                    product_title,
                    product_image,
                    product_description,
                    product_price,
                    product_colors,
                    product_sizes,
                    product_category,
                    product_delivery_charges,
                    product_delivery_days,
                    product_stock
                } = req.body

                const colorsArray = Array.isArray(product_colors) ? product_colors : product_colors.split(',');
                const sizesArray = Array.isArray(product_sizes) ? product_sizes : product_sizes.split(',');
                const imageArray = Array.isArray(product_image) ? product_image : product_image.split(',')


                const NEW_PRODUCT = new PRODUCT_MODEL({
                    product_title: product_title,
                    product_image: imageArray,
                    product_description: product_description,
                    product_price: product_price,
                    product_colors: colorsArray,
                    product_sizes: sizesArray,
                    product_category: product_category,
                    product_delivery_charges: product_delivery_charges,
                    product_delivery_days: product_delivery_days,
                    product_stock: product_stock
                })
                await NEW_PRODUCT.save()
                return res.status(200).json({
                    msg: "product added"
                })
            } catch (error) {
                return res.status(500).json(
                    {
                        message: "internal server error",
                    })
            }
        }

    }

    static SHOW_PRODUCT = async (req, res) => {
        try {
            const SHOW_PRODUCT = await PRODUCT_MODEL.find()
            return res.status(200).json({
                status: "fullfiled",
                SHOW_PRODUCT
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json(
                {
                    message: "internal server error",
                })
        }
    }

    static UPDATE_PRODUCT = async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0].msg;
            res.status(403).json(
                {
                    msg: firstError
                }
            )
        } else {
            try {
                const { productId } = req.params
                const {
                    product_title,
                    product_image,
                    product_description,
                    product_price,
                    product_colors,
                    product_sizes,
                    product_category,
                    product_delivery_charges,
                    product_delivery_days,
                    product_stock
                } = req.body

                const colorsArray = Array.isArray(product_colors) ? product_colors : product_colors.split(',');
                const sizesArray = Array.isArray(product_sizes) ? product_sizes : product_sizes.split(',');
                const imageArray = Array.isArray(product_image) ? product_image : product_image.split(',')


                const UPDATE_PRODUCT = {
                    product_title: product_title,
                    product_image: imageArray,
                    product_description: product_description,
                    product_price: product_price,
                    product_colors: colorsArray,
                    product_sizes: sizesArray,
                    product_category: product_category,
                    product_delivery_charges: product_delivery_charges,
                    product_delivery_days: product_delivery_days,
                    product_stock: product_stock
                }
                await PRODUCT_MODEL.findByIdAndUpdate(
                    productId,
                    UPDATE_PRODUCT
                )
                return res.status(200).json(
                    {
                        status: "fullfiled",
                        msg: "product succesfully updated",
                    }
                )

            } catch (error) {
                return res.status(500).json(
                    {
                        message: "internal server error",
                    })
            }


        }

    }

    static DELETE_PRODUCT = async (req, res) => {
        try {
            const { productId } = req.params
            await PRODUCT_MODEL.findByIdAndDelete(productId)
            return res.status(200).json(
                {
                    status: "fullfiled",
                    msg: "product deleted successfully",
                }
            )

        } catch (error) {
            return res.status(500).json(
                {
                    message: "internal server error",
                })
        }

    }

    static PAGINATION_PRODUCT = async (req, res) => {
        const { page, limit } = req.query
        if (!page || !limit) {
            page = 1
            limit = 10
        }
        const skip_product = (page - 1) * limit
        try {
            const count_product = await PRODUCT_MODEL.find().skip(skip_product).limit(limit)
            return res.status(200).json(
                {
                    count_product
                }
            )
        } catch (error) {
            return res.status(500).json(
                {
                    message: "internal server error",
                })
        }

    }
}

export default PRODUCT_CONTROLLER