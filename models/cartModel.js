import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    selectedSize: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    },);

const CartModel = mongoose.model('Cart', CartSchema);

export default CartModel;