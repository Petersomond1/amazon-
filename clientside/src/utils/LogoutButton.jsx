import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
