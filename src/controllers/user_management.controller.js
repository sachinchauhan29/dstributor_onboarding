const { navbarviewesult } = require("../models/role_management/role_management.model");


const userManagmentView = async (req, res) => {
    let navbarview = await navbarviewesult(req, res, req.query);
    res.render('role_management/user_management', { token: navbarview });
};

module.exports = { userManagmentView };
