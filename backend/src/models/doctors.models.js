const mongoose = require("mongoose");

const doctorSchema= new mongoose.Schema({
    doctorName:{
        type: String,
        required: true,
    },
    specialization:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Specialization",
    },
    patients:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Patient",
    }],
    isActive:{
        type: Boolean,
        required: true,
    }
},{timestamps: true})

export const doctor=mongoose.model("Doctor", doctorSchema);