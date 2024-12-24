import { useNavigate } from 'react-router-dom';
import api from './apiConfig';
import { useMutation } from 'react-query';

// Function to perform user login
export const loginUser = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

// Use React Query's useMutation for login to handle side effects and state management.
export const useLoginUser = () => {
    const navigate = useNavigate()
    
    return useMutation(loginUser, {
        onSuccess: (data) => {
            console.log('Login successful', data);
            navigate(data.redirect)
            // Optionally save the login data to local storage or context
        },
        onError: (error) => {
            console.error('Login failed', error);
            alert('Login failed: ' + error.message);
        }
    });
};

// Function to register a new user
export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

// Use React Query's useMutation for registration
export const useRegisterUser = () => {
    return useMutation(registerUser, {
        onSuccess: (data) => {
            console.log('Registration successful', data);
            // Navigate to login or profile page or trigger a login automatically
        },
        onError: (error) => {
            console.error('Registration failed', error);
            alert('Registration failed: ' + error.message);
        }
    });
};
