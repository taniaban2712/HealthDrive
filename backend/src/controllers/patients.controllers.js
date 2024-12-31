const hash = require("bcryptjs");
const patient = require("../models/patients.models.js");
const jwt = require("jsonwebtoken");

const registerPatient = async (req, res) => {
  if (req.body.some((field) => field?.trim() === "")) {
    //checking if all fields are present
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    console.log(req.body); // Log the body of the request for debugging

    const { password, email } = req.body;
    const data = await patient.findOne({ email: email });
    console.log(data);
    if (!data) {
      const hashedPassword = await hash.hash(password, 10);
      console.log(hashedPassword);
      const patientData = await patient
        .create({
          name: req.body.name,
          email: req.body.email,
          contactNumber: req.body.contactNumber,
          age: req.body.age,
          bloodGroup: req.body.bloodGroup,
          gender: req.body.gender,
          password: hashedPassword,
        })
        .then(async (patientData) => {
          await patientData.save();
          console.log("done");
          res.status(200).json({
            message: "Patient registered successfully",
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

const loginPatient = async (req, res) => {
  //console.log(req.body);

  try {
    const { email, password } = req.body;
    console.log("email", email);    
    console.log("password", password);
    const data = await patient.findOne({ email: email });
    if (!data) {
      return res.status(404).json({
        message: "Patient doesnt exist",
      });
    } else {
        console.log(data);
      const patientData = {
        user: data.id,
      };
    //   const token = jwt.sign(patientData, process.env.ACCESS_TOKEN_SECRET);
      
      res.status(200).json({
        message: "Patient exists",
        auth: token,
        email: data.email,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = registerPatient; // Correct export syntax
module.exports = loginPatient; // Correct export syntax
