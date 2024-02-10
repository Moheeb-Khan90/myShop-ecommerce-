import mongoose from "mongoose";

const PRODUCT_SCHEMA = new mongoose.Schema({
    product_title: {
        type: String,
        required: [true, 'product title must be required'],
        trim: true,
        lowercase: true

    },
    product_image: [{
        type: String,
        required: [true, 'product image must be required'],
    }],
    product_description: {
        type: String,
        required: [true, 'product description must be required'],
        lowercase: true,
        trim: true
    },
    product_price: {
        type: String,
        required: [true, 'product price must be required'],
        lowercase: true,
        trim: true
    },
    product_colors: [{
        type: String,
        required: [true, 'product title must be required'],
    }],
    product_sizes: [{
        type: String,
        lowercase: true,
        trim:true,
        required: [true, 'product title must be required'],
    }],
    product_category: {
        type: String,
        lowercase: true,
        required: [true, 'category must be required'],
        trim:true

    },

    product_delivery_charges: {
        type: Number,
        default: 0,
    },
    product_delivery_days: {
        type: Number,
        default: 0,
    },
    product_stock: {
        type: Number,
        default: 0,
    },


})

const  PRODUCT_MODEL = mongoose.model('product',PRODUCT_SCHEMA)
export default PRODUCT_MODEL