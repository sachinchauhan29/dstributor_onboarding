"user strict";
const mysql = require("mysql");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dstributor_onboarding",
});

module.exports = connection;
