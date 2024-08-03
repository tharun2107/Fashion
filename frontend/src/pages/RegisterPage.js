// RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';
import '../style/Register.css'; // Import the CSS file for styling

function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUserContext();

    const register = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/users/register', { name, email, password });
            setUser(data);
            window.location.href = '/';
        } catch (error) {
            console.error('Registration failed');
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={register}>
                <h2>Register</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
