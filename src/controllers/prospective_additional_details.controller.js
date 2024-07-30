const { navbarviewesult } = require("../models/role_management/role_management.model");


const additionalform_view = async (req, res) => {
    let navbarview = await navbarviewesult(req, res, req.query);
    res.render('business_forms/additional_detail', { token: navbarview });

};

module.exports = { additionalform_view };
