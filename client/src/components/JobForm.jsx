import React, { useState } from 'react';
import { createJob } from '../utils/api';

const JobForm = ({ onJobCreated }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'applied',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(formData);
      setFormData({ company: '', role: '', status: 'applied', notes: '' });
      onJobCreated();
    } catch (err) {
      console.error('Error adding job:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Add New Job</h2>

      <input
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company Name"
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300"
        required
      />
      <input
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Role Title"
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300"
        required
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300"
      >
        <option value="applied">Applied</option>
        <option value="interviewing">Interviewing</option>
        <option value="rejected">Rejected</option>
      </select>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        placeholder="Add notes..."
        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300"
        rows={4}
      />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition duration-200"
      >
        ➕ Add Job
      </button>
    </form>
  );
};

export default JobForm;
