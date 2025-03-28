// server/controllers/employeeController.js
const Employee = require('../models/Employee');

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.json(savedEmployee);
  } catch (err) {
    next(err);
  }
};


exports.updateEmployee = async (req, res, next) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json(updatedEmployee);
  } catch (err) {
    next(err);
  }
};


exports.deleteEmployee = async (req, res, next) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    next(err);
  }
};
