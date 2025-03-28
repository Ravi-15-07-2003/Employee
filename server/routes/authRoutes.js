const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/admin/login', authController.adminLogin);
router.post('/employee/signup', authController.employeeSignup);
router.post('/employee/login', authController.employeeLogin);

// Routes for forgot/reset password can be added here

module.exports = router;
