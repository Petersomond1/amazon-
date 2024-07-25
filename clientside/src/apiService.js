import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
});

export const register = async (combinedUserData) => {
    console.log('combinedUserData2', combinedUserData);
    try {
        const response = await api.post('/auth/register', combinedUserData);
        console.log('API response:', response);
        return response;
    } catch (error) {
        console.error('API call error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const login = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        return response;
    } catch (error) {
        console.error('Error during login:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const logout = async () => {
    return await api.post('/auth/logout');
};

export const forgotPassword = async (email) => {
    return await api.post('/auth/forgot-password', { email });
};

export const resetPassword = async (resetToken, newPassword) => {
    return await api.post('/auth/reset-password', { resetToken, newPassword });
};

export const getUser = async () => {
    return await api.get('/auth/user');
};
