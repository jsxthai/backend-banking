import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import users from "./routers/users.js";
import connectDB from "./config/db.js";
import cors from "cors";
import login from "./routers/login.js";
import totalUser from "./routers/totalUser.js";
import accounts from "./routers/accounts.js";
import payins from "./routers/payins.js";
import history from "./routers/historyTrans.js";

// config
dotenv.config();
// conncet mongodb
connectDB();

const app = express();
const port = process.env.PORT || 7777;

// app use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

app.get("/", (req, res) => {
  res.json("hello, i am api banking");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
