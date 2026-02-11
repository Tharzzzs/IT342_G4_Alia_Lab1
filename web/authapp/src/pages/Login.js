import React, { useState } from 'react';
import { loginUser } from '../api/authApi';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const { data } = await loginUser(form);
    //         localStorage.setItem('token', data.token);
    //         localStorage.setItem('userEmail', form.email);
    //         navigate('/dashboard');
    //     } catch (err) {
    //         alert("Invalid Credentials");
    //     }
    // };

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const { data } = await loginUser(form);
        
        // Save the specific fields returned from your Spring Boot UserDTO
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        localStorage.setItem('userName', data.user.fullName); // Matches user.fullName in Java
        localStorage.setItem('userCreatedAt', data.user.createdAt); // Matches user.createdAt in Java
        
        navigate('/dashboard');
    } catch (err) {
        alert("Invalid Credentials");
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
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            width: '100%',
            maxWidth: '400px',
        },
        title: {
            fontSize: '24px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '8px',
            textAlign: 'center',
        },
        subtitle: {
            fontSize: '14px',
            color: '#64748b',
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
            transition: 'border-color 0.2s',
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
            transition: 'background-color 0.2s',
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
                <h2 style={styles.title}>Welcome back</h2>
                <p style={styles.subtitle}>Please enter your details to sign in.</p>
                <form onSubmit={handleLogin} style={styles.form}>
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
                    <button type="submit" style={styles.button}>Sign In</button>
                </form>
                <div style={styles.footer}>
                    Don't have an account? <Link to="/register" style={styles.link}>Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;