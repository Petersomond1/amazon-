import jwt from 'jsonwebtoken';

// Utility function to create a token
export const createToken = (user) => {
    return jwt.sign({ id: user.id, name:user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};