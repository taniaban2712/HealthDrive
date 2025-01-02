const hash = require("bcryptjs");
const patient = require("../models/patients.models.js");
const doctor = require("../models/doctors.models.js");
const jwt = require("jsonwebtoken");

const RegisterPatient = async (req, res) => {

  // if (.some((field) => field?.trim() === "")) {
  //   //checking if all fields are present
  //   return res.status(400).json({ message: "All fields are required." });
  // }

  try {
    console.log(req.body); // Log the body of the request for debugging
    const { password, email } = req.body;
    const data = await patient.findOne({ email: email });
    console.log(data);
    if (!data) {
      //patient data
      const hashedPassword = await hash.hash(password, 10);
      // console.log(hashedPassword);
      const token = jwt.sign(
        { email: email },
        process.env.ACCESS_TOKEN_SECRET
      );
      const patientData = await patient
        .create({
          name: req.body.name,
          email: req.body.email,
          contactNumber: req.body.contactNumber,
          age: req.body.age,
          bloodGroup: req.body.bloodGroup,
          gender: req.body.gender,
          password: hashedPassword,
          refreshToken: token,
        })
        .then(async (patientData) => {
          await patientData.save();

          //JWT TOKEN
          
          console.log("done");
          res.status(200).json({
            message: "Patient registered successfully",
            auth: token,
            email: email,
          });
        });
    } else {
      res.status(400).json({
        message: "Patient already exists",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const LoginPatient = async (req, res) => {
  console.log(req.body);

  try {
    const { email, password } = req.body;
    // console.log("email:", email);
    // console.log("password:", password);
    const patientData = await patient.findOne({ email: email });
    if (!patientData) {
      return res.status(404).json({
        message: "Patient doesnt exist",
      });
    } else {
      console.log(patientData);
      const isMatch = await hash.compare(password, patientData.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      } else {
        const token = jwt.sign(
          { email: email },
          process.env.ACCESS_TOKEN_SECRET
        );
        console.log("done");
        res.status(200).json({
          message: "Patient logged in successfully",
          auth: token,
          id: patientData._id,
        });
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const GetPatient= async(req,res)=>{
  const patientId=req.params.id;
  console.log(patientId);
  try{
    const patientData=await patient.findById({_id:patientId}).select("-password -refreshToken");
    console.log(patientData);
    if(patientData) return res.status(200).json(patientData);
    else return res.status(404).json({message:"Patient not found"});
  }
  catch(error){
    console.error("Error:",error);
    return res.status(500).json({message:"Server error"});
  }
};

const UpdatePatient=async(req,res)=>{
  const patientId=req.params.id;
  const updatedData=req.body;;
  console.log(patientId);

  const repeatedUser=await patient.findOne({email:updatedData.email});
  const repeatedUser2=await patient.findOne({contact:updatedData.contactNumber});
  if(repeatedUser || repeatedUser2){
    return res.status(400).json({message:"Email already exists"});
  }
  
  const user={
    id:patientId,
    name:updatedData.name,
    email:updatedData.email,
    contactNumber:updatedData.contactNumber,
    age:updatedData.age,
    bloodGroup:updatedData.bloodGroup,
  }

  const updatedPatient= await patient.findByIdAndUpdate(patientId,updatedData,{new:true});
  if(updatedPatient) return res.status(200).json(user);
  else return res.status(500).json({message:"Server error"});
}


module.exports = {
  RegisterPatient,
  LoginPatient,
  GetPatient,
  UpdatePatient
};