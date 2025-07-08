const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    status: {
        type: String,
        enum: ['applied', 'interviewing', 'rejected'],
        default: 'applied',
    }, date: { type: Date, default: Date.now },
    notes: { type: String }
});

module.exports =  mongoose.model('Job', jobSchema);
