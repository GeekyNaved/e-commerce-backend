
import CartModel from "../models/cartModel.js";
import BaseResponse from '../helpers/baseResponse.js'
import { validationResult } from 'express-validator';

// get all
const getAllCartItems = async (req, res) => {
    try {
        // Fetch all cart items and populate the productId field
        const items = await CartModel.find().populate({
            path: 'productId',
        });

        // Check if items exist
        if (!items || items.length === 0) {
            return res.status(404).json({ message: 'No items present in the cart.' });
        }

        // Return the items if they exist
        return res.status(200).json(BaseResponse.success("Items found successfully", items));
    } catch (error) {
        // Handle errors and return a server error response
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'An error occurred while fetching cart items.', error: error.message });
    }
};

// add
const addToCart = async (req, res) => {
    const {
        productId,
        quantity,
        selectedSize,
    } = req.body;

    try {
        const newItem = new CartModel({
            productId,
            quantity,
            selectedSize,
        });
        const item = await newItem.save();
        return res.status(201).json(
            BaseResponse.success('Item added to cart successfully', item)
        );
    } catch (err) {
        console.error(err.message);
        return res.status(500).json(
            BaseResponse.error('Something went wrong while creating the product', err)
        );
    }
};

// update
const updateCartItem = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { quantity } = req.body;
        const id = req.params.id;
        const updatedCartItem = await CartModel.findOneAndUpdate({ _id: id },
            {
                $set: {
                    quantity
                },
            }, {
            new: true,
        }
        );
        if (!updatedCartItem) {
            return res.status(200).json(BaseResponse.error('cart item not found'));
        }
        return res
            .status(200)
            .json(
                BaseResponse.success('cart item updated successfully', updatedCartItem)
            );
    } catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json(
                BaseResponse.error('Something went wrong while updating cart item', err)
                    .message
            );
    }

}

// delete
const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        const itemData = await CartModel.findOne({ _id: itemId });

        if (!itemData) {
            return res.status(200).json(BaseResponse.error('cart item not found'));
        }

        const deletedItemData = await CartModel.findByIdAndDelete({
            _id: itemId,
        });

        if (deletedItemData) {
            return res
                .status(200)
                .json(
                    BaseResponse.success(
                        'cart item deleted Succesfully',
                        deletedItemData
                    )
                );
        }
        return res.status(200).json(BaseResponse.success('cart item deletion Failed'));
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json(
                BaseResponse.error(
                    'Something went wrong while deleting cart item',
                    err.message
                )
            );
    }
};

export default { getAllCartItems, addToCart, updateCartItem, deleteItem };