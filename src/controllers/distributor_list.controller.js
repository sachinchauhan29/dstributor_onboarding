

const { getdistributorlistResult, navbarviewesult } = require("../models/distributors_list/distributors_list.model");
const distributorlist_view = async (req, res) => {
    let distributorlistResult = await getdistributorlistResult(req.query);
    let navbarview = await navbarviewesult(req, res, req.query);
    res.render('distributors/distributors_list', { distributorlistResult: distributorlistResult, token: navbarview });
};


module.exports = { distributorlist_view };
