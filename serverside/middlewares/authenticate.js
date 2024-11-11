import jwt from 'jsonwebtoken';
// import handleError from '../utils/handleError.js';

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
        // handleError(error, req, res, next);
        next(error);
    }
};

export default authMiddleware;