
import React, { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    dob: '',
    nic: '',
    username: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:5275/api/users/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });

      if (response.ok) {
        const result = await response.json();
        alert('User registered successfully!');
        console.log(result);
      } else {
        alert('Failed to register user');
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" placeholder="Enter Full Name" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" placeholder="Enter Address" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="nic">NIC:</label>
            <input type="text" id="nic" placeholder="Enter NIC number" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" placeholder="Enter Username" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" placeholder="Enter Password" onChange={handleChange} />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
