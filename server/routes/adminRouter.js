const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// Yeh route sirf admin ke liye protected hai.
router.post('/addEmployee', protect('admin'), adminController.addEmployee);

module.exports = router;
