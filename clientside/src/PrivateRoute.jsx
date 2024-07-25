import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/auth/user', { withCredentials: true });
                setIsAuthenticated(true);
                setRole(response.data.role);
            } catch (error) {
                console.error('Authentication error:', error);
                setIsAuthenticated(false);
                setRole(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (role === 'admin') {
        return <Navigate to="/admindashboard" />;
    }

    return children;
};

export default PrivateRoute;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PrivateRoute = ({ children }) => {
//     const navigate = useNavigate();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [role, setRole] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/auth/user', { withCredentials: true });
//                 setIsAuthenticated(true);
//                 setRole(response.data.role);
//             } catch (error) {
//                 setIsAuthenticated(false);
//                 setRole(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkAuth();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (!isAuthenticated) {
//         navigate('/login');
//         return null;
//     }

//     if (role === 'admin') {
//         navigate('/admindashboard');
//         return null;
//     }

//     navigate('/');
//     return null;
// };

// export default PrivateRoute;





// import { useNavigate } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const PrivateRoute = ({ children }) => {
//     const navigate = useNavigate();
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [isAdmin, setIsAdmin] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [statusMessage, setStatusMessage] = useState('');
//     const [role, setRole] = useState(null);

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/api/auth/user', { withCredentials: true });
//                 setIsAuthenticated(true);
//                 setIsAdmin(response.data.isAdmin);
//                 setStatusMessage(`Logged in as ${response.data.isAdmin ? 'Admin' : 'Client'}`);
//                 setRole(response.data.role);  // Assuming the response contains a role field
//             } catch (error) {
//                 console.error('Not authenticated:', error);
//                 setIsAuthenticated(false);
//                 setIsAdmin(false);
//                 setRole(null);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkAuth();
//     }, []);

//     useEffect(() => {
//         if (isAuthenticated && role === 'admin') {
//             navigate('/admindashboard');
//         } else if (isAuthenticated && role === 'client') {
//             navigate('/');
//         } else {
//             navigate('/login');
//         }
//     }, [isAuthenticated, role, navigate]);

//     if (!isAuthenticated || role !== 'admin') {
//         return null;
//     }

//     return children;
// };

// export default PrivateRoute;

