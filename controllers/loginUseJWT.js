const loginUseToken = (req, res) => {
    const payload = req.payload;
    // console.log("pl", payload);
    const accessToken = req.token;

    return res.json({
        msg: "login success",
        accessToken,
    });
};

export { loginUseToken };
