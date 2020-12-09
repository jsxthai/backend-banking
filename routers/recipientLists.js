import express from "express";
import User from "../models/user.js";
import {
    createRecipient,
    deleteRecipient,
    updRecipient,
    getRecipient,
} from "../controllers/recipientLists.js";
import { validateAccessToken } from "../middlewares/validateAccessToken.js";

const route = express.Router();

route.get("/:accountNumber", validateAccessToken, getRecipient);

route.post("/:accountNumber", validateAccessToken, createRecipient);

route.delete("/:accountNumber", validateAccessToken, deleteRecipient);

route.put("/:accountNumber", validateAccessToken, updRecipient);

export default route;
