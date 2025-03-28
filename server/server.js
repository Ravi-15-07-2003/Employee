// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Environment variables load karo
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Existing routes
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/employees', employeeRoutes);

// Admin routes mount karo
const adminRouter = require('./routes/adminRouter');
app.use('/admin', adminRouter);

// **Auth routes mount karo**
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
