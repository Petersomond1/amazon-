import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login-register.css';
import { register } from './apiService';

const Register = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        street: '',
        apartment: '',
        city: '',
        country: '',
        zip: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register({ ...userData, 
                // role: 'client', 
                // isAdmin: false 
                // OR uncomment the above lines and comment the below lines to set the role and isAdmin values
                role: 'admin', 
                isAdmin: true 
            });
            navigate('/login');
            console.log('User registered successfully');
        } catch (error) {
            console.error('Error registering:', error);
            setError('Error registering user');
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div className="register-container">
            <h2>Create Account</h2>
            <form onSubmit={handleRegister}>
                <label>First Name</label>
                <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} required />
                
                <label>Last Name</label>
                <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} required />
                
                <label>Email</label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} required />
                
                <label>Password</label>
                <input type="password" name="password" value={userData.password} onChange={handleChange} required />
                
                <label>Phone</label>
                <input type="text" name="phone" value={userData.phone} onChange={handleChange} required />
                
                <label>Street</label>
                <input type="text" name="street" value={userData.street} onChange={handleChange} required />
                
                <label>Apartment</label>
                <input type="text" name="apartment" value={userData.apartment} onChange={handleChange} required />
                
                <label>City</label>
                <input type="text" name="city" value={userData.city} onChange={handleChange} required />
                
                <label>Country</label>
                <input type="text" name="country" value={userData.country} onChange={handleChange} required />
                
                <label>Zip</label>
                <input type="text" name="zip" value={userData.zip} onChange={handleChange} required />
                
                {error && <p className="error-message">{error}</p>}
                
                <button type="submit">Create your account</button>
            </form>
            <p>
                By creating an account, you agree to the site's Conditions of Use and Privacy Notice.
            </p>
        </div>
    );
};

export default Register;
