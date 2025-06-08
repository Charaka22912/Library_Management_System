import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState('');

  const checkUsernameAvailability = async (username: string) => {
    try {
      const response = await fetch(`http://localhost:5275/api/users/check-username?username=${username}`);
      const data = await response.json();
      if (data.exists) {
        setUsernameError('Username is already taken');
      } else {
        setUsernameError('');
      }
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    dob: '',
    nic: '',
    username: '',
    password: '',
    userType: 'Member',
    employeeId: ''
  });

  const [errors, setErrors] = useState({
    nic: '',
    dob: '',
    employeeId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error message for the field being edited
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));

    if (name === 'username') {
        checkUsernameAvailability(value);
      }
  };

  const validate = () => {
    const newErrors: any = {};

    // NIC validation
    if (!/^(\d{9}[vxVX]|\d{12})$/.test(formData.nic)) {
      newErrors.nic = 'Invalid NIC format';
    }

    // DOB validation
    const today = new Date();
    const dob = new Date(formData.dob);
    const age = today.getFullYear() - dob.getFullYear();
    if (!formData.dob || age < 10) {
      newErrors.dob = 'You must be at least 10 years old';
    }

    // Employee ID validation
    if (formData.userType === 'Employee' && !formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (usernameError) {
        alert("Please choose a different username");
        return;
      }
      
    if (!validate()) return;

    try {
      const response = await fetch('http://localhost:5275/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('User registered successfully!');
        navigate('/'); // Redirect to login
      } else {
        alert('Failed to register user');
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
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="nic">NIC:</label>
            <input
              type="text"
              id="nic"
              name="nic"
              placeholder="Enter NIC number"
              value={formData.nic}
              onChange={handleChange}
              required
            />
            {errors.nic && <span className="error">{errors.nic}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {usernameError && <span className="error">{usernameError}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="userType">User Type:</label>
            <select
              id="userType"
              name="userType"
              value={formData.userType}
              onChange={handleChange}
            >
              <option value="Member">Member</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          {formData.userType === 'Employee' && (
            <div className="form-row">
              <label htmlFor="employeeId">Employee ID:</label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                placeholder="Enter Employee ID"
                value={formData.employeeId}
                onChange={handleChange}
              />
              {errors.employeeId && <span className="error">{errors.employeeId}</span>}
            </div>
          )}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
