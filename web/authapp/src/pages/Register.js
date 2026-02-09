import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            alert("Registration Successful!");
            navigate('/login');
        } catch (err) {
            alert("Registration failed: " + err.response?.data?.message || "Error");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="text" placeholder="Full Name" onChange={e => setForm({...form, name: e.target.value})} required />
                <input type="email" placeholder="Email Address" onChange={e => setForm({...form, email: e.target.value})} required />
                <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required />
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default Register;