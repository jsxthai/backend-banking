import jwt from "jsonwebtoken";

const validateAccessToken = (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        return res.status(401).json({ msg: "not found access token" });
    }

    const publicKey = process.env.PUBLIC_KEY || pK;
    if (!publicKey) {
        console.log("public key is null");
        return res.status(401).json({ msg: "server not auth now" });
    }

    jwt.verify(accessToken, publicKey, (err, payload) => {
        if (err)
            return res.status(401).json({ msg: "server not auth now", err });
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
