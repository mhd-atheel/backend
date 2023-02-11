import {getAllUsers, authUser, registerUser, getUserProfile, deleteUser} from '../controllers/user.controller.js'
import express from 'express'

const router = express.Router();

router.get('/getAllUsers', getAllUsers);
router.get('/getUserProfile/:id', getUserProfile);
router.post('/authUser', authUser);
router.post('/registerUser', registerUser);
router.delete('/deleteUser/:id', deleteUser);

export default router;
