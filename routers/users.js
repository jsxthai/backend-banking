import express from "express";
import {
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    fetchUsersWithId,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", fetchUsers);
router.get("/:userId", fetchUsersWithId);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
// router.put('/:accountNumber', payIn);

export default router;
