const { navbarviewesult, } = require("../models/role_management/role_management.model");



const mainView = async (req, res) => {
  try {
    let navbarview = await navbarviewesult(req, res, req.query);
    console.log(navbarview, "navbarview");
    res.render('index', { token: navbarview });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }

};

module.exports = { mainView };