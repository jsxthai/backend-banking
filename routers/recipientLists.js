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

route.get("/:accountNumber", getRecipient);

route.post("/:accountNumber", createRecipient);

route.delete("/:accountNumber", deleteRecipient);

route.put("/:accountNumber", updRecipient);

export default route;
