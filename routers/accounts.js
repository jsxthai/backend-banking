import express from 'express';
import { checkingAccount } from '../controllers/accounts.js';

const router = express.Router();

// api/accounts
router.get('/:accountNumber', checkingAccount);

export default router;