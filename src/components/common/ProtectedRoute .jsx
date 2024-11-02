import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isUserLoggedIn = users.some(user => user.loggedIn);

    return isUserLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
