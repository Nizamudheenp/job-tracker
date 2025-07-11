import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      onLogin();
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-5 bg-white border border-gray-200 rounded-xl shadow-md max-w-md mx-auto mt-20"
    >
      <h2 className="text-2xl font-bold text-center text-green-700">Login to Job Tracker</h2>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email Address"
        required
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300"
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition duration-200"
      >
        🔐 Login
      </button>
    </form>
  );
};

export default Login;
