import {
  login,
  register,
  verifyOTP,
} from "../../../controllers/userControllers.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/otpverification", verifyOTP);
router.post("/login", login);
export default router;
