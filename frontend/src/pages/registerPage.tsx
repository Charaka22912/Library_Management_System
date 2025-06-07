
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate(); 
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
  const [errors, setErrors] = useState({
    nic: '',
    dob: ''
  });

  const validate = () => {
    const newErrors: any = {};

    // Validate NIC (Old: 9 digits + V/X, New: 12 digits)
    if (!/^(\d{9}[vxVX]|\d{12})$/.test(formData.nic)) {
      newErrors.nic = 'Invalid NIC format';
    }

    // Validate DOB (not empty, at least 10 years old)
    const today = new Date();
    const dob = new Date(formData.dob);
    const age = today.getFullYear() - dob.getFullYear();
    if (!formData.dob || age < 10) {
      newErrors.dob = 'You must be at least 10 years old';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        navigate('/'); // Redirect to login page after successful registration
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
            <input type="text" id="fullName" placeholder="Enter Full Name" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" placeholder="Enter Address" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" id="dob" onChange={handleChange} />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          <div className="form-row">
            <label htmlFor="nic">NIC:</label>
            <input type="text" id="nic" placeholder="Enter NIC number" onChange={handleChange} />
            {errors.nic && <span className="error">{errors.nic}</span>}
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
