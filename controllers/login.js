import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const authAccount = async (req, res) => {
    // console.log(req.header('Test-Header')); // test get

    const loginData = req.body;
    console.log(loginData)
    const { username, password } = loginData;
    if (!username || !password) return res.status(400).json({
        msg: 'The login details are incorrect. Try again.'
    })

    // check username in db
    await User.findOne({ username }, (err, user) => {
        if (err || !user) return res.status(400).json({ msg: 'not found username', err });
        // login when no hash @@
        if (user.password === password) {
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
        }
        else {
            res.status(400).json({
                msg: 'password is incorrect',
            });
        }
    })
}

