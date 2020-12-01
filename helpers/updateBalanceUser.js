import User from "../models/user.js";
import { validateAccount } from "../helpers/validateAccount.js";

export const updateBalanceUser = async (accountNumber, balance) => {
    if ((await validateAccount(accountNumber)) && balance !== 0) {
        const user = await User.findOne(
            { accountNumber },
            {
                password: 0,
            },
            (err, user) => {
                if (err || !user) {
                    console.log("user", user.balance);
                    return false;
                }
                if (user) {
                    // case: new user not fount user.balance
                    if (!user.balance) {
                        user.balance = 0;
                    }
                    user.balance += balance;
                    user.save((err) => {
                        if (err) {
                            return false;
                        } else {
                            return true;
                        }
                    });
                }
            }
        );
        if (user) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};
