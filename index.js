import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import users from "./routers/users.js";
import connectDB from "./configs/db.js";
import cors from "cors";
import login from "./routers/login.js";
import totalUser from "./routers/totalUser.js";
import accounts from "./routers/accounts.js";
import payins from "./routers/payins.js";
import history from "./routers/historyTrans.js";
import authRecaptcha from "./routers/loginUseRecaptcha.js";
import loginUseJWT from "./routers/loginUseJWT.js";
import renewToken from "./routers/renewToken.js";
import accountLists from "./routers/accountLists.js";
import recipientLists from "./routers/recipientLists.js";
import internalTransfer from "./routers/internalTransfer.js";

// config
dotenv.config();
// conncet mongodb
connectDB();

const app = express();
const port = process.env.PORT || 7777;

// app use
// app.use(cors()); // or line below
// credentials: true - Để bật cookie HTTP qua CORS
// origin: "http://localhost:3000" - Chan tat ca cac domain khac ngoai domain nay
// Access-Control-Allow-Origin: client-url
// Access-Control-Allow-Credentials: true
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

// logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// use router
app.use("/api/users", users);
app.use("/api/accounts", accounts);
app.use("/api/total-user", totalUser);
app.use("/api/login", login);
app.use("/api/payins", payins);
app.use("/api/history", history);
app.use("/api/login-recaptcha", authRecaptcha);
app.use("/api/login-use-jwt", loginUseJWT);
app.use("/api/renew-token", renewToken);
app.use("/api/v2/account-lists", accountLists);
app.use("/api/v2/recipient-lists", recipientLists);
app.use("/api/v2/internal-transfer", internalTransfer);

app.get("/", (req, res) => {
    res.json("hello, i am api banking");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
