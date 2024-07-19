const bcrypt = require('bcrypt');

const {checkUser,insertOtp,findOtp,insertUser,insertOtp1,updateotp,searchOtp,updateUser,insertDistributionInfo} = require("../models/registration/login.model");

const loginRoleView = async (req, res) => {    
    res.render('login/login_role_user',{ message: req.session.message });
    req.session.destroy();

};


const loginRoleCheck = async (req,res) => {

    try {
        let userData = await checkUser(req.body.email);
        
        if (!userData || userData.length === 0) {
            req.session.message = 'Email Does Not Exist';
            return res.redirect("/login_role");
        }                      
            let password = req.body.password;

            userData = userData[0];

            const passwordMatch = await bcrypt.compare(password, userData.password);

        if (passwordMatch) {
            res.cookie('email', req.body.email, { httpOnly: true });
            await insertDistributionInfo(req.body.email);
            req.session.email = req.body.email;   
            return res.redirect("/userrole/role2");
        } else {
            req.session.message = 'Password is Not Correct!';
            res.redirect("/login_role");
        }
    } catch (error) {
        console.error("Error in login check:", error);
        res.redirect("/login_role");        
    } 
}

module.exports = { loginRoleView ,loginRoleCheck};
