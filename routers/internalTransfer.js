import express from "express";
import { internalTransfer } from "../controllers/internalTransfer.js";
import { validateAccessToken } from "../middlewares/validateAccessToken.js";

// import User from "../models/user.js";

const route = express.Router();

route.post(
    "/:accountSource/:accountDest",
    validateAccessToken,
    internalTransfer
);

export default route;
