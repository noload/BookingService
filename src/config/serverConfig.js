const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  flight_service_path: process.env.flight_service_path,
};
