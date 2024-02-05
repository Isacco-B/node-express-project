import express from "express";
import {
  getOrders,
  updateOrder,
  deleteOrder,
  createOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrder);
router.patch("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

export default router;
