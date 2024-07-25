import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login-register.css';
import { login } from './apiService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            if (response.status === 200) {
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Sign-In</h2>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                
                {error && <p className="error-message">{error}</p>}
                
                <button type="submit">Sign-In</button>
            </form>
            <p>
                By continuing, you agree to the site's Conditions of Use and Privacy Notice.
            </p>
        </div>
    );
};

export default Login;

