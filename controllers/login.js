import User from '../models/user.js';

export const queryUser = (req, res) => {
    try {
        User.find({}, (err, users) => {
            if (err) return res.status(400).json(err)
            return res.json(users);
        })
    } catch (error) {
        console.log(error)
    }
}

