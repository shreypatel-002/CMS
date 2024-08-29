import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRouter from './routes/userRouter.js';
import AuthRouter from "./routes/AuthRouter.js";
import LeadRouter from "./routes/LeadRouter.js";
import CustomerRouter from './routes/CustomerRouter.js'; // Correct path
import EngineerRouter from './routes/EngineerRouter.js'
import { verifyToken } from "./Utils/VerifyToken.js";
dotenv.config();

mongoose.connect(process.env.MONGOURI)
  .then(() => console.log('connected to database successfully '))
  .catch(error => console.error('Error connecting to MongoDB:', error));


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(3500, () => {

    console.log("Server is listening on port 3500");
});

app.get('/protected', verifyToken, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected route.', user: req.user });});
app.use('/api/user', userRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/Lead', LeadRouter);
app.use('/api/Customer', CustomerRouter);
app.use('/api/Engineer', EngineerRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
    

