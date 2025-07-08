import React, { useEffect, useState } from 'react';
import { deleteJob, fetchJobs } from '../utils/api';
import JobForm from '../components/JobForm';
import JobCard from '../components/JobCard';
import EditModal from '../components/EditModal';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const loadJobs = async () => {
    const res = await fetchJobs({ search, status });
    setJobs(res.data);
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    loadJobs();
  };

  useEffect(() => {
    loadJobs();
  }, [search, status]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-4xl font-extrabold text-center text-green-700">🎯 Job Tracker</h1>

      <JobForm onJobCreated={loadJobs} />

      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search company..."
          className="flex-1 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-300"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full md:w-52 p-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-300"
        >
          <option value="">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-6">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} onEdit={setEditingJob} />
          ))
        )}
      </div>

      <EditModal job={editingJob} onClose={() => setEditingJob(null)} onUpdated={loadJobs} />
    </div>
  );
};

export default Home;