import express from 'express';
import {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    fetchUsersWithId,
    payIn
} from '../controllers/users.js'

const router = express.Router();

router.get('/', fetchUsers);
router.get('/:userId', fetchUsersWithId);
router.post('/', createUser);
// router.put('/:userId', updateUser);
router.put('/:accountNumber', payIn);
router.delete('/:userId', deleteUser);

export default router;
