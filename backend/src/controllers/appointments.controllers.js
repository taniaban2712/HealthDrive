const patient=require('../models/patients.models.js');
const doctor=require('../models/doctors.models.js');
const appointment=require('../models/appointments.models.js');

const AddAppointment=async(req,res)=>{
    try{
        console.log(req.body)
        const appointmentData=await appointment.create({
            patientId: req.body.patientId,
            patientName: req.body.patientName,
            patientContact: req.body.patientContact,
            patientEmail: req.body.patientEmail,
            doctorId: req.body.doctorId,
            date: req.body.date,
            time: req.body.time,
            description: req.body.description,
        }).then(async(appointmentData)=>{
            await appointmentData.save();
            res.status(200).json({
                message: "Appointment added successfully",
            });
        });
        
    }catch(error){
        console.error("Error:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }}


const GetAllAppointments=async(req,res)=>{
    try{
        const appointmentData=await appointment.find({patientId: req.params.id});
        res.status(200).json(appointmentData);
    }catch(error){
        console.error("Error:", error);
        return res.status(500).json({
            message: "Server error",
        });
    }
}


module.exports={AddAppointment, GetAllAppointments};