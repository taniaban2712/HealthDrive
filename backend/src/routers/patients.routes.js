const express = require('express');
const router = express.Router();  // Use `express.Router()` to create a router

const isAuthenticated = require('../middlewares/auth.middleware.js');

const registerPatient = require('../controllers/patients.controllers.js').RegisterPatient;
const loginPatient = require('../controllers/patients.controllers.js').LoginPatient;
const getPatient=require('../controllers/patients.controllers.js').GetPatient;
const updatePatient=require('../controllers/patients.controllers.js').UpdatePatient;
const sendMail=require('../controllers/confirmation.controllers.js').SendMail;

// Register route
router.route('/').post(registerPatient);
router.route('/login').post(loginPatient);
router.route('/sendmail').post(sendMail);
router.route('/:id').get(isAuthenticated, getPatient);
router.route('/:id').patch(updatePatient);

module.exports = router;  // Correct export syntax
