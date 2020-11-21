import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Transaction from "../models/transaction.js";

const route = express.Router();

// route payin a user
// POST .../api/payin
route.put("/", (req, res) => {
  const jwtToken = req.headers.authorization.split(" ")[1];
  const {mount, accountNumber} = req.body;
  // check token
  if (!jwtToken) return res.status(401).json({ msg: "no token" });

  // validate token = time
  // .....later

  // validate token = publicKey
  jwt.verify(jwtToken, process.env.PUBLIC_KEY, (err, payload) => {
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
          sign: jwtToken.split(".")[2],
          date: Date.now,
          detail: "payin me",
          typeTrans: "payin",
        });
        transRow.save((err) => {
          if (err) return res.status(400).json({ msg: "save transaction err" });
          // save transaction success
          // update balance user
          // if err -> handle rollback user, trans .... later
          User.updateOne(
            { accountNumber: accountNumber },
            { balance:( user.balance || 0) + mount },
            (err, resultUpd) => {
                if(err) return res.status(400).json({ msg: "err update balance user, (rollback transaction pre)" });
                return res.json({msg: 'all payin sucess', resultUpd})
            }
          );
        });
      });
    }
  });
});

export default route;
