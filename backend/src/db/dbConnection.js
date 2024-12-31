const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE_URI);
    console.log(
      `database connected: ${connect.connection.host}`
    );
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
