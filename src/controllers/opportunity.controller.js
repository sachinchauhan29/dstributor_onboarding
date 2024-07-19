const opportunityView = async (req, res) => {
    res.render('tables/opportunity');
};

const distributorEnquiryForm_view = async (req, res) => {
    res.render('forms/distributor_enquiry_form');
};
module.exports = { opportunityView ,distributorEnquiryForm_view};
