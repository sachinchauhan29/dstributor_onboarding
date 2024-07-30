const { insertBusinessForm, navbarviewesult } = require("../models/prospective_distributor/prospective.model")
const businessform_view = async (req, res) => {
    let navbarview = await navbarviewesult(req, res, req.query);
    res.render('business_forms/business_detail', { token: navbarview });
};


const businessform = async (req, res) => {
    let navbarview = await navbarviewesult(req, res, req.query);
    await insertBusinessForm(req.body);
    return res.redirect("/prospective_buisnessform", { token: navbarview })
}

module.exports = { businessform_view, businessform };
