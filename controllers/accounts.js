import User from '../models/user.js';

export const checkingAccount = async (req, res) => {
    const { accountNumber } = req.params;
    if (!accountNumber) return res.status(400).json({ msg: 'account number is null' })
    try {
        // no query password and balance
        User.findOne({ accountNumber }, { password: 0, balance: 0 }, (err, dataFound) => {
            if (err) return res.status(400).json({ msg: 'find err', err });
            if (!dataFound) return res.status(400).json({ msg: 'find null data', err });
            return res.json(dataFound);
        })
    } catch (error) {
        console.log(error)
    }

}