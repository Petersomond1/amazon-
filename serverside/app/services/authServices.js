import query from '../config/db.js';
import CustomError from '../utils/handleError.js';
import { createToken } from '../../utils/userUtilities.js';

export async function registerService(data){
    try {
        const { email, password, name } = data;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const registerQuery = 'INSERT INTO users ( email, passwordHash, name) VALUES ( ?, ?, ?)';
        const values = [ email, hashedPassword, name];
    
        const [result] = await query(registerQuery, values);
    
        const user = {
            id: result.insertId,
            name:name,
            email :email,
            role : 'client'
        };
        const token = createToken(user);

        return token;
    } catch (error) {
        throw new CustomError("User not registered", 400)
    }

}

export async function loginService(data){
    try {
        const { email, password } = data;
        const [rows] = await query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
    
        if (!user) {
            throw new CustomError("Invalid email or password", 400)
        }
    
        const isMatch = await bcrypt.compare(password, user.passwordHash);
    
        if (!isMatch) {
            throw new CustomError("Invalid email or password", 400)
        }
    
        const token = createToken(user);
    
        return token;
    } catch (error) {
        throw new CustomError("Invalid email or password", 400)
    }
}

export async function forgotPasswordService(data){
    try {
        const { email } = data;
    
        const [rows] = await query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
    
        if (!user) {
            throw new CustomError("User not found", 404)
        }
    
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000;
    
        const updateQuery = 'UPDATE users SET resetToken = ?, resetTokenExpiry = ? WHERE email = ?';
        await query(updateQuery, [resetToken, resetTokenExpiry, email]);
    
        return resetToken;
    } catch (error) {
        throw new CustomError("User not found", 404)
    }
}

export async function resetPasswordService(data){
    try {
        const { resetToken, newPassword } = data;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const sqlQuery = 'SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiry > ?';
        const [rows] = await query(sqlQuery, [resetToken, Date.now()]);
        const user = rows[0];

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const updateQuery = 'UPDATE users SET password = ?, resetToken = NULL, resetTokenExpiry = NULL WHERE id = ?';
        await query(updateQuery, [hashedPassword, user.id]);
    } catch (error) {
        throw new CustomError("Invalid or expired reset token", 400)
    }
}