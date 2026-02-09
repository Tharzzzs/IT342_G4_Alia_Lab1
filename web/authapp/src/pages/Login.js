import React, { useState } from 'react';
import { loginUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser(form);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', form.email);
            navigate('/dashboard');
        } catch (err) {
            alert("Invalid Credentials");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Login</h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input type="email" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} required />
                <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required />
                <button type="submit">Login</button>
            </form>
            <p>New user? <a href="/register">Register here</a></p>
        </div>
    );
};

export default Login;