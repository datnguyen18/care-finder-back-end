const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DepartmentController = require('../controllers/department')

router.get('/', DepartmentController.get_all_departments)
router.post('/', DepartmentController.add_department)
module.exports = router;