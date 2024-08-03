import React, { useState } from 'react';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';
import '../style/Login.css'; // Import the CSS file for styling

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useUserContext();

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            const userData = response.data;
            setUser({
                username: userData.name,
                email: userData.email,
                token: userData.token
            });
            // Redirect or navigate to the home page after successful login
            window.location.href = '/';
        } catch (error) {
            console.error('Invalid login credentials');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={login}>
                <h2>Login</h2>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
