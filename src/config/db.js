"user strict";
const mysql = require("mysql");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "onboard(db1)",
});

module.exports = connection;
