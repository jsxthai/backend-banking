import mongoose, { mongo } from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    emai: String,
    phone: String,
    fullname: String,
    accountNumber: String,
    savingsAccount: [String],
    createAt: {
        type: Date,
        default: Date.now
    },
    type: String,
    balance: Number
})

const User = mongoose.model('user', userSchema);

export default User;