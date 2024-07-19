const dbconn = require("../../config/db");

// const selectProspective = async (data) => {
//     let query = `SELECT * from prospective_distributor`;
//     return new Promise((resolve, reject) => {
//         dbconn.query(query, (error, result) => {
//         if (error) {
//           return reject(error);
//         }
//         return resolve(result);
//       });
//     });
//   }


const insertBusinessForm = async (data) => {
    console.log(data);
    let query = `INSERT INTO prospective_info (application_type, business_name, mobile_no, email_id, country, owner_name, zone, census_code, city, delivering_plant) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    
    return new Promise((resolve, reject) => {
        dbconn.query(query, [data.application_type, data.business_name, data.mobile_no, data.email_id, data.country, data.onwer_name, data.zone, data.census, data.city_name, data.plant], (error, result) => {
            if (error) {
                return reject(error);
            }
            return resolve(result);
        });
    });
};




module.exports = {insertBusinessForm};