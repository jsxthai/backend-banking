import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await User.find({}, { fullname: 1, _id: 0 }, (err, users) => {
      if (err) return res.status(400).json(err);
      if (!users.length)
        return res.status(400).json({ msg: "user is null", users });
      return res.json({
        totalUsers: users.length,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
