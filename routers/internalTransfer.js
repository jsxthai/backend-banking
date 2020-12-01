import express from "express";
import { updateBalanceUser } from "../helpers/updateBalanceUser.js";
import { validateAccount } from "../helpers/validateAccount.js";
import User from "../models/user.js";

const route = express.Router();

// post  api/internal-transfer/89999999999/
// body
// {
//     "mount": 900000,
//     "detail": "chuyen tien",
//     "sign": "djasdnaskdasj",
//     "date": 8498434
// }
route.post("/:accountSource/:accountDest", async (req, res) => {
    // console.log(req.params);
    // console.log(req.query);
    // console.log(req.body);
    const { accountSource, accountDest } = req.params;
    const { typeTrans } = req.query;
    const { mount, detail, sign, date } = req.body;

    if (!accountSource || !accountDest) {
        return res.status(400).json({ msg: "account is not exists" });
    }
    if (!typeTrans || typeTrans !== "transfer") {
        return res.status(400).json({ msg: "type transfer is not exists" });
    }
    if (!mount || !sign || !date) {
        return res.status(400).json({ msg: "info insufficient" });
    }

    const isAccountSource = await validateAccount(accountSource);
    const isAccountDest = await validateAccount(accountDest);
    if (!isAccountSource || !isAccountDest) {
        return res.status(400).json({ msg: "account not found" });
    }

    try {
        const isUpdBalanceSource = await updateBalanceUser(
            accountSource,
            -mount
        );
        const isUpdBalanceDest = await updateBalanceUser(accountDest, mount);
        console.log(isUpdBalanceSource);
        console.log(isUpdBalanceDest);
    } catch (error) {
        console.log("err interal transfer", error);
    }
});

export default route;
