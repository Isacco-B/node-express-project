import Order from "../models/order.model.js";
import { errorHandler } from "../utils/error.js";

// Creating a orders
export const createOrder = async (req, res, next) => {
  // #swagger.tags = ['Order']
  // #swagger.summary = 'Create a new order'
  // #swagger.description = 'Create a new order with the provided data'
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/orderSchema"
                    }
                }
            }
        }
    */
  try {
    const { products, users } = req.body;
    if (!products || !users) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    const newOrder = new Order({
      products,
      users,
    });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    next(error);
  }
};

// Getting all orders
export const getOrders = async (req, res, next) => {
  // #swagger.tags = ['Order']
  // #swagger.summary = 'Get all orders'
  // #swagger.description = 'Returns all orders'
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === "desc" ? -1 : 1;
    const orders = await Order.find({
      ...(req.query.orderId && { _id: req.query.orderId }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    if (orders.length === 0) {
      return next(errorHandler(404, "Order not found"));
    }

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

// Updating an order
export const updateOrder = async (req, res, next) => {
  // #swagger.tags = ['Order']
  // #swagger.summary = 'Update an order'
  // #swagger.description = 'Update an order with the provided data'
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/orderSchema"
                    }
                }
            }
        }
    */

  try {
    const { products, users } = req.body;
    const updateFields = {};

    if (products !== undefined) {
      updateFields.products = products;
    }
    if (users !== undefined) {
      updateFields.users = users;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedOrder) {
      return next(errorHandler(404, "Order not found"));
    }

    res.status(200).json({ message: "Order has been updated", updatedOrder });
  } catch (error) {
    next(error);
  }
};

// Deleting an order
export const deleteOrder = async (req, res, next) => {
  // #swagger.tags = ['Order']
  // #swagger.summary = 'Delete a orders'
  // #swagger.description = 'Delete a order with the provided data'
  try {
    const order = await Order.findByIdAndDelete(req.params.orderId);
    if (!order) {
      return next(errorHandler(404, "Order not found"));
    }
    res.status(200).json({
      message: "Order has been deleted",
      deletedOrder: order,
    });
  } catch (error) {
    next(error);
  }
};
