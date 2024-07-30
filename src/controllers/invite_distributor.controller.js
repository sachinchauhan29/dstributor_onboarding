const fs = require('fs');

const { selectInvite, insertDistributor, navbarviewesult } = require("../models/invite/invite.model");

const prospective_distributorView = async (req, res) => {
    let navbarview = await navbarviewesult(req, res, req.query);
    let data = await selectInvite(req.body);
    res.render('prospective-distributor', { tabledata: data, token: navbarview });
};

const addDistriubutorView = async (req, res) => {
    let navbarview = await navbarviewesult(req, res, req.query);

    res.render('distributors_details/distributors_status', { token: navbarview });
};

const addDistriubutor = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    try {
        insertDistributor(req.file, req.body);
    } catch (err) {
        console.error('Error reading file:', err.message);
        return res.status(500).send('Error reading file');
    }
}

module.exports = { prospective_distributorView, addDistriubutorView, addDistriubutor, navbarviewesult };
