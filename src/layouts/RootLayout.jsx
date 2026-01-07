import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const RootLayout = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <Outlet />
        </div>
    );
};

export default RootLayout;
