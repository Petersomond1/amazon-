import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-green-600 text-white">
            <div className="text-center space-y-8 p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto text-gray-800">
                <div className="text-5xl font-bold">
                    🎉
                </div>
                <h1 className="text-3xl font-extrabold">Payment Successful!</h1>
                <p className="text-lg">
                    Thank you for your purchase. Your payment was processed successfully.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 transform transition duration-300 ease-in-out hover:scale-105"
                >
                    Return to Home
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
