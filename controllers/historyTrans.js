import { getLengthModel } from "../helpers/getLengthModel.js";
import Trans from "../models/transaction.js";

export const historyTrans = async (req, res) => {
    const { accountNumber } = req.params;
    // limit : page size
    let { limit, page, typeTrans } = req.query;
    limit = parseInt(limit) || 10;
    page = page | 0;
    // console.log("limit: ", limit, "page: ", page);
    // console.log("type trans ", typeTrans);

    // console.log("length", lengthModel);

    // const skip = ();
    if (!accountNumber)
        return res.status(400).json({ msg: "No account number" });

    // user là người tự chuyển tiền, accountSource
    const filter = {
        accountSource: accountNumber,
    };
    // user là người được nhận tiền, accountDest
    const filter2 = {
        accountDest: accountNumber,
    };

    // hiện tại chỉ có 2 type
    // nhiều: array, true find in array
    if (typeTrans === "receive" || typeTrans === "transfer") {
        filter.typeTrans = typeTrans;
        filter2.typeTrans = typeTrans;
    }

    // làm chung, tiện cho client, server mỗi lần phải get length lại
    // get lại đảm bảo length luôn được cập nhật mới
    const lengthModelAccountSource = await getLengthModel(Trans, filter);
    const lengthModelAccountDest = await getLengthModel(Trans, filter2);

    // console.log("leng", lengthModel);
    if (
        lengthModelAccountSource === false ||
        lengthModelAccountDest === false
    ) {
        return res
            .status(400)
            .json({ msg: "Server get total lenght of model err" });
    }

    try {
        await Trans.find(
            // { $and: [filter, filter2] },
            { $or: [filter, filter2] },
            { sign: 0, _id: 0 },
            (err, trans) => {
                if (err)
                    return res
                        .status(400)
                        .json({ msg: "Err find transaction" }, err);
                // if (trans.length < 1)
                //     return res.status(404).json({
                //         msg: "Account no have transaction, check again",
                //     });

                return res.status(200).json({
                    msg: "Find transaction success",
                    trans,
                    totalRows:
                        lengthModelAccountSource + lengthModelAccountDest,
                    limit,
                    page,
                });
            }
        )
            .skip(page > 0 ? (page - 1) * limit : 0)
            .limit(limit)
            .sort({ date: "desc" });
    } catch (error) {
        console.log(error);
        return;
    }
};
