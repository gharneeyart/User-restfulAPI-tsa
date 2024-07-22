import express from 'express';
import { forgotPassword, login, SignUp } from '../controller/auth.js';
import { deleteUser, getAllUsers, getUserByID, updateUser } from '../controller/user.js';
import { isLoggedIn } from '../middlewares/auth.js';
import { upload } from '../helpers/multer.js';

const router = express.Router()

router.post('/signup', SignUp)
router.post('/login', login)
router.get('/users', getAllUsers)
router.get('/user/:userId', getUserByID)
router.put('/user/update', isLoggedIn, upload.single("image"), updateUser)
router.delete('/user/:userId', deleteUser)
router.post('/forgotpassword', forgotPassword)

export default router