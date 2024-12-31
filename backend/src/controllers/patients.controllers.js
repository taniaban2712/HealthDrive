const hash = require("bcryptjs");
const patient = require("../models/patients.models.js");


const registerPatient = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    console.log(req.body); // Log the body of the request for debugging

    const { password, email } = req.body;
    const data = await patient.findOne({ email: email });
    console.log(data);
    if (!data) {
      const hashedPassword = await hash.hash(password, 10);
      const patientData = await patient
        .create({
          name: req.body.name,
          email: req.body.email,
          contactNumber: req.body.contactNumber,
          age: req.body.age,
          bloodGroup: req.body.bloodGroup,
          gender: req.body.gender,
          password: req.body.password,
        })
        .then(async (patientData) => {
          await patientData.save();
          console.log("done");
          res.status(200).json({
            message: "Patient registered successfully",
          });
        });
    }
    else{
        res.status(400).json({
            message: "Patient already exists"
        })
    }

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};


const loginPatient= async(req, res)=>{
    console.log(req.body);

    try{
        const {email, password}=req.body;
        const data=await patient.findOne({"email": email});
        if(!data){
            res.status(404).json({
                message: "Patient doesnt exist"
            })
        }
        else{

            res.status(200).json({
                message: "Patient exists"
            })
        }
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
          message: "Server error",
        });
    }
};

module.exports = registerPatient; // Correct export syntax
