import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const email = localStorage.getItem('userEmail');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        nav: {
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '16px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        logo: {
            fontSize: '20px',
            fontWeight: '700',
            color: '#4f46e5',
            textDecoration: 'none',
        },
        navRight: {
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
        },
        navLink: {
            textDecoration: 'none',
            color: '#64748b',
            fontSize: '14px',
            fontWeight: '500',
        },
        main: {
            padding: '40px',
            maxWidth: '800px',
            margin: '0 auto',
        },
        header: {
            fontSize: '28px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '24px',
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '32px',
        },
        welcomeSection: {
            marginBottom: '24px',
        },
        emailText: {
            fontSize: '18px',
            color: '#1e293b',
            fontWeight: '600',
        },
        actionGroup: {
            display: 'flex',
            gap: '12px',
            marginTop: '32px',
            borderTop: '1px solid #f1f5f9',
            paddingTop: '24px',
        },
        profileBtn: {
            backgroundColor: '#4f46e5',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            flex: 1,
            textAlign: 'center',
            textDecoration: 'none',
        },
        logoutBtn: {
            backgroundColor: '#ffffff',
            color: '#ef4444',
            border: '1px solid #ef4444',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            flex: 1,
        },
        statusBadge: {
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '99px',
            backgroundColor: '#ecfdf5',
            color: '#10b981',
            fontSize: '12px',
            fontWeight: '600',
            marginTop: '8px',
        }
    };

    if (!email) return <div style={{padding: '40px', textAlign: 'center'}}>Access Denied.</div>;

    return (
        <div style={styles.container}>
            <nav style={styles.nav}>
                <Link to="/dashboard" style={styles.logo}>MiniApp</Link>
                <div style={styles.navRight}>
                    <Link to="/profile" style={styles.navLink}>Profile</Link>
                    <button 
                        onClick={handleLogout} 
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main style={styles.main}>
                <h1 style={styles.header}>Dashboard Overview</h1>
                <div style={styles.card}>
                    <div style={styles.welcomeSection}>
                        <p style={{color: '#64748b', fontSize: '14px', marginBottom: '4px'}}>Logged in as</p>
                        <span style={styles.emailText}>{email}</span>
                        <div>
                            <span style={styles.statusBadge}>Verified Account</span>
                        </div>
                    </div>

                    <div style={styles.actionGroup}>
                        <Link to="/profile" style={styles.profileBtn}>
                            View Full Profile
                        </Link>
                        <button 
                            onClick={handleLogout} 
                            style={styles.logoutBtn}
                            onMouseOver={e => e.currentTarget.style.backgroundColor = '#fef2f2'}
                            onMouseOut={e => e.currentTarget.style.backgroundColor = '#ffffff'}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;