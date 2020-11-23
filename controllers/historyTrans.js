import Trans from "../models/transaction.js";

export const historyTrans = async (req, res) => {
  const { accountNumber } = req.params;

  if (!accountNumber) return res.status(400).json({ msg: "No account number" });
  try {
    await Trans.find(
      {
        accountSource: accountNumber,
      },
      { sign: 0 },
      (err, trans) => {
        if (err)
          return res.status(400).json({ msg: "Err find transaction" }, err);
        if (trans.length < 1)
          return res
            .status(404)
            .json({ msg: "Account no have transaction, check again" });
        return res.status(200).json({ msg: "Find transaction success", trans });
      }
    );
  } catch (error) {
    console.log(error);
    return;
  }
};
