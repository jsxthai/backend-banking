import express from "express";
import { authRecaptcha } from "../controllers/loginUseRecaptcha.js";

const route = express.Router();

route.post("/", authRecaptcha);

export default route;
