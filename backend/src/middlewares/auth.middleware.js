const jwt = require("jsonwebtoken");
require('dotenv').config(); // To load the .env file'

const isAuthenticated = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers["authorization"]?.split(" ")[1]; // Format: "Bearer <token>"
  console.log(token)

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, please log in" });
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log("auth error",err)
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    // If valid, attach user information to the request
    req.user = decoded; // You can now access req.user in your routes

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = isAuthenticated;
