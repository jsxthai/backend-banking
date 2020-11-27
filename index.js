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

// config
dotenv.config();
// conncet mongodb
connectDB();

const app = express();
const port = process.env.PORT || 7777;

// app use
// app.use(cors()); // or line below
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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

app.get("/", (req, res) => {
    res.json("hello, i am api banking");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
