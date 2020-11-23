import express from "express";
import { historyTrans } from "../controllers/historyTrans.js";

const route = express.Router();

route.get("/:accountNumber", historyTrans);

export default route;
