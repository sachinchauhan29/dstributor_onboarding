const aprroversindoxView = async (req, res) => {
    res.render('tables/approvers_inbox');
};

const aprroverViewpage = async (req, res) => {
    res.render('application/application_details');
};

module.exports = { aprroversindoxView,aprroverViewpage };
