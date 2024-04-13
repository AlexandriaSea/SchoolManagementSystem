/**
 * Student Name: Wenjie Zhou
 * Student Number: 301337168
 * Submission Date: Apr 12, 2024
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

// Defines a Login component for handling user login process 
const Login = () => {

    // Hook for navigating to other components
    const navigate = useNavigate();

    // Setting the base URL for all Axios requests and enabling credentials for CORS
    axios.defaults.baseURL = 'http://localhost:8085';
    axios.defaults.withCredentials = true;

    // Event handler for the login form submission
    const handleLogin = async (event) => {
        event.preventDefault();

        // Extracting email and password from the form elements
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;

        try {
            const loginData = { email, password };

            const response = await axios.post('/api/students/login', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // If login is successful, set a cookie and navigate to '/home'
            if (response && response.data) {
                Cookies.set('session_token', response.data._id, { expires: 1, path: '' });
                alert('Logged in successfully!');
                navigate('/home');
            } else {
                alert('Incorrect email or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    // Logout handler that removes the session token cookie
    const handleLogout = () => {
        Cookies.remove('session_token', { path: '' });
    };

    return (
        <main>
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
                        <span className="fs-4">Student Portal</span>
                    </a>
                    <ul className="nav nav-pills">
                        <li className="nav-item"><a href="/home" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/course" className="nav-link">Course</a></li>
                        <li className="nav-item"><a href="/" onClick={handleLogout} className="nav-link">Logout</a></li>
                    </ul>
                </header>
            </div>

            <div className="container" style={{ backgroundColor: 'LemonChiffon', padding: '150px' }}>
                <h2>Please sign in</h2>
                <form onSubmit={handleLogin}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px', margin: '0 auto' }}>
                        <input type="text" name="email" id="email" className="form-control form-control-sm" placeholder="Email" required />
                        <input type="password" name="password" id="password" className="form-control form-control-sm" placeholder="Password" required />
                        <button type="submit" className="btn btn-primary btn-sm">Sign in</button>
                        <button type="reset" className="btn btn-secondary btn-sm">Reset</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Login;
