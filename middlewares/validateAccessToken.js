import jwt from "jsonwebtoken";
const { TokenExpiredError } = jwt;

const validateAccessToken = (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return res.status(401).json({ msg: "not found access token" });
    }

    // console.log("acc:", accessToken);
    const publicKey = process.env.PUBLIC_KEY;
    console.log("pub key", publicKey);
    if (!publicKey) {
        console.log("public key is null");
        return res.status(401).json({ msg: "server not auth now" });
    }

    jwt.verify(accessToken, publicKey, (err, payload) => {
        if (err) {
            // xu ly bang refresh token .....// note
            // cấp lại token mới luôn cho user hoặc bắt user đăng nhập lại
            // cấp mới: - dùng refresh token lưu ở database của user đó,
            // refresh token nếu lưu ở user thì user sử dụng send request để cấp mới accesstoken
            if (err instanceof TokenExpiredError) {
                console.log("token is exprired");
                return res.status(401).json({ msg: "token is exprired", err });
            }
            console.log("err verify", err);
            return res
                .status(401)
                .json({ msg: "server not verify token", err });
        }
        // is payload
        req.payload = payload;
        next();
    });
};

export { validateAccessToken };
