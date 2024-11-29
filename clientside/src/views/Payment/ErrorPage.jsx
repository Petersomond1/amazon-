import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-500 to-red-700 text-white">
            <div className="text-center space-y-8 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto text-gray-800">
                <div className="text-5xl font-bold">
                    ❌
                </div>
                <h1 className="text-3xl font-extrabold">Payment Failed!</h1>
                <p className="text-lg">
                    Oops! Something went wrong while processing your payment.
                </p>
                <button
                    onClick={() => navigate('/cart')}
                    className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 transform transition duration-300 ease-in-out hover:scale-105"
                >
                    Go Back to Cart
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
