import express from "express";
import { authRecaptcha } from "../controllers/auth-recaptcha.js";

const route = express.Router();

route.post("/", authRecaptcha);

export default route;
