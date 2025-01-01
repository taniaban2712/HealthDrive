const express = require('express');
const router = express.Router();  // Use `express.Router()` to create a router
const registerPatient = require('../controllers/patients.controllers.js').RegisterPatient;
const loginPatient = require('../controllers/patients.controllers.js').LoginPatient;
const getPatient=require('../controllers/patients.controllers').GetPatient;

// Register route
router.route('/').post(registerPatient);
router.route('/login').post(loginPatient);
router.route('/:id').get(getPatient);

module.exports = router;  // Correct export syntax
