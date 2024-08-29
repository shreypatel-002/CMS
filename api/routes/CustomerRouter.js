import express from 'express'
import {  AddCustomer, Customerlist, DeleteCustomer, updateCustomer } from '../controllers/CustomerController.js';
import { verifyToken } from '../Utils/VerifyToken.js';



const router = express.Router();


router.get('/CustomerList',Customerlist)
router.post('/AddCustomer',AddCustomer)
router.put('/UpdateCustomer/:id',updateCustomer)
router.delete('/deletecustomer/:id',DeleteCustomer)

export default router;