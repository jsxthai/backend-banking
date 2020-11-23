import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();

const PUBLIC_KEY =
  process.env.PUBLIC_KEY ||
  fs.readFileSync(
    path.resolve(__dirname, "backend-banking", "../key/publicKey.pem"),
    "utf-8"
  );

export const payin = (req, res) => {
  const jwtToken = req.headers.authorization.split(" ")[1];
  const { mount, accountNumber, typeTrans, detail } = req.body;

  // check token
  if (!jwtToken) return res.status(401).json({ msg: "no token" });

  // validate token = time
  // .....later

  // validate token = publicKey
  jwt.verify(jwtToken, PUBLIC_KEY, (err, payload) => {
    if (err) return res.status(401).json({ msg: "sign khong hop le" });
    else {
      // find user with payload.accountNumber
      User.findOne({ accountNumber: accountNumber }, (err, user) => {
        if (err || !user) return res.status(401).json({ msg: "user is null" });
        // is user
        // save in transaction db
        const transRow = new Transaction({
          accountSource: accountNumber,
          accountDest: accountNumber,
          mount: mount,
          sign: jwtToken,
          date: Date.now(),
          detail: detail || "no comment",
          typeTrans: typeTrans || "receive",
        });
        transRow.save((err) => {
          if (err) return res.status(400).json({ msg: "save transaction err" });
          // save transaction success
          // update balance user
          // if err -> handle rollback user, trans .... later
          User.updateOne(
            { accountNumber: accountNumber },
            { balance: (user.balance || 0) + mount },
            (err, resultUpd) => {
              if (err)
                return res.status(400).json({
                  msg: "err update balance user, (rollback transaction pre)",
                });
              return res.json({ msg: "all payin sucess", resultUpd });
            }
          );
        });
      });
    }
  });
};
