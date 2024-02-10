import mongoose from "mongoose";

const PRODUCT_CATEGORY = new mongoose.Schema({
    product_category: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },
})

const PRODUCT_CATEGORY_MODEL =  mongoose.model("product_category", PRODUCT_CATEGORY)

export default PRODUCT_CATEGORY_MODEL