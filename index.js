import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './routers/users.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 7777;

// connect mongodb
const mongoDBUrl = process.env.MONGODB_URL || 'mongodb://localhost/backend-banking';
try {
    mongoose.connect(mongoDBUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => console.log("mongodb connected"));
} catch (error) {
    console.log("mongodb could not connect");
}

// app use
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
// use router
app.use('/api/users', users)

app.get('/', (req, res) => {
    res.json('hello, i am api banking');
})

app.listen(port, () => console.log(`Server started on port ${port}`));