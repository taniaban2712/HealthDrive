const express = require('express');
const router = express.Router();  // Use `express.Router()` to create a router
const registerPatient = require('../controllers/patients.controllers.js');
const loginPatient = require('../controllers/patients.controllers.js');

// Register route
router.route('/').post(registerPatient);
router.route('/login').get(loginPatient);

module.exports = router;  // Correct export syntax
