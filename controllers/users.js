import User from '../models/user.js';

export const fetchUsers = (req, res) => {
    try {
        User.find({}, { password: 0 }, (err, users) => {
            if (err) return res.status(400).json(err)
            return res.json(users);
        })
    } catch (error) {
        console.log(error)
    }
}


function rand(min = 1000000000, max = 9999999999) {
    let randomNum = Math.random() * (max - min) + min;
    return Math.round(randomNum);
}

export const createUser = async (req, res) => {
    let data = req.body;
    const userNew = {
        ...data,
        accountNumber: Date.now(),
        createAt: Date.now(),
    }
    //set date 
    // for (let i in data.transfer) {
    //     data.transfer[i].date = Date.now()
    // }
    // for (let i in data.receive) {
    //     data.receive[i].date = Date.now()
    // }

    try {
        const user = await new User(userNew);
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

export const payIn = async (req, res) => {
    if (!req.params.accountNumber) return res.status(400).json({
        msg: 'not found account number'
    })
    try {
        await User.findOne({ accountNumber: req.params.accountNumber }, (err, users) => {
            if (err) return res.status(400).json({ msg: 'err server- pay in', err })
            if (!users) return res.status(400).json({ msg: 'user not found', err })
            const balance = users.balance || 0;
            User.updateOne({ accountNumber: req.params.accountNumber },
                { balance: balance + req.body.balance }, (err, msg) => {
                    if (err) return res.status(400).send({ msg: 'upd', err })
                    return res.json({
                        status: 'update ok',
                        msg
                    })
                })
        })
    } catch (err) {
        console.log({ msg: 'err server- pay in', err })
    }
}