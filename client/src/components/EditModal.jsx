import React, { useState, useEffect } from 'react';
import { updateJob } from '../utils/api';

const EditModal = ({ job, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({ status: '', notes: '' });

  useEffect(() => {
    if (job) setFormData({ status: job.status, notes: job.notes || '' });
  }, [job]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateJob(job._id, formData);
    onUpdated();
    onClose();
  };

  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-800">Edit Job – {job.company}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300"
          >
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Update notes..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-300"
            rows={4}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
