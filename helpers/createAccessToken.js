import jwt from "jsonwebtoken";

const createAccessToken = (payload) => {
    const options = {
        expiresIn: "1h",
        issuer: "Thai Thai das7yh",
        algorithm: "RS256",
    };
    const privateKey = process.env.PRIVATE_KEY_RSA;

    // console.log("key access token :", keyP);

    if (privateKey === "") {
        console.log("private key is null, exit");
        return;
    }
    const token = jwt.sign(payload, privateKey, options);
    // console.log("token  ssssssssss", token);
    if (token) {
        return token;
    } else {
        console.log("token is null, exit");
        return false;
    }
};

export { createAccessToken };
