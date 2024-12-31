const express = require('express');
const router = express.Router();  // Use `express.Router()` to create a router
const registerPatient = require('../controllers/patients.controllers.js');

// Register route
router.route('/').post(registerPatient);

module.exports = router;  // Correct export syntax
