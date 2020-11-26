import User from "../models/user.js";
import { validateHuman } from "../helper/validateRecaptcha.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../helper/createAccessToken.js";

const authRecaptcha = async (req, res) => {
    const { recaptchaToken, loginData } = req.body;
    const { username, password } = loginData;

    // basic validate
    if (!recaptchaToken)
        return res.status(400).json({ msg: "recaptcha token not found" });
    if (!username || !password)
        return res
            .status(400)
            .json({ msg: "username or password is null or empty" });
    console.log(loginData);

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
