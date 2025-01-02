const express=require('express');
const router=express.Router();

const getAllDoctor=require('../controllers/doctors.controllers.js').GetAllDoctor;

router.route('/').get(getAllDoctor);

module.exports=router;