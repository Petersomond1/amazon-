import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatusMessage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/auth/user', { withCredentials: true });
                // console.log('Fetched user:', response.data);
                setUser(response.data);
            } catch (error) {
                console.error('Could not fetch user details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user) {
        return <p>Not logged in</p>;
    }

    return (
        <p>
            Logged in as {user.role} ({user.isAdmin ? 'Admin' : 'Client'})
        </p>
    );
};

export default StatusMessage;
