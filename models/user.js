import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    fullname: String,
    accountNumber: {
        type: String,
    },
    savingsAccount: [String],
    createAt: {
        type: Date,
        default: Date.now()
    },
    type: String,
    balance: Number
})


const User = mongoose.model('user', userSchema);

export default User;