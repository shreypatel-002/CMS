import express from "express"
import {  deleteAdmin, deleteuser, test, updateAdmin, updateUser } from '../controllers/userController.js';
import { verifyToken } from "../Utils/VerifyToken.js";


const router = express.Router();

router.get('/test',test);
router.post('/update/:id',verifyToken,updateUser);
router.delete('/delete/:id',verifyToken,deleteuser);
router.post('/updateAdmin/:id',verifyToken,updateAdmin);
router.delete('/deleteAdmin/:id',verifyToken,deleteAdmin);

export default router;