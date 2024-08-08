import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    realPrice: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true,
    },
);

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;