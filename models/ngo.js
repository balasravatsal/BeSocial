const mysql = require("mysql")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "9352",
    database: "dbpro"
});

module.exports = con
