const dbconn = require("../../config/db");


const navbarviewesult = async (req, res, data) => {
    let cokemail = req.cookies.userData.role;
    let query = `
        SELECT users.*, roleusers.*
        FROM users
        JOIN roleusers ON users.role = roleusers.role
        WHERE users.role = ?
    `;

    return new Promise((resolve, reject) => {
        dbconn.query(query, [cokemail], (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result[0]);
        });
    });
}
const approversdetails = async (req, res) => {
    let emails = req.cookies.userData;

    console.log(emails, "emails");
    let query = `SELECT * FROM distributordetails WHERE aseemail = 'sachicha2222@gmail.com'`;
    console.log("query", query);
    return new Promise((resolve, reject) => {
        dbconn.query(query, (error, result) => {
            if (error) {
                return reject(error);
            }
            console.log(result, "result");
            return resolve(result);
        });
    });
}
const disviewesult = async (req, res, data) => {
    let query = `SELECT * FROM roleusers WHERE role = ?`;

    return new Promise((resolve, reject) => {
        dbconn.query(query, data, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result[0]);
        });
    });
}

module.exports = { navbarviewesult, approversdetails, disviewesult };
