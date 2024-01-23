const express = require("express");
const podyParser = require("body-parser");
const bodyParser = require("body-parser");
const app = express();

const { PORT, flight_service_path } = require("./config/serverConfig");

const apiRoute = require("./router/index");

const db = require("./models/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", apiRoute);
const setupAndStartServer = () => {
  app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);

    console.log(flight_service_path);

    // if (process.env.DB_SYNC) {
    //   db.sequelize.sync({ alert: true });
    // }
  });
};

setupAndStartServer();
