import User from "../models/user.js";

async function validateAccount(accountNumber) {
    try {
        const user = await User.findOne(
            {
                accountNumber,
            },
            {
                password: 0,
            }
        );
        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
    }
}

export { validateAccount };
