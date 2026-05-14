import React from 'react';
import './dashboard.css';
import Header from '../../components/navigation/Header';
import SideBar from '../../components/navigation/SideBar';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import Favorites from './Favorites';
import WatchLater from './WatchLater';

const Dashboard = ({ userUsername, setIsLoggedIn }) => {
    return (
        <div className='dashboardWrapper'>
            <Header userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
            <div className='dashboardBody'>
                <SideBar user={userUsername} />
                <main className='dashboardContent'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/favorites' element={<Favorites />} />
                        <Route path='/watchlater' element={<WatchLater />} />
                        <Route path='*' element={<Navigate to="/" replace />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;