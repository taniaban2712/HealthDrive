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

module.exports=mongoose.model("Doctor", doctorSchema);