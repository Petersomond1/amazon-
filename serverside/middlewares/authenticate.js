import jwt from 'jsonwebtoken';
import { CustomError } from '../utils/customErrorHandler.js';
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        throw new CustomError("user not authenticated",401)
    }
};

export default authMiddleware;
