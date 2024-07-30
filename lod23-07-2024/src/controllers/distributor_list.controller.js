

const { getdistributorlistResult } = require("../models/distributors_list/distributors_list.model");
const distributorlist_view = async (req, res) => {
    let distributorlistResult = await getdistributorlistResult(req.query);
    console.log(distributorlistResult);
    res.render('distributors/distributors_list', { distributorlistResult: distributorlistResult });
};


module.exports = { distributorlist_view };
