import User from "../models/user.js";

export const getRecipient = async (req, res) => {
    const { accountNumber } = req.params;
    if (!accountNumber) {
        return res.status(400).json({ msg: "no account number" });
    }
    try {
        await User.findOne({ accountNumber }, { password: 0 }, (err, user) => {
            if (err) {
                return res
                    .status(400)
                    .json({ msg: "not found with account number", err });
            }
            if (!user) {
                return res.status(400).json({ msg: " account number invalid" });
            }
            if (user.recipient) {
                //
                return res.json({ msg: "ok", recipient: user.recipient });
            }
        });
    } catch (error) {
        return res.status(400).json({ msg: " account number invalid", error });
    }
};
export const createRecipient = async (req, res) => {
    const { accountNumber } = req.params;
    if (!accountNumber) {
        return res.status(400).json({ msg: "no account number" });
    }
    const { number, name } = req.body;
    if (!number || !name) {
        return res.status(400).json({ msg: "params incorrect" });
    }
    try {
        // find => save
        User.findOne({ accountNumber }, { password: 0 }, (err, user) => {
            if (err)
                return res.status(400).json({ msg: "find, serrver err ", err });
            if (!user)
                return res
                    .status(400)
                    .json({ msg: "not found with account, check again " });
            user.recipient.push({
                number,
                name,
            });
            user.save((err, doc) => {
                if (err)
                    return res
                        .status(400)
                        .json({ msg: "find, serrver err ", err });
                else {
                    return res.json({
                        msg: "create success",
                        recipient: doc.recipient,
                    });
                }
            });
        });

        // or use
        // { $push: { <field1>: { <modifier1>: <value1>, ... }, ... } }
        // User.update(
        //     { accountNumber },
        //     {
        //         $push: {
        //             recipient: {
        //                 number,
        //                 name,
        //             },
        //         },
        //     },
        //     (err, upd) => {
        //         if (err)
        //             return res.status.json({ msg: "server err update", err });
        //         return res.json({ msg: "update success", upd });
        //     }
        // );
    } catch (error) {
        return res.status(400).json({ msg: "server err, not create ", error });
    }
};

export const deleteRecipient = async (req, res) => {
    const { accountNumber } = req.params;
    if (!accountNumber) {
        return res.status(400).json({ msg: "no account number" });
    }
    const { number, name } = req.query;
    console.log("sssssss", req.query);
    if (!number || !name) {
        return res.status(400).json({ msg: "params incorrect" });
    }

    // handle
    User.findOne({ accountNumber }, { password: 0 }, (err, user) => {
        if (err) {
            return res
                .status(400)
                .json({ msg: "server err, can not find user", err });
        }
        if (!user) {
            return res
                .status(400)
                .json({ msg: "not found user with account nunber" });
        }
        if (user) {
            // update ====>> updateOne
            user.updateOne(
                {
                    $pull: {
                        recipient: {
                            number,
                            name,
                        },
                    },
                    // del
                },
                { multi: false },
                (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            msg: "server err, can not find user",
                            err,
                        });
                    }
                    return res.json({ msg: "delete success", result });
                }
            );
        }
    });

    try {
    } catch (error) {
        return res.status(400).json({ msg: "server err, not delete ", error });
    }
};

export const updRecipient = async (req, res) => {
    const { accountNumber } = req.params;
    if (!accountNumber) {
        return res.status(400).json({ msg: "no account number" });
    }
    console.log("aaaa", req.body);
    const { number, name } = req.body;
    if (!number || !name) {
        return res.status(400).json({ msg: "params incorrect" });
    }
    // handle
    User.findOne({ accountNumber }, { password: 0 }, (err, user) => {
        if (err) {
            return res
                .status(400)
                .json({ msg: "server err, can not find user", err });
        }
        if (!user) {
            return res
                .status(400)
                .json({ msg: "not found user with account nunber" });
        }
        if (user) {
            // https://docs.mongodb.com/manual/reference/operator/update/positional/#update-documents-in-an-array
            // console.log(("user", user));

            User.updateOne(
                {
                    accountNumber,
                    "recipient.number": number,
                },
                {
                    // .$.
                    $set: {
                        "recipient.$.name": name,
                    },
                },
                (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            msg: "server err ",
                            err,
                        });
                    }
                    console.log(result);
                    return res.json({ msg: "update success", result });
                }
            );
        }
    });

    try {
    } catch (error) {
        return res.status(400).json({ msg: "server err, not delete ", error });
    }
};
