import express from "express";
import { authRecaptcha } from "../controllers/auth-recaptcha.js";
import { validateAccessToken } from "../middlewares/validateAccessToken.js";

const route = express.Router();

// test middleware
// xong xoa
route.post("/", validateAccessToken, authRecaptcha);

export default route;
