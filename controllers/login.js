import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const authAccount = async (req, res) => {
    const { username, password } = req.body;
    // check from client
    if (!username || !password) return res.status(400).json({
        msg: 'The login details are incorrect. Try again.'
    })

    // check username in db
    await User.findOne({ username }, async (err, user) => {
        if (err || !user) return res.status(400).json({ msg: 'not found username', err });
        // checking password is correct
        const validPass = await bcrypt.compare(password, user.password);
        // console.log(password, '-----', user.password)
        // if not correct: false
        if (!validPass) return res.status(400).send('Invalid password');

        // correct
        const payload = {
            accountNumber: user.accountNumber,
            role: 'user'
        }
        const token = jwt.sign(payload, process.env.SECRET);

        return res.json({
            msg: 'login successed',
            token
        })

    })
}

