require("dotenv").config();
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  // host: "https://sristi-registration-backend.vercel.app/",
  // port: 587,
  service: "gmail",
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: process.env.HEALTH_DRIVE_EMAIL,
    pass: process.env.HEALTH_DRIVE_PASSWORD,
  },
  tls: {
    rejectUnAuthorized: true,
  },
});

const SendMail = async (req, res) => {
  const email = req.body.email;
  // console.log("user name", process.env.SRISTI_EMAIL);
  // console.log("password", process.env.SRISTI_PASSWORD);
  // console.log(email);

  var message = {
    from: `${process.env.HEALTH_DRIVE_EMAIL}`,
    to: `${email}`,
    subject: "Welcome to HealthDrive",
    text: "",
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to HealthDrive</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: #134e4a;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            border-radius: 8px 8px 0 0;
        }

        .email-content {
            padding: 20px;
            font-size: 18px;
            color: #333;
        }

        .cta-button {
            display: inline-block;
            background-color: #134e4a;
            color: white;
            padding: 12px 25px;
            font-size: 16px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }

        .cta-button:hover {
            background-color: #106c67;
        }

        .footer {
            text-align: center;
            font-size: 14px;
            color: #888;
            padding: 20px;
            border-top: 1px solid #ddd;
        }

        .footer a {
            color: #134e4a;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            Welcome to HealthDrive!
        </div>

        <!-- Email Content -->
        <div class="email-content">
            <p>Hello,</p>
            <p>We’re excited to have you on board with HealthDrive! To get started, we encourage you to <a href="http://localhost:5173/login" >login to your account</a> and set up an appointment with one of our doctors.</p>

            <p>If you have any questions or need assistance, don’t hesitate to reach out to our support team.</p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Best Regards, <br> The HealthDrive Team</p>
            <p><a href="http://localhost:5173/contact">Contact Us</a> | <a href="http://localhost:5173/terms">Terms of Service</a></p>
        </div>
    </div>
</body>
</html>

    `,
  };
  try {
    const info = await transporter.sendMail(message);
    return res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    // If there was an error, return a failure response
    console.error("Error details:", error); // Log the full error object
    return res.status(500).json({ error: error.message });
  }
};

const SendAppointmentMail = async (req, res) => {
  const email=req.body.email;
  var message = {
    from: `${process.env.HEALTH_DRIVE_EMAIL}`,
    to: `${email}`,
    subject: "Welcome to HealthDrive",
    text: "",
    html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .email-header {
            background-color: #134e4a;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            border-radius: 8px 8px 0 0;
        }

        .email-content {
            padding: 20px;
            font-size: 18px;
            color: #333;
        }

        .appointment-details {
            background-color: #f9f9f9;
            border: 1px solid #ddd;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .cta-button {
            display: inline-block;
            background-color: #134e4a;
            color: white;
            padding: 12px 25px;
            font-size: 16px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }

        .cta-button:hover {
            background-color: #106c67;
        }

        .footer {
            text-align: center;
            font-size: 14px;
            color: #888;
            padding: 20px;
            border-top: 1px solid #ddd;
        }

        .footer a {
            color: #134e4a;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Email Header -->
        <div class="email-header">
            Appointment Confirmation
        </div>

        <!-- Email Content -->
        <div class="email-content">
            <p>Hello ${patientName},</p>
            <p>Thank you for booking an appointment with us. Below are the details of your appointment:</p>
            
            <!-- Appointment Details -->
            <div class="appointment-details">
                <h3>Appointment Details</h3>
                <p><strong>Doctor:</strong> ${doctorName}</p>
                <p><strong>Date:</strong> [Appointment Date]</p>
                <p><strong>Time:</strong> [Appointment Time]</p>
            </div>
            
            <p>We look forward to seeing you at the scheduled time. If you need to reschedule or have any questions, feel free to contact us.</p>

            <a href="[Reschedule or Contact Link]" class="cta-button">Contact Us / Reschedule</a>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>Best Regards, <br> The HealthDrive Team</p>
            <p><a href="[Terms of Service Link]">Terms of Service</a> | <a href="[Privacy Policy Link]">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>

        `,
  };
  try {
    const info = await transporter.sendMail(message);
    return res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    // If there was an error, return a failure response
    console.error("Error details:", error); // Log the full error object
    return res.status(500).json({ error: error.message });
  }
};
module.exports = {SendMail, SendAppointmentMail};
