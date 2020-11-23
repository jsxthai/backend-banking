import express from "express";
import { payin } from "../controllers/payin.js";

const route = express.Router();

route.put("/", payin);

export default route;
