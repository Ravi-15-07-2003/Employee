const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Admin credentials from .env
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

// Admin login
exports.adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  // Simple check - production mein hashing use karo!
  if(email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ role: 'admin', email }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token, role: 'admin' });
  } else {
    return res.status(401).json({ error: 'Invalid admin credentials' });
  }
};

// Employee signup (Registration)
exports.employeeSignup = async (req, res, next) => {
  try {
    // For simplicity, we store password as plain text. Use bcrypt in production!
    const { name, email, password, position, department, salary } = req.body;
    
    // Optionally check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if(existingEmployee){
      return res.status(400).json({ error: 'Employee already exists' });
    }
    
    const newEmployee = new Employee({ name, email, password, position, department, salary });
    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
  } catch (err) {
    next(err);
  }
};

// Employee login
exports.employeeLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if(!employee) return res.status(401).json({ error: 'Invalid credentials' });
    
    // Compare passwords - use bcrypt in real apps!
    if(employee.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ role: 'employee', id: employee._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, role: 'employee', employee });
  } catch (err) {
    next(err);
  }
};

// Forgot password & reset password endpoints can be added similarly.
