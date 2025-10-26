
import React, { useState, useCallback } from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const handleLogout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    return (
        <>
            {isLoggedIn ? (
                <DashboardPage onLogout={handleLogout} />
            ) : (
                <LoginPage onLogin={handleLogin} />
            )}
        </>
    );
};

export default App;
