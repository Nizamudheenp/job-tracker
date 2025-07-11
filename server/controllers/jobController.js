const JobDB = require('../models/jobModel');

exports.getJobs = async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = { user: req.user._id };

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
    const newJob = new JobDB({ ...req.body, user: req.user._id });
    const saved = await newJob.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await JobDB.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const deleted = await JobDB.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleted) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
};
