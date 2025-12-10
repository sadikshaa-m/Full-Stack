
import express from 'express';
import { notAllowed } from '../utils/notAllowed.js';
import { getUser, loginUser, registerUser, updateProfile, updateUser } from '../controllers/userController.js';
import { checkUser } from '../middlewares/checkUser.js';

const router = express.Router();

router.route('/login')
.post(loginUser)
.all(notAllowed);

router.route('/register')
.post(registerUser)
.all(notAllowed);

router.route('/')
.get(checkUser ,getUser)
.patch(checkUser, updateProfile)
.all(notAllowed);

router.route('/:id')
.patch(updateUser)
.all(notAllowed);





export default router;