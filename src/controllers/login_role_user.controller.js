const bcrypt = require('bcrypt');


const {sendLinkOnMail,generateOTP}  = require("../util/send.email");
const {encrypt}  = require("../util/encypt.pass");


const {checkUser,insertOtp,findOtp,insertUser,insertOtp1,updateotp,searchOtp,updateUser,insertDistributionInfo,checkDistributor} = require("../models/registration/login.model");

const loginRoleView = async (req, res) => {    
    res.render('login/login_role_user',{ message: req.session.message });
    req.session.destroy();

};


const loginRoleCheck = async (req,res) => {

    console.log(req.body.email);
    try {
        let userData = await checkDistributor(req.body.email);
        
        if (!userData || userData.length === 0) {
            req.session.message = 'Email Does Not Exist';
            return res.redirect("/login_role");
        }                      
            let password = req.body.password;

            userData = userData[0];

            const passwordMatch = await bcrypt.compare(password, userData.password);

        if (passwordMatch) {
            res.cookie('email', req.body.email, { httpOnly: true });
            // await insertDistributionInfo(req.body.email);
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


const forgotpasswordview = async (req, res) => {
    res.render('login/forgorpassword_role');
};

const forgotpassword = async (req, res) => {

    let { email, otp, password } = req.body;
    console.log(req.body);

    let encrypted = await encrypt(password);

    try {
       let isValid = await findOtp(email, otp);
       if (isValid) {
           await updateUser(email,password,encrypted);
        //    res.json({ success: true, message: 'Password changed successfully' });
           res.json({ success: true, message: 'Password changed successfully' });

        } else {
        return res.json({ success: false, message: 'Invalid OTP' });
       }
    } catch (error) {
       console.error('Error occurred:', error);
       return;
    }     
};
module.exports = { loginRoleView ,loginRoleCheck,forgotpasswordview,forgotpassword};
