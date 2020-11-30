import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    fullname: String,
    accountNumber: {
        type: String,
        required: true,
    },
    savingsAccount: [
        {
            number: String,
            mount: Number,
        },
    ],
    recipient: [
        {
            number: String,
            name: String,
        },
    ],
    createAt: String,
    role: { type: String, default: "user" },
    balance: Number,
});
// type -> $type
// { typeKey: '$type' }

const User = mongoose.model("user", userSchema);

export default User;
