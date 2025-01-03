const express=require('express');
const router=express.Router();

const getAllDoctor=require('../controllers/doctors.controllers.js').GetAllDoctor;
const getDoctorById=require('../controllers/doctors.controllers.js').GetDoctorById;

router.route('/').get(getAllDoctor);
router.route('/:id').get(getDoctorById);

module.exports=router;