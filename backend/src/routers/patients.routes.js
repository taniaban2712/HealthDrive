const express = require('express');
const router = express.Router();  // Use `express.Router()` to create a router

const isAuthenticated = require('../middlewares/auth.middleware.js');

const registerPatient = require('../controllers/patients.controllers.js').RegisterPatient;
const loginPatient = require('../controllers/patients.controllers.js').LoginPatient;
const getPatient=require('../controllers/patients.controllers').GetPatient;
const updatePatient=require('../controllers/patients.controllers').UpdatePatient;

// Register route
router.route('/').post(registerPatient);
router.route('/login').post(loginPatient);
router.route('/:id').get(isAuthenticated, getPatient);
router.route('/:id').patch(updatePatient);

module.exports = router;  // Correct export syntax
