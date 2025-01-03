const express = require('express');
const router = express.Router();  // Use `express.Router()` to create a router
const addAppointment = require('../controllers/appointments.controllers.js').AddAppointment;
const getAllAppointments = require('../controllers/appointments.controllers.js').GetAllAppointments;

// Add appointment route
router.route('/add').post(addAppointment);
router.route('/patient/:id').get(getAllAppointments);

module.exports = router;  // Correct export syntax