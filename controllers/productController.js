import asyncHandler from '../middleware/asyncHandler.js';
import ProductModel from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await ProductModel.find();
    res.json(products);
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { productId, title, description, realPrice, discountedPrice } = req.body;
    const newProduct = new ProductModel({ productId, title, description, realPrice, discountedPrice });
    const product = await newProduct.save();
    res.json(product);
})



export { getProducts, createProduct };

