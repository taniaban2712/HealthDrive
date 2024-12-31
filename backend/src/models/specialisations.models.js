const mongoose = require("mongoose");

const specializationSchema= new mongoose.Schema({
    specializationName:{
        type: String,
        required: true,
    },
    numberOfDoctors:{
        type: Number,
        required: true,
    },
    isActive:{
        type: Boolean,
        required: true,
    }
},{timestamps: true})

export const specialization=mongoose.model("Specialization", specializationSchema);