import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      onRegister(); 
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-xl shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full p-3 border border-gray-300 rounded-xl"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        type="email"
        className="w-full p-3 border border-gray-300 rounded-xl"
      />
      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        type="password"
        className="w-full p-3 border border-gray-300 rounded-xl"
      />

      <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl">
        Register
      </button>
    </form>
  );
};

export default Register;
