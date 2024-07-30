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



module.exports = { getdistributorlistResult };
