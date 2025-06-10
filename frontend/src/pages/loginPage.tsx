import React, { useState } from "react";

// Import necessary components and styles
import "../css/pages.css";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  }); // State to hold login credentials

  // Handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending login request with credentials:", credentials); // Debug log

    // Send login request to the backend API
    try {
      const response = await fetch("http://localhost:5275/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("username", result.username); // Store username in localStorage
        localStorage.setItem("userType", result.userType); //  Store user type in localStorage
        localStorage.setItem("userId", result.userId); // Store user ID in localStorage
        navigate("/home");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-left">
          <h1>
            Welcome to <br />
            <strong>Library Management System</strong>
          </h1>
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
              <br />
            </div>
            <p>
              Don't Have Account? <Link to="/register">Register</Link>
            </p>
            <br />
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
