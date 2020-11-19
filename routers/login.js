import express from 'express';
import { authAccount } from '../controllers/login.js';

const router = express.Router();

router.post('/', authAccount)


export default router;
