const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
connectDB();
const jobRoutes = require('./routes/jobRoutes');

app.use(cors());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));


app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});