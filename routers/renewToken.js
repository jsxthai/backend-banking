import express from "express";
import { renewToken } from "../controllers/renewToken.js";
const router = express.Router();

router.post("/", renewToken);

export default router;
