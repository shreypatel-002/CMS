import { errorHandler } from "../Utils/ErrorHandler.js";
import Admin from "../model/AdminModel.js";
import User from "../model/Usermodel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedpassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedpassword });
    try {
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
    }
};
 export const AdminSignup = async(req,res,next) =>{
    const {  email, password } = req.body;
    const hashedpassword = bcrypt.hashSync(password, 10);
    const newUser = new Admin({  email, password: hashedpassword });
    try {
        await newUser.save();
        res.status(201).json("User created successfully");
    } catch (error) {
        next(error);
    }
 }

export const signin = async (req, res, next) => {
    const { email, password, userType } = req.body;
    try {
        
        let validUser;
        if (userType === 'Admin') {
            validUser = await Admin.findOne({ email });
        } else {
            validUser = await User.findOne({ email });
        }

        if (!validUser) return next(errorHandler(404, `${userType} not found`));
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

        const token = jwt.sign({ id: validUser._id, role: userType }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;

        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const Google = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;

            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedpassword = bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedpassword,
                avatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;

            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token', { httpOnly: true, expires: new Date(0) })
        res.status(200).json("User has been signed out successfully");
    } catch (error) {
        next(error);
    }
};
