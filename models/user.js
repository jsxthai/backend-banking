import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    fullname: String,
    accountNumber: {
        type: String,
        default: rand()
    },
    savingsAccount: [String],
    createAt: {
        type: Date,
        default: Date.now()
    },
    type: String,
    balance: Number
})

function rand(min = 1000000000, max = 9999999999) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.round(randomNum);
}

const User = mongoose.model('user', userSchema);

export default User;