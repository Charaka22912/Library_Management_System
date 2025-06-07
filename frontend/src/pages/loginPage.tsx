import React, { useState } from 'react';
import '../css/pages.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  console.log("Login component loaded"); // Debug log

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending login request with credentials:', credentials); // Debug log

    try {
      const response = await fetch('http://localhost:5275/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Login successful!');
        console.log(result);
        navigate('/home');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-left">
          <h1>Welcome to <br /><strong>Library Management System</strong></h1>
        </div>
        <div className="login-right">
          <h2>LOGIN</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Enter User ID"
              value={credentials.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
            <div className="links">
              <span>Forgot Password?</span><br />
            </div>
            <p>Don't Have Account? <Link to='/register'>Register</Link></p>
            <br />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
