const fs = require('fs');

const {selectInvite,insertDistributor} = require("../models/invite/invite.model");

const prospective_distributorView = async (req, res) => {
    let data = await selectInvite(req.body);    
    res.render('prospective-distributor',{tabledata:data});
};

const addDistriubutorView = async (req, res) => {


    res.render('distributors_details/distributors_status');
};

const addDistriubutor = async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    try {        
    insertDistributor(req.file,req.body);
    } catch (err) {
        console.error('Error reading file:', err.message);
        return res.status(500).send('Error reading file');
    }
}

module.exports = { prospective_distributorView, addDistriubutorView, addDistriubutor };
