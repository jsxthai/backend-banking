import express from "express";
import { createAccessToken } from "../helpers/createAccessToken.js";
import { validateRefreshToken } from "../helpers/validateRefreshToken.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
        return res.status(401).json({ msg: "no have refresh token" });
    }
    const payload = await validateRefreshToken(refreshToken);

    // validate
    // receive false
    if (payload === false) {
        return res.status(401).json({ msg: "validate re token false" });
    }

    const accessToken = await createAccessToken(payload);
    if (!accessToken) {
        return res.status(401).json({ msg: "can not create new access token" });
    }
    // console.log(accessToken);
    res.cookie("accessToken", accessToken);
    return res.json({ msg: "create new token success" });
});

export default router;
