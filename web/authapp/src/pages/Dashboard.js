import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const email = localStorage.getItem('userEmail');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    if (!email) return <p>Access Denied. Please login.</p>;

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Dashboard</h1>
            <div style={{ border: '1px solid #ccc', display: 'inline-block', padding: '20px', borderRadius: '8px' }}>
                <h3>Simple Profile</h3>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Account Status:</strong> Active</p>
                <button onClick={handleLogout} style={{ marginTop: '20px', backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;