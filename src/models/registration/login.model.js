const dbconn = require("../../config/db");

const checkUser = async (email) => {
  const query = `SELECT * from distributors_users where email=? `;
  return new Promise((resolve, reject) => {
    dbconn.query(query, email, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}

// const checkUser1 = async (email) => {
//   const query = `SELECT * from users where email=?`;
//   return new Promise((resolve, reject) => {
//     dbconn.query(query, email, (error, result) => {
//       if (error) {
//         return reject(error);
//       }
//       return resolve(result);
//     });
//   }); 
// }
const checkUser1 = async (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  return new Promise((resolve, reject) => {
    dbconn.query(query, [email], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const checkUserRole = async (usercheckrole) => {
  const query = `SELECT * FROM roleusers WHERE role = ?`; // Adjust the query based on your table structure
  return new Promise((resolve, reject) => {
    dbconn.query(query, [usercheckrole], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

const insertOtp = async (email, otp) => {
  let query = `INSERT INTO otp_info (email,otp,status) VALUES(?,?,?)`;
  values = [email, otp, "0"];

  return new Promise((resolve, reject) => {
    dbconn.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}

const findOtp = async (email, otp) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT email FROM otp WHERE email = ? AND otp = ?';
    dbconn.query(query, [email, otp], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      if (results.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

const insertUser = async (email, password, encrypted) => {
  const query = 'INSERT INTO distributors_users (email, view_password,password) VALUES (?, ?,?)';
  values = [email, password, encrypted];

  return new Promise((resolve, reject) => {
    dbconn.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}

const insertase = async (email, password, encrypted) => {
  const query = 'INSERT INTO users (email, view_password,password) VALUES (?, ?,?)';
  values = [email, password, encrypted];

  return new Promise((resolve, reject) => {
    dbconn.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}

const updateUser = async (email, password, encrypted) => {
  const query = 'UPDATE distributors_users SET view_password = ?, password = ? WHERE email = ?';
  const values = [password, encrypted, email];

  return new Promise((resolve, reject) => {
    dbconn.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}

const updateAse = async (email, password, encrypted) => {
  const query = 'UPDATE users SET view_password = ?, password = ? WHERE email = ?';
  const values = [password, encrypted, email];

  return new Promise((resolve, reject) => {
    dbconn.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}
const insertOtp1 = async (email, otp) => {
  const query = 'INSERT INTO otp (otp,email) VALUES (?, ?)';
  const values = [otp, email];
  try {
    const result = await new Promise((resolve, reject) => {
      dbconn.query(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
    return result;
  } catch (error) {
    throw error;
  }
};


const updateotp = async (email, otp) => {
  const query = 'UPDATE otp SET otp = ? WHERE email = ?'
  values = [otp, email]
  return new Promise((resolve, reject) => {
    dbconn.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}

const searchOtp = async (email) => {
  const query = 'SELECT * FROM otp WHERE email = ?';
  const values = [email];
  return new Promise((resolve, reject) => {
    dbconn.query(query, values, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}




const insertDistributionInfo = async (email) => {
  const query = 'INSERT INTO distributor_informations (distributor_email) VALUES (?)';
  const values = [email];
  try {
    const result = await new Promise((resolve, reject) => {
      dbconn.query(query, values, (error, result) => {
        if (error) {
        }
        return resolve(result);
      });
    });
  } catch (error) {
    throw error;
  }
}





const checkDistributor = async (email) => {
  console.log(email, "....................................");
  const query = `SELECT * from distributors_users where email=?`;
  return new Promise((resolve, reject) => {
    dbconn.query(query, email, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
}



module.exports = { updateAse, updateAse, insertase, checkDistributor, checkUser, insertOtp, findOtp, insertUser, insertOtp1, updateotp, searchOtp, updateUser, checkUser1, insertDistributionInfo, checkUserRole };