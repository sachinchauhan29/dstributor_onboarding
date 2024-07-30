
const { navbarviewesult, approversdetails, disviewesult } = require("../models/application/application.model");

const aprroversindoxView = async (req, res) => {
    try {
        let navbarview = await navbarviewesult(req, res, req.query);

        let approversdistributordetails = await approversdetails(req, res, req.query);

        console.log(approversdistributordetails, "approversdistributordetails");
        res.render('tables/approvers_inbox', { approversdistributordetails: approversdistributordetails, token: navbarview });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }


};
const aprroverViewpage = async (req, res) => {
    try {
        let navbarview = await navbarviewesult(req, res, req.query);
        const disviweid = req.query.id;

        // Log the data to ensure it is being retrieved correctly
        console.log("navbarview:", navbarview);
        console.log("disviweid:", disviweid);

        // Render the application details view with the required data
        res.render('application/application_details', {
            token: navbarview,
            id: disviweid
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const roleUserView1 = async (req, res) => {
    try {
        let navbarview = await navbarviewesult(req, res, req.query);
        const disviweid = req.query.id;
        res.render('application/approvalform/roleuser1', { token: navbarview, id: disviweid });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }


};

module.exports = { aprroversindoxView, aprroverViewpage, roleUserView1 };
