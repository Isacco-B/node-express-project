import express from "express";
import {
  getOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("", getOrders);
router.patch("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder);

export default router;
