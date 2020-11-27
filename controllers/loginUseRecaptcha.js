import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { validateHuman } from "../helpers/validateRecaptcha.js";
import { createAccessToken } from "../helpers/createAccessToken.js";

const authRecaptcha = async (req, res) => {
    // console.log("payload", req.payload);
    // console.log("cookie", req.cookies);
    // console.log(loginData);
    const { recaptchaToken, loginData } = req.body;
    const { username, password } = loginData;

    // basic validate
    if (!recaptchaToken)
        return res.status(401).json({ msg: "recaptcha token not found" });
    if (!username || !password)
        return res
            .status(401)
            .json({ msg: "username or password is null or empty" });

    // validate is human with gg
    const human = await validateHuman(recaptchaToken);
    if (!human) return res.status(401).json({ err: "bot in your area." });

    // validate username and password
    try {
        User.findOne({ username }, (err, user) => {
            if (err || !user)
                return res.status(401).json({ msg: "username not found" });
            // is user
            // bcrypt.compare(password, user.passwordHash)
            bcrypt.compare(password, user.password, (err, result) => {
                if (err)
                    return res
                        .status(401)
                        .json({ msg: "compare password err" });
                if (result) {
                    // true passord
                    // create acs token
                    const payload = {
                        accountNumber: user.accountNumber,
                        username: user.username,
                        email: user.email,
                    };
                    const accessToken = createAccessToken(payload);
                    return res.json({
                        msg: "login success",
                        accessToken,
                    });
                }
                return res.status(401).json({ msg: "password incorrect" });
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: "username or password incorrect" });
    }
};

export { authRecaptcha };
