import express from "express";
import { internalTransfer } from "../controllers/internalTransfer.js";

// import User from "../models/user.js";

const route = express.Router();

route.post("/:accountSource/:accountDest", internalTransfer);

export default route;
