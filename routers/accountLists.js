import express from "express";
import User from "../models/user.js";
import { validateAccessToken } from "../middlewares/validateAccessToken.js";

const route = express.Router();
route.get("/:accountNumber", validateAccessToken, (req, res) => {
    const { accountNumber } = req.params;
    console.log("acc:", accountNumber);
    User.findOne(
        {
            accountNumber,
        },
        {
            password: 0,
        },
        (err, user) => {
            if (err) {
                return res.status(400).json({ msg: "err find user", err });
            }
            if (!user) {
                return res.status(400).json({ msg: "not found user" });
            }
            res.json({
                accountNumber,
                balance: user.balance,
                savingsAccount: user.savingsAccount,
            });
            // console.log(user.savingsAccount);
        }
    );
});

export default route;
