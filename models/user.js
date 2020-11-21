import mongoose from 'mongoose';

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
    savingsAccount: [String],
    createAt: String,
    role: { type: String, default: 'user' },
    balance: Number,
})
// { typeKey: '$type' }

const User = mongoose.model('user', userSchema);

export default User;