// import jwt from 'jsonwebtoken';
// import handleError from '../utils/handleError.js';

// const authenticate = (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) {
//         return res.status(401).json({ message: 'Access denied. No token provided.' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         handleError(error, req, res);
//     }
// };

// export default authenticate;


import jwt from 'jsonwebtoken';
import handleError from '../utils/handleError.js';

const authenticate = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded JWT:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        handleError(error, req, res);
    }
};

export default authenticate;