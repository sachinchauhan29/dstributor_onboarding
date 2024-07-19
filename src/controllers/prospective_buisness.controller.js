const {insertBusinessForm} = require("../models/prospective_distributor/prospective.model")
const businessform_view = async (req, res) => {
    res.render('business_forms/business_detail');
};


const businessform = async (req,res)=>{
    // console.log(req.body,"...........................");
    await insertBusinessForm(req.body);
    return res.redirect("/prospective_buisnessform")
}

module.exports = { businessform_view,businessform };
