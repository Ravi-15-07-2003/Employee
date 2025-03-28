// server/controllers/adminController.js
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');

exports.addEmployee = async (req, res, next) => {
  try {
    const { name, email, password, position, department, salary } = req.body;
    
    // Pehle check karo agar employee pehle se exist karta hai
    const existingEmployee = await Employee.findOne({ email });
    if(existingEmployee) {
      return res.status(400).json({ error: 'Employee already exists' });
    }
    
    // Agar password encryption baad mein add karne ka plan hai, to abhi plain text ya hashing dono option hai.
    // Abhi ke liye hum hashing ko optional rakh sakte hain. (Yahan hum hashing add kar rahe hain, lekin aap comment kar sakte hain agar plain text chahte hain)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newEmployee = new Employee({
      name,
      email,
      // Agar aap encryption nahi karna chahte, to "password" field mein directly password store kar sakte hain:
      // password: password,
      // Par production ke liye hashing recommended hai.
      password: hashedPassword,
      position,
      department,
      salary
    });
    
    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
  } catch (err) {
    next(err);
  }
};
