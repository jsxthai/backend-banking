import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    accountSource: {
        type: String,
        required: true,
    },
    accountDest: {
        type: String,
        required: true,
    },
    mount: {
        type: Number,
        required: true,
    },
    sign: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        default: Date.now()
    },
    detail: String,
    typeTrans:{
        type: String,
        required: true,
    }
})

const transaction = mongoose.model('transaction', transactionSchema);
export default transaction;