import ProductModel from '../models/productModel.js';
import BaseResponse from '../helpers/baseResponse.js'
import { validationResult } from 'express-validator';
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
}

// @desc    Fetch product By id
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {

        const productId = req.params.id;
        const productData = await ProductModel.findOne({ _id: productId });
        if (productData) {
            return res.status(200).json(BaseResponse.success("Product found successfully", productData));
        }
        return res.status(200).json(BaseResponse.error('Product not found'));
    } catch (err) {
        console.log(err.message);
        res.status(500).json(BaseResponse.error("something went wrong", err.message));

    }
}

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
    const { productId, title, description, realPrice, discountedPrice } = req.body;
    const newProduct = new ProductModel({ productId, title, description, realPrice, discountedPrice });
    const product = await newProduct.save();
    res.json(product);
}

// @desc    Update a product
// @route   PATCH /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { productId, title, description, realPrice, discountedPrice } = req.body;
        const id = req.params.id;
        const updatedProductData = await ProductModel.findOneAndUpdate({ _id: id },
            {
                $set: {
                    productId, title, description, realPrice, discountedPrice
                },
            }, {
            new: true,
        }
        );
        if (!updatedProductData) {
            return res.status(200).json(BaseResponse.error('product not found'));
        }
        return res
            .status(200)
            .json(
                BaseResponse.success('product updated successfully', updatedProductData)
            );
    } catch (err) {
        console.log(err.message);
        return res
            .status(500)
            .json(
                BaseResponse.error('Something went wrong while updating product', err)
                    .message
            );
    }

}

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const productData = await ProductModel.findOne({ _id: productId });

        if (!productData) {
            return res.status(200).json(BaseResponse.error('Product not found'));
        }

        const deletedProductData = await ProductModel.findByIdAndDelete({
            _id: productId,
        });

        if (deletedProductData) {
            return res
                .status(200)
                .json(
                    BaseResponse.success(
                        'Product deleted Succesfully',
                        deletedProductData
                    )
                );
        }
        return res.status(200).json(BaseResponse.success('Product deletion Failed'));
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json(
                BaseResponse.error(
                    'Something went wrong while deleting product',
                    err.message
                )
            );
    }
};
export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };

