import { saveTransaction } from "../helpers/saveTransaction.js";
import { updateBalanceUser } from "../helpers/updateBalanceUser.js";
import { validateAccount } from "../helpers/validateAccount.js";

// body
// {
//     "mount": 900000,
//     "detail": "chuyen tien",
//     "sign": "djasdnaskdasj",
//     "date": 8498434
// }

export const internalTransfer = async (req, res) => {
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
        // check số tiền thỏa giao dịch: sau khi trừ tiền số dư phải lớn hơn 0
        // số tiền giao dịch hợp lệ ....
        //  sau dó update
        // if(checkMountMoney) // upd
        // case: tín dụng cho phép số âm (nợ), khỏi check @@

        // upd balance 2 user
        const isUpdBalanceSource = await updateBalanceUser(
            accountSource,
            -mount
        );
        const isUpdBalanceDest = await updateBalanceUser(accountDest, mount);
        // if 1 trong 2 thất bại phải roll back
        // update lại
        // console.log(isUpdBalanceSource);
        // console.log(isUpdBalanceDest);

        // case true and true // 2 giao dịch thành lông
        // save log transaction
        const isSaveTrans = await saveTransaction(
            accountSource,
            accountDest,
            mount,
            detail,
            sign,
            date,
            typeTrans
        );
        if (isUpdBalanceSource && isUpdBalanceDest && isSaveTrans) {
            res.status(201).json({ msg: "transaction success" });
        }
    } catch (error) {
        console.log("err interal transfer", error);
    }
};
