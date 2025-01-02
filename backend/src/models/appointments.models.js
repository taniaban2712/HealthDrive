const mongoose = require("mongoose");

const appointmentSchema= new mongoose.Schema({
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    patientName:{
        type: String,
        required: true,
    },
    patientContact:{
        type: Number,
        required: true,
    },
    patientEmail:{
        type: String,
        required:true,
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    time:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum:["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    prescription:{
        type: String,
    }
},{timestamps: true})

module.exports=mongoose.model("Appointment", appointmentSchema);