import jwt from "jsonwebtoken";

const createAccessToken = (payload) => {
    const options = {
        expiresIn: "1h",
        issuer: "Thai Thai das7yh",
        algorithm: "RS256",
    };
    // let privateKey = process.env.PRIVATE_KEY || priK;

    var privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
    privateKey = privateKey.toString("base64");

    console.log("privateKey  ssssssssss", privateKey);
    // privateKey = privateKey.toString();
    // console.log("privateKey  2222222222", privateKey.toString());

    if (privateKey === "") {
        console.log("private key is null, exit");
        return;
    }
    const token = jwt.sign(payload, privateKey, options);
    console.log("token  ssssssssss", token);
    if (token) {
        return token;
    } else {
        console.log("token is null, exit");
        return false;
    }
};

// or = ""
const priK = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQC+nA6hvZWZzxp8G9IYOd7Rn44ijGk1k8rJnL/hdFo63R7yf6Tf
62j/p2rA/4x2nVTQaiNPvZYHdZkq3SR0dNW5E11/TNR4jEUr6TyPScP88v8m+YPl
s3g+eS6f1uW2iENrWNuDWJOJM4YonMOGEm8MCWZD9hVXvtXEr7TdWfW26QIDAQAB
AoGAcgWgqxhh+ZRuX3e1AlD7/aHYwMoF1csHL/vYvOGBaF0GOkIpOtn0AZsAvVsh
h4MuTU5wuS7MJMIwUfff6tpJTlj+Gd4jmMBkTot/YO6VXYvKutwAWIA8bQl4YLXO
A0KlkDuQG3se4wn0yDtnKXl7uUAncyC03fR7zTq2gp4gl9ECQQDfW5q0ie6/D2if
u2UrpF06RKfW0BZBk4cNEMnbTy8UpbUW5vC97zrADRIuZEmwnNuHZZGfOosvoy/U
Qr+zST2vAkEA2ndBrymbxaeMLPgceGeVRCDDrqGaAAFPMSerNd6c3ZQiH/9XG7XY
R5fKSm9l9emTMG0SguSGPHBKlQ39cPNS5wJADlInRzAY2LM6OBOh1vyA5b2FLWbG
Joo4/IN5DdCz6hT92WwRP3xZPfsYkVTozKQiBzph7d2pEvLZnDhzZiFqDQJBAIuD
NRMjQzMKOF5PY/8QRyZmthBDaxEtxODjMFcKfqqR+ujsKziq/B9cM/ctBLPyIej+
/p9QSNk37Kkbcgo7mWkCQQCDG0nKOoOoAz0PwEKyxknOBqxlU6eOPfN4U7Vu1tTF
mWLL8mIl/TWylnK/MjNXXk74Fd6Mjl0Fk+FP1629WAHc
-----END RSA PRIVATE KEY-----`;

export { createAccessToken };
