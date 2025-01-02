const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes
const patientRouter = require("./routers/patients.routes.js");
const appointmentRouter = require("./routers/appointments.routes.js");
const doctorRouter = require("./routers/doctors.routes.js");

// Use patientRouter under /api/auth
app.use('/patient', patientRouter);
app.use('/appointment', appointmentRouter);
app.use('/doctor', doctorRouter)

module.exports = app;
