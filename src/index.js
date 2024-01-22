const express = require("express");
const podyParser = require("body-parser");
const bodyParser = require("body-parser");
const app = express();

const { PORT } = require("./config/serverConfig");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const setupAndStartServer = () => {
  app.listen(PORT, () => {
    console.log(`server started at ${PORT}`);
  });
};

setupAndStartServer();
