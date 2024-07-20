import express from 'express';
import { login, SignUp } from '../controller/auth.js';
import { deleteUser, getAllUsers, getUserByID, updateUser } from '../controller/user.js';
import { isLoggedIn } from '../middlewares/auth.js';

const router = express.Router()

router.post('/signup', SignUp)
router.post('/login', login)
router.get('/users', getAllUsers)
router.get('/user/:userId', getUserByID)
router.put('/user/update', isLoggedIn, updateUser)
router.delete('/user/:userId', deleteUser)

export default router