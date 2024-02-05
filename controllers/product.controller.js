import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js";

// Getting all products
export const getProducts = async (req, res, next) => {
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Get all products'
  // #swagger.description = 'Returns all products'
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirections = req.query.sort === "desc" ? -1 : 1;
    const products = await Product.find()
      .sort(sortDirections)
      .skip(startIndex)
      .limit(limit);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// Creating a product
export const createProduct = async (req, res, next) => {
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Create a new product'
  // #swagger.description = 'Create a new product with the provided data'
  if (!req.body.name) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  try {
    const newProduct = new Product({
      name: req.body.name,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// Updating a product
export const updateProduct = async (req, res, next) => {
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Update a product'
  // #swagger.description = 'Update a product with the provided data'
  if (!req.body.name) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        $set: {
          name: req.params.name,
        },
      }
    );
    const savedProduct = await updatedProduct.save();
    res.status(200).json({
      message: "Product has been updated",
      savedProduct: savedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Deleting a product
export const deleteProduct = async (req, res, next) => {
  // #swagger.tags = ['Product']
  // #swagger.summary = 'Delete a product'
  // #swagger.description = 'Delete a product with the provided data'
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }
    res
      .status(200)
      .json({ message: "Product has been deleted", deletedProduct: product });
  } catch (error) {
    next(error);
  }
};
