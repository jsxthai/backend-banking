import Trans from "../models/transaction.js";

export const saveTransaction = async (
    accountSource,
    accountDest,
    mount,
    detail,
    sign,
    date,
    typeTrans
) => {
    try {
        // check type ...
        // new trans
        const trans = new Trans({
            accountSource,
            accountDest,
            mount,
            detail,
            sign,
            date,
            typeTrans,
        });
        const result = await trans.save();
        if (result) {
            console.log(result);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};
