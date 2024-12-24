import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema({
    size: {
        type: String,
        required: true, // Example: S, M, L, XL, XXL
    },
    quantity: {
        type: Number,
        required: true, // Quantity available for this size
    },
});


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
    // quantity: {
    //     type: Number,
    //     required: true,
    // },
    discountedPrice: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: false,
    },
    thumbnailImage: {
        type: String,
        required: true,
    },
    sizes: [SizeSchema],
},
    {
        timestamps: true,
    },
);

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;