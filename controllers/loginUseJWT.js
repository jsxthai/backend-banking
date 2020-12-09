const loginUseToken = (req, res) => {
    const payload = req.payload;
    // console.log("pl", payload);
    const accessToken = req.cookies.accessToken;

    console.log("all cookie: ", req.cookies);

    return res.json({
        msg: "login success",
        accessToken,
    });
};

export { loginUseToken };
