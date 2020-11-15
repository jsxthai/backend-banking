import User from '../models/user.js';

export const fetchUsers = (req, res) => {
    try {
        User.find({}, (err, users) => {
            if (err) return res.status(400).json(err)
            return res.json(users);
        })
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (req, res) => {
    const userData = req.body;
    try {
        const user = await new User(userData);
        await user.save((err) => {
            if (err) return res.status(400).json(err)
            return res.json({
                msg: 'created new user',
                user
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (req, res) => {
    if (!req.params.userId) return res.json({ msg: 'no userId' });
    const filter = {
        _id: req.params.userId
    }
    const update = {
        ...req.body
    }
    try {
        await User.find(filter, (err) => {
            if (err) return res.status(400).json({ msg: '_id not found', err })
            User.updateOne(filter, update, (err) => {
                if (err) return res.status(400).json(err)
                return res.json({
                    msg: 'updated user',
                })
            })
        })

    } catch (error) {
        console.log(error)
    }
}

export const deleteUser = async (req, res) => {
    if (!req.params.userId) {
        return res.status(400).json({
            msg: 'no userId'
        })
    }
    try {
        await User.find({ _id: req.params.userId }, (err) => {
            if (err) return res.status(400).json({ msg: '_id not found', err })
            User.deleteOne({ _id: req.params.userId }, (err) => {
                if (err) return res.status(400).json(err)
                return res.json({
                    msg: 'deleted user',
                })
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export const fetchUsersWithId = async (req, res) => {
    if (!req.params.userId) return res.status(400).json({
        msg: 'not found userId'
    })
    try {
        await User.findById({ _id: req.params.userId }, (err, users) => {
            if (err) return res.status(400).json({ msg: '_id not found', err })
            return res.json(users);
        })
    } catch (err) {
        console.log(err)
    }
}