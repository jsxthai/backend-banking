import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const authAccount = async (req, res) => {
    const { username, password } = req.body;
    // check from client
    if (!username || !password) return res.status(401).json({
        msg: 'Please enter user name and password !'
    })

    // check username in db
    await User.findOne({ username }, async (err, user) => {
        if (err || !user) return res.status(401).json({ msg: 'not found username', err });
        // checking password is correct
        const validPass = await bcrypt.compare(password, user.password);
        // console.log(password, '-----', user.password)
        // if not correct: false
        if (!validPass) return res.status(401).send('Invalid password');

        // create payload
        const payload = {
            accountNumber: user.accountNumber,
            role: 'user'
        }
        // sign jwt
        const token = jwt.sign(payload, process.env.PRIVATE_KEY);

        return res.json({
            msg: 'login successed',
            token
        })

    })
}

