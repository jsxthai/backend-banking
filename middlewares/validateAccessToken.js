import jwt from "jsonwebtoken";
const { TokenExpiredError } = jwt;

const validateAccessToken = (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return res.status(401).json({ msg: "not found access token" });
    }

    // console.log("acc:", accessToken);
    const publicKey = process.env.PUBLIC_KEY || pK;
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
            return res
                .status(401)
                .json({ msg: "server not verify token", err });
        }
        // is payload
        req.payload = payload;
        next();
    });
};

const pK = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+nA6hvZWZzxp8G9IYOd7Rn44i
jGk1k8rJnL/hdFo63R7yf6Tf62j/p2rA/4x2nVTQaiNPvZYHdZkq3SR0dNW5E11/
TNR4jEUr6TyPScP88v8m+YPls3g+eS6f1uW2iENrWNuDWJOJM4YonMOGEm8MCWZD
9hVXvtXEr7TdWfW26QIDAQAB
-----END PUBLIC KEY-----`;

export { validateAccessToken };
