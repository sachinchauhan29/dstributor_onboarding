
const dbconn = require("../../config/db");



const saveUser = async (data) => {
    try {
        const query = `INSERT INTO roleusers (
            role, displayname, Dashboard, ProspectiveDistributors, Invite,ScoutingSheet, ApproverInbox, 
            ApplicationList, DistributorsList, RoleManagement, UserManagement, TerritoryManagement
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const values = [
            data.role, data.displayname, data.Dashboard, data.ProspectiveDistributors, data.Invite,
            data.ScoutingSheet, data.ApproverInbox, data.ApplicationList, data.DistributorsList, data.RoleManagement,
            data.UserManagement, data.TerritoryManagement
        ];

        return new Promise((resolve, reject) => {
            dbconn.query(query, values, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    } catch (error) {
        return error;
    }
};


const selectUsers = async (data) => {
    let query = `SELECT * FROM roleusers WHERE role = '${data.role}'`

    return new Promise((resolve, reject) => {
        dbconn.query(query, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

const rolemanagmentresult = async (req, res, data) => {
    let query = `SELECT * FROM roleusers WHERE 1= 1`

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

const editroleviewviewesult = async (req, res, data) => {
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


const updaterole = async (data) => {
    try {
        const query = `
            UPDATE roleusers 
            SET 
                Dashboard = ?, 
                ProspectiveDistributors = ?, 
                Invite = ?,
                ScoutingSheet = ?,
                ApproverInbox = ?, 
                ApplicationList = ?, 
                DistributorsList = ?, 
                RoleManagement = ?, 
                UserManagement = ?, 
                TerritoryManagement = ?, 
                displayname = ?
            WHERE role = ?`;

        const values = [
            data.Dashboard,
            data.ProspectiveDistributors,
            data.Invite,
            data.ScoutingSheet,
            data.ApproverInbox,
            data.ApplicationList,
            data.DistributorsList,
            data.RoleManagement,
            data.UserManagement,
            data.TerritoryManagement,
            data.displayname,
            data.role // This is the condition to match the record to update
        ];

        return new Promise((resolve, reject) => {
            dbconn.query(query, values, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

const deleteRole = async (role) => {
    const query = 'DELETE FROM roleusers WHERE role = ?';
    return new Promise((resolve, reject) => {
        dbconn.query(query, [role], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};
module.exports = { saveUser, selectUsers, rolemanagmentresult, navbarviewesult, editroleviewviewesult, updaterole, deleteRole };
