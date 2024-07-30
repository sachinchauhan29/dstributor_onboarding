const dbconn = require("../../config/db");


const getdistributorlistResult = async (data) => {

    let query = `SELECT * FROM distributordetails WHERE aseemail = 'sachicha2222@gmail.com'`;
    return new Promise((resolve, reject) => {
        dbconn.query(query, (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
}

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

module.exports = { getdistributorlistResult, navbarviewesult };
