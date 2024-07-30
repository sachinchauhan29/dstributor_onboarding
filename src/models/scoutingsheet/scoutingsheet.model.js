
const dbconn = require("../../config/db");



const saveUser = async (data) => {
    try {
        const query = `INSERT INTO scoutingsheet (name, email, experienceReputation, marketCoverage, financialStability, productKnowledge,distributionNetwork,customerbase,salesMarketing,supportTraining,termsConditions,averageScore,averagestatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [data.name, data.email, data.experienceReputation, data.marketCoverage, data.financialStability, data.productKnowledge, data.distributionNetwork, data.customerbase, data.salesMarketing, data.supportTraining, data.termsConditions, data.averageScore, data.averagestatus];

        return new Promise((resolve, reject) => {
            dbconn.query(query, values, (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    } catch (error) {
        return error;
    }
};

const selectUsers = async (data) => {
    let query = `SELECT * FROM scoutingsheet WHERE email = '${data.email}'`

    return new Promise((resolve, reject) => {
        dbconn.query(query, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = { saveUser, selectUsers };
