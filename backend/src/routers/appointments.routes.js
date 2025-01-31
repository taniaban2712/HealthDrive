const express = require('express');
const router = express.Router();  // Use `express.Router()` to create a router
const addAppointment = require('../controllers/appointments.controllers.js').AddAppointment;
const getAllAppointments = require('../controllers/appointments.controllers.js').GetAllAppointment;
const editAppointment=require('../controllers/appointments.controllers.js').GetAllAppointment
const isAuthenticated = require('../middlewares/auth.middleware.js');
const sendAppointmentMail=require('../controllers/confirmation.controllers.js').SendAppointmentMail;

// Add appointment route
router.route('/add').post(isAuthenticated,addAppointment);
router.route('/patient/:id').get(isAuthenticated,getAllAppointments);
router.route('/sendmail').post(sendAppointmentMail);
router.route('/:id').patch(isAuthenticated, editAppointment);


module.exports = router;  // Correct export syntax