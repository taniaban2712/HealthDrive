const mongoose = require("mongoose");

const patientSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    contactNumber:{
        type: Number,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    bloodGroup:{
        type: String,
        enum:["A+", "A-", "B+", "B-", "O+", "O-", "AB+","AB-"],
        required: true,
    },
    gender:{
        type: String,
        enum:['Female', 'Male', 'Other'],
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
},{timestamps: true})

module.exports=mongoose.model("Patient", patientSchema);