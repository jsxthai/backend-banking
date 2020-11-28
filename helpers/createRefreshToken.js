import jwt from "jsonwebtoken";

const createRefreshToken = (payload) => {
    const privateKey = process.env.REFRESH_TOKEN_SECRET;
    // console.log("privateKey", privateKey);
    if (privateKey === "") {
        console.log("private refresh key is null");
        return;
    }
    const token = jwt.sign(payload, privateKey);
    if (token) {
        return token;
    } else {
        console.log("token is null");
        return;
    }
};

export { createRefreshToken };
