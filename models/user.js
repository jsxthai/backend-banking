import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    fullname: String,
    accountNumber: String,
    savingsAccount: [String],
    createAt: String,
    role: { $type: String, default: 'user' },
    balance: Number,
    transfer: [{
        to: String,
        money: Number,
        date: String,
        type: String,
        details: String,
    }],
    receive: [{
        from: String,
        money: Number,
        date: String,
        details: String,
    }],
}, { typeKey: '$type' })


const User = mongoose.model('user', userSchema);

export default User;