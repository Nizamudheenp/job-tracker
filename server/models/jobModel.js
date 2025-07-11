const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    status: {
        type: String,
        enum: ['applied', 'interviewing', 'rejected'],
        default: 'applied',
    }, 
    date: { type: Date, default: Date.now },
    notes: { type: String }
});

module.exports =  mongoose.model('Job', jobSchema);
