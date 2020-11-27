const loginUseToken = (req, res) => {
    const accessToken = req.cookies.accessToken;
    return res.json({
        msg: "login success",
        accessToken,
    });
};

export { loginUseToken };
