const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: [true, 'Password is required'] }, // Add this field
  position: { type: String, required: [true, 'Position is required'] },
  department: { type: String },
  salary: { type: Number, min: [0, 'Salary must be positive'] }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
