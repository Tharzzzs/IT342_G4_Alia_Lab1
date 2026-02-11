import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
    const email = localStorage.getItem('userEmail');
    const fullName = localStorage.getItem('userName') || "User"; 
    // Assuming you store the createdAt date string from the backend in localStorage
    const memberSinceRaw = localStorage.getItem('userCreatedAt'); 
    const navigate = useNavigate();

    // Helper to format date (e.g., "February 2026")
    const formatMemberDate = (dateString) => {
        if (!dateString) return "Recent Member";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
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
        main: {
            padding: '60px 20px',
            maxWidth: '600px',
            margin: '0 auto',
        },
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '40px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            textAlign: 'center',
        },
        avatarCircle: {
            width: '80px',
            height: '80px',
            backgroundColor: '#eef2ff',
            color: '#4f46e5',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: '700',
            margin: '0 auto 20px',
            border: '2px solid #4f46e5',
        },
        nameHeading: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '4px',
        },
        emailSubtext: {
            fontSize: '16px',
            color: '#64748b',
            marginBottom: '32px',
        },
        infoGrid: {
            textAlign: 'left',
            borderTop: '1px solid #f1f5f9',
            paddingTop: '24px',
        },
        infoRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '16px',
        },
        label: {
            fontSize: '14px',
            color: '#64748b',
            fontWeight: '500',
        },
        value: {
            fontSize: '14px',
            color: '#1e293b',
            fontWeight: '600',
        },
        backLink: {
            display: 'inline-block',
            marginTop: '32px',
            color: '#4f46e5',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
        }
    };

    if (!email) return <div style={{padding: '40px', textAlign: 'center'}}>Please login to view profile.</div>;

    const initial = fullName.charAt(0).toUpperCase();

    return (
        <div style={styles.container}>
            <nav style={styles.nav}>
                <Link to="/dashboard" style={styles.logo}>MiniApp</Link>
                <button 
                    onClick={() => navigate('/dashboard')}
                    style={{
                        backgroundColor: 'transparent',
                        border: '1px solid #e2e8f0',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: '500'
                    }}
                >
                    Dashboard
                </button>
            </nav>

            <main style={styles.main}>
                <div style={styles.card}>
                    <div style={styles.avatarCircle}>
                        {initial}
                    </div>
                    <h2 style={styles.nameHeading}>{fullName}</h2>
                    <p style={styles.emailSubtext}>{email}</p>

                    <div style={styles.infoGrid}>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Full Name</span>
                            <span style={styles.value}>{fullName}</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Email Address</span>
                            <span style={styles.value}>{email}</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Member Since</span>
                            <span style={styles.value}>{formatMemberDate(memberSinceRaw)}</span>
                        </div>
                        <div style={styles.infoRow}>
                            <span style={styles.label}>Account Status</span>
                            <span style={{...styles.value, color: '#10b981'}}>Verified</span>
                        </div>
                    </div>

                    <Link to="/dashboard" style={styles.backLink}>
                        &larr; Back to Dashboard
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Profile;