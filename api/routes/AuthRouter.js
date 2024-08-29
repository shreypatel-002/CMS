import express from 'express';
import {  AdminSignup, Google,  signin, signout, signup ,} from '../controllers/AuthController.js';




const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin); 
router.post('/Google',Google);
router.get('/signout',signout);
router.post('/Adminlogin',signin);
router.post('/AdminSignup',AdminSignup)
export default router;