const { getdistributorlistResult, navbarviewesult } = require("../models/distributors_list/distributors_list.model");

const doc_CaptureDetailsView = async (req, res) => {
    let navbarview = await navbarviewesult(req, res, req.query);
    res.render('application/document_captur', { token: navbarview });
};


module.exports = { doc_CaptureDetailsView };
