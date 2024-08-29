import jwt from 'jsonwebtoken';
import { errorHandler } from './ErrorHandler.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(450, 'Unauthorized'));
  
    jwt.verify(token, process.env.Jwt_Secret, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));
        req.user = user;
        next();
    });
};
