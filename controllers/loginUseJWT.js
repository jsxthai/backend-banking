const loginUseToken = (req, res) => {
    const payload = req.payload;
    // console.log("pl", payload);
    const accessToken = req.cookies.accessToken;

    // console.log("all cookie: ", req.cookies);

    return res.json({
        msg: "login success",
        accessToken,
        role: payload.role,
        // login bình thường có role
        // login bằng jwt ko gửi role riêng -> bug
        // -> nên đặt chung vào token
        // client phải decode token check role chuyển hướng
        // để chung 1 chỗ xử lý, đỡ bug
        // hiện tại để riêng ........@
    });
};

export { loginUseToken };
