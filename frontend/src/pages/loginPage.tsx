import React from 'react'
import '../css/pages.css';
import { Link } from 'react-router-dom';


export default function Login() {

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
          <form className="login-form">
            <input type="text" placeholder="Enter User ID" required />
            <input type="password" placeholder="Enter Password" required />
            <div className="links">
              <span>Forgot Password?</span><br/>
            </div>
            <p>Don't Have Account? <Link to='/register'>Register</Link></p>
            <br/>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
    
  )
}