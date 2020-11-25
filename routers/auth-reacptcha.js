import express from "express";
import axios from "axios";
import { closeSync } from "fs";

const route = express.Router();

route
    .get("/", (req, res) => {
        const { token } = req.body;
        console.log("token: ", token);
        res.send("token ---");
    })
    .post("/", async (req, res) => {
        const { token } = req.body;

        const human = await validateHuman(token);
        console.log(human);
        if (!human)
            return res
                .status(400)
                .json({ err: "Bot in your area, not backpink." });

        res.json({ msg: "success !" });
    });

const validateHuman = async (token) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY || "6LcxqugZAAAAAGVIXI5Zx_";
    const response = token;
    // pass parameter
    const urlRecapGG = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`;
    try {
        const res = await axios.post(urlRecapGG);
        if (res.data.success) {
            // console.log("res.data.success", res.data.success);
            return res.data.success;
        }
    } catch (error) {
        // console.log("error", error);
        return false;
    }
};

export default route;
