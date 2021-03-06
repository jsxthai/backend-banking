import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const fetchUsers = (req, res) => {
  //   console.log(req.query);
  let { startDate, endDate } = req.query;

  if (!startDate || startDate == "undefined") {
    startDate = 0;
  }
  if (!endDate || endDate == "undefined") {
    endDate = Date.now();
  }
  //   console.log(startDate, endDate);
  try {
    User.find(
      {
        createAt: {
          $gte: startDate,
          $lt: endDate,
        },
      },
      { password: 0, _id: 0, balance: 0 },
      (err, users) => {
        if (err) return res.status(400).json(err);
        return res.json(users);
      }
    ).sort({ createAt: -1 });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req, res) => {
  let data = req.body;
  // hash passwords
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);

  // default Date.now in schema is duplicate date : test in loacal
  // fix:
  const userNew = {
    ...data,
    accountNumber: Date.now(), //
    createAt: Date.now(), //
  };
  try {
    const user = await new User(userNew);
    await user.save((err) => {
      if (err) return res.status(400).json(err);
      return res.json({
        msg: "created new user",
        user,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  if (!req.params.userId) return res.json({ msg: "no userId" });
  const filter = {
    _id: req.params.userId,
  };
  const update = {
    ...req.body,
  };
  try {
    await User.find(filter, (err) => {
      if (err) return res.status(400).json({ msg: "_id not found", err });
      User.updateOne(filter, update, (err) => {
        if (err) return res.status(400).json(err);
        return res.json({
          msg: "updated user",
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  if (!req.params.userId) {
    return res.status(400).json({
      msg: "no userId",
    });
  }
  try {
    await User.find({ _id: req.params.userId }, (err) => {
      if (err) return res.status(400).json({ msg: "_id not found", err });
      User.deleteOne({ _id: req.params.userId }, (err) => {
        if (err) return res.status(400).json(err);
        return res.json({
          msg: "deleted user",
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUsersWithId = async (req, res) => {
  console.log("fetch user id");
  if (!req.params.userId)
    return res.status(400).json({
      msg: "not found userId",
    });
  try {
    await User.findById({ _id: req.params.userId }, (err, users) => {
      if (err) return res.status(400).json({ msg: "_id not found", err });
      return res.json(users);
    });
  } catch (err) {
    console.log(err);
  }
};

export const payIn = async (req, res) => {
  if (!req.params.accountNumber)
    return res.status(400).json({
      msg: "not found account number",
    });
  try {
    await User.findOne(
      { accountNumber: req.params.accountNumber },
      (err, users) => {
        if (err)
          return res.status(400).json({ msg: "err server- pay in", err });
        if (!users) return res.status(400).json({ msg: "user not found", err });
        const balance = users.balance || 0;
        User.updateOne(
          { accountNumber: req.params.accountNumber },
          { balance: balance + req.body.balance },
          (err, msg) => {
            if (err) return res.status(400).send({ msg: "upd", err });
            return res.json({
              status: "update ok",
              msg,
            });
          }
        );
      }
    );
  } catch (err) {
    console.log({ msg: "err server- pay in", err });
  }
};
