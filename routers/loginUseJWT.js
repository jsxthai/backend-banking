import express from "express";
import { loginUseToken } from "../controllers/loginUseJWT.js";
import { validateAccessToken } from "../middlewares/validateAccessToken.js";

const route = express.Router();

route.post("/", validateAccessToken, loginUseToken);

export default route;
