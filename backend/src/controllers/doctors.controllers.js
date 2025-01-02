const mongoose = require("mongoose");
const patient=require('../models/patients.models.js');
const doctor=require('../models/doctors.models.js');
const appointment=require('../models/appointments.models.js');

const GetAllDoctor=async(req,res)=>{
    try{
        const doctorData=await doctor.find();
        res.status(200).json(doctorData);
    }catch(error){
        console.error("Error:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
}

module.exports={GetAllDoctor};