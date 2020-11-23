import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
const PRIVATE_KEY =
  fs.readFileSync(
    path.resolve(__dirname, "backend-banking", "../key/privateKey.pem"),
    "utf-8"
  ) || process.env.PRIVATE_KEY;
// console.log(PRIVATE_KEY)

export const authAccount = async (req, res) => {
  const { username, password } = req.body;
  // check from client
  if (!username || !password)
    return res.status(401).json({
      msg: "Please enter user name and password !",
    });

  // check username in db
  await User.findOne({ username }, async (err, user) => {
    if (err || !user)
      return res.status(401).json({ msg: "not found username", err });
    // checking password is correct
    const validPass = await bcrypt.compare(password, user.password);
    // console.log(password, '-----', user.password)
    // if not correct: false
    if (!validPass) return res.status(401).send("Invalid password");

    // create payload
    const payload = {
      accountNumber: user.accountNumber,
      role: "user",
    };

    // sau 1h không truy cập tài nguyên được nữa, vd: chức năng payin
    // cần login lại or
    // xử lý resfesh token cấp access token lại
    const options = {
      expiresIn: "1h",
      issuer: "Thai JS",
      algorithm: "RS256",
    };
    // sign jwt

    const token = jwt.sign(payload, PRIVATE_KEY, options);

    return res.json({
      msg: "login successed",
      userData: user.username,
      token,
    });
  });
};
