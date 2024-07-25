import React, { useEffect } from 'react';
import DashFeatureProducts from './DashFeatureProducts'
import DashCalendar from './DashCalendar'
import DashInbox from './DashInbox'
import DashOrders from './DashOrders'
import DashProducts from './DashProducts'
import DashSales from './DashSales'
import DashShipping from './DashShipping'
import DashUsers from './DashUsers'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from '../utils/LogoutButton';


const AdminDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkRole = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/auth/user', { withCredentials: true });
                if (response.data.role !== 'admin') {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error checking role:', error);
                navigate('/login');
            }
        };

        checkRole();
    }, [navigate]);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <DashFeatureProducts />
            <DashCalendar />
            <DashInbox />
            <DashOrders/>
            <DashProducts/>
            <DashSales/>
            <DashShipping />
            <DashUsers />
            <LogoutButton />
        </div>
    );
};

export default AdminDashboard;
