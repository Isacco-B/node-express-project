import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("", getUser);
router.post("", createUser);
router.patch("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
