const dbconn = require("../../config/db");

const selectInvite = async (data) => {
  let query = `SELECT * from prospective_distributor`;
  return new Promise((resolve, reject) => {
    dbconn.query(query, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}

const insertDistributor = async (file, data) => {

  const chiller = data['radio-chiller'];
  const floor_stock = data['radio-floor_stock'];
  const walls_plastered = data['radio-walls_plastered'];
  const save_future = data['radio-save-future'];
  const name = data['radio-name'];

  let query = `INSERT INTO distributordetails (
            gst_number, business_type, number_partner, name,
            mobile_number, department, department_function, Expected_outlet,
            day_investment, market_credit, slider, chiller, floor_stock,
            walls_plastered, pest_control, feature, distributor_email_id,image
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`
  let values = [
    data.gst_number,
    name,
    data.number_partner,
    data.Personal_details,
    data.mobile_number,
    data.department,
    data.dpeartment_fun,
    data.Expected_outlet,
    data.day_investment,
    data.market_credit,
    data.slider,
    chiller,
    floor_stock,
    walls_plastered,
    data.pest_control,
    save_future,
    data.distributor_email_id,
    file.path
  ]
  return new Promise((resolve, reject) => {
    dbconn.query(query, values, (error, result) => {
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

module.exports = { selectInvite, insertDistributor, navbarviewesult };