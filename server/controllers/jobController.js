const JobDB = require('../models/jobModel');

exports.getJobs = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = {};

    if (status) query.status = status;
    if (search) query.company = { $regex: search, $options: 'i' };

    const jobs = await JobDB.find(query).sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createJob = async (req, res) => {
  try {
    const newJob = new JobDB(req.body);
    const saved = await newJob.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const updated = await JobDB.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.status(404).json({ error: 'Job not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const deleted = await JobDB.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
};
