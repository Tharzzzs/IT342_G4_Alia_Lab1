import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await registerUser(form);
    //         alert("Account created successfully!");
    //         navigate('/login');
    //     } catch (err) {
    //         alert("Error: " + (err.response?.data?.message || "Registration failed"));
    //     }
    // };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await registerUser(form);
        const { data } = response;
        
        // Save to localStorage using the names from AuthResponse.java
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.fullName);
        
        navigate('/dashboard', { replace: true });
    } catch (err) {
        // OPEN YOUR BROWSER CONSOLE (F12) TO SEE THIS:
        console.error("FULL ERROR OBJECT:", err);
        console.log("SERVER ERROR MESSAGE:", err.response?.data);
        
        alert("Registration failed: " + (err.response?.data?.message || "Check console"));
    }
};

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f8fafc',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
        card: {
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '400px',
        },
        title: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '32px',
            textAlign: 'center',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        },
        label: {
            fontSize: '14px',
            fontWeight: '500',
            color: '#475569',
        },
        input: {
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            fontSize: '16px',
            outline: 'none',
        },
        button: {
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '10px',
        },
        footer: {
            marginTop: '24px',
            textAlign: 'center',
            fontSize: '14px',
            color: '#64748b',
        },
        link: {
            color: '#4f46e5',
            textDecoration: 'none',
            fontWeight: '600',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create account</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={e => setForm({ ...form, password: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    <button type="submit" style={styles.button}>Create Account</button>
                </form>
                <div style={styles.footer}>
                    Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;