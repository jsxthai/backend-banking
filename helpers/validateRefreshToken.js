import jwt from "jsonwebtoken";

const validateRefreshToken = async (reToken) => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        console.log("re token is null, exit");
        return false;
    }
    const token = await jwt.verify(reToken, process.env.REFRESH_TOKEN_SECRET);
    if (token) {
        return token;
    }
    return false;
};

export { validateRefreshToken };
