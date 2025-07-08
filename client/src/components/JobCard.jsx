import React from 'react';

const JobCard = ({ job, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold text-gray-800">{job.company}</h3>
        <p className="text-gray-600">{job.role}</p>
        <p className="text-sm italic text-gray-500">Status: {job.status}</p>
        {job.notes && <p className="text-sm text-gray-700 mt-1">📝 {job.notes}</p>}
        <p className="text-xs text-gray-400">{new Date(job.date).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-3 self-end md:self-auto">
        <button
          onClick={() => onEdit(job)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(job._id)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
