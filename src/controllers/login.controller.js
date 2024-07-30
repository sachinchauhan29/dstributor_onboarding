const bcrypt = require('bcrypt');

const { sendLinkOnMail, generateOTP } = require("../util/send.email");
const { encrypt } = require("../util/encypt.pass");

const { insertase, updateAse, checkUser1, checkUser, insertOtp, findOtp, insertUser, insertOtp1, updateotp, searchOtp, updateUser, checkUserRole } = require("../models/registration/login.model");
const nodemailer = require('nodemailer');

const loginView = async (req, res) => {

    try {
        res.clearCookie('userData', 'email');
        res.render('login/login', { message: req.session.message });


    } catch (error) {
        console.error("Error in login view:", error);
        res.redirect("/");
    }
};

const logincheck = async (req, res) => {
    try {
        // Check if the user exists
        let userData = await checkUser1(req.body.email);

        if (!userData || userData.length === 0) {
            req.session.message = 'Email Does Not Exist';
            return res.redirect("/");
        }

        let password = req.body.password;
        userData = userData[0];

        // Check if the password matches
        const passwordMatch = password === userData.view_password;

        if (!passwordMatch) {
            req.session.message = 'Password is Not Correct!';
            return res.redirect("/");
        }

        // Check the user's role
        let usercheckrole = userData.role;
        let userRoles = await checkUserRole(usercheckrole);

        if (!userRoles || userRoles.length === 0) {
            req.session.message = 'User Role Not Found';
            return res.redirect("/");
        }

        let rolePermissions = userRoles[0];
        let redirectUrl = "/";
        if (rolePermissions.Dashboard === '1') {
            redirectUrl = "/dashboard";
        } else if (rolePermissions.ProspectiveDistributors === '1') {
            redirectUrl = "/prospective_buisnessform";
        } else if (rolePermissions.Invite === '1') {
            redirectUrl = "/invite";
        } else if (rolePermissions.ApplicationList === '1') {
            redirectUrl = "/application_list";
        } else if (rolePermissions.UserManagement === '1') {
            redirectUrl = "/user_management";
        } else if (rolePermissions.TerritoryManagement === '1') {
            redirectUrl = "/territory_managment";
        } else {
            req.session.message = 'No permissions found for this user';
        }

        // Store user data in cookies if needed
        res.cookie('email', req.body.email, { httpOnly: true });
        res.cookie('userData', userData, { httpOnly: true });
        return res.redirect(redirectUrl);

    } catch (error) {
        console.error("Error in login check:", error);
        req.session.message = 'An error occurred. Please try again.';
        return res.redirect("/");
    }
};



// const logincheck = async (req, res) => {
//     try {
//         let userData = await checkUser1(req.body.email);

//         if (!userData || userData.length === 0) {
//             req.session.message = 'Email Does Not Exist';
//             return res.redirect("/");
//         }
//         let password = req.body.password;

//         userData = userData[0];

//         const passwordMatch = password === userData.view_password;

//         if (passwordMatch) {
//             res.cookie('email', req.body.email, { httpOnly: true });
//             res.cookie('userData', userData, { httpOnly: true });
//             return res.redirect("/dashboard");
//         } else {
//             req.session.message = 'Password is Not Correct!';
//             res.redirect("/");
//         }
//     } catch (error) {
//         console.error("Error in login check:", error);
//         res.redirect("/");
//     }
// }

const registrationview = async (req, res) => {
    res.render('login/registration', { message: req.session.message });
    req.session.destroy();
};

const checkotpview = async (req, res) => {
    let email = req.body.email;

    res.render('login/otpcheck', { email: email, message: req.session.message });
    req.session.destroy();
}

const checkotp = async (req, res) => {
    let email = req.body.email;

    let data = await checkUser(email);

    if (Array.isArray(data) && data.length > 0) {
        req.session.message = `${email} already exists`;
        res.redirect('/registration');
    } else {
        let otp = await generateOTP();
        await insertOtp(email, otp);

        let otpData = await searchOtp(email);
        if (otpData.length !== 0) {
            await updateotp(email, otp);
        } else {
            await insertOtp1(email, otp);
        }

        await sendLinkOnMail(email, otp);
        res.render('login/otpcheck', { email: email, message: req.session.message });

    }
};

const verifyotp = async (req, res) => {
    let { email, otp } = req.body;
    console.log(req.body);
    try {
        let isValid = await findOtp(email, otp);
        if (isValid) {
            // let encrypted = await encrypt(password);
            // await insertUser(email, password, encrypted);
            res.cookie('email', email, { httpOnly: true });
            return res.json({ success: true, message: 'OTP is valid. User registered successfully.' });
        } else {
            return res.json({ success: false, message: 'OTP is not valid.' });
        }
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).json({ success: false, message: 'An error occurred while registering the user.' });
    }
}



const checkRegistrationOtp = async (req, res) => {
    let email = req.body.email;

    let data = await checkDistributor(email);

    if (Array.isArray(data) && data.length > 0) {
        req.session.message = `${email} already exists`;
        res.redirect('/registration');
    } else {
        let otp = await generateOTP();
        await insertOtp(email, otp);

        let otpData = await searchOtp(email);
        if (otpData.length !== 0) {
            await updateotp(email, otp);
        } else {
            await insertOtp1(email, otp);
        }

        await sendLinkOnMail(email, otp);
        res.render('login/otpcheck', { email: email, message: req.session.message });

    }
};

const forgotpasswordview = async (req, res) => {
    res.render('login/forgotpassword');
};


const forgotpassword = async (req, res) => {

    let { email, otp, password } = req.body;
    console.log(req.body);

    let encrypted = await encrypt(password);
    // let encrypted = await bcrypt.hash(password, 10);

    try {
        let isValid = await findOtp(email, otp);
        if (isValid) {
            //    await updateUser(email,password,encrypted);
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

const forgotEmailCheck = async (req, res) => {
    try {
        let email = req.body.email;
        let data = await checkUser(email);
        if (data.length !== 0) {
            let otp = await generateOTP();
            await insertOtp(email, otp);

            let otpData = await searchOtp(email);
            if (otpData.length !== 0) {
                await updateotp(email, otp);
            } else {
                await insertOtp1(email, otp);
            }

            await sendLinkOnMail(email, otp);
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error in forgotEmailCheck:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const forgotEmailCheckAse = async (req, res) => {
    try {
        let email = req.body.email;
        let data = await checkUser1(email);
        if (data.length !== 0) {
            let otp = await generateOTP();
            await insertOtp(email, otp);

            let otpData = await searchOtp(email);
            if (otpData.length !== 0) {
                await updateotp(email, otp);
            } else {
                await insertOtp1(email, otp);
            }

            await sendLinkOnMail(email, otp);
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        console.error("Error in forgotEmailCheck:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const verifed = async (req, res) => {
    // console.log(req.body);
    let { email, password, otp } = req.body;

    let data = await checkUser(email);
    // console.log(data[0].role);

    let encrypted = await encrypt(password);
    try {
        if (data.length == 0) {
            await insertUser(email, password, encrypted);
            req.session.email = email;
            return res.json({ success: true, message: "User created successfully", role: 'distributor' });

        } else {
            await updateUser(email, password, encrypted);
            return res.json({ success: true, message: "Password Changed Successfully", role: data[0].role });

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


const verifedAse = async (req, res) => {
    // console.log(req.body);
    let { email, password, otp } = req.body;

    let data = await checkUser1(email);
    // console.log(data[0].role);

    let encrypted = await encrypt(password);
    try {
        if (data.length == 0) {
            await insertase(email, password, encrypted);
            req.session.email = email;
            return res.json({ success: true, message: "User created successfully", role: 'distributor' });

        } else {
            await updateAse(email, password, encrypted);
            return res.json({ success: true, message: "Password Changed Successfully", role: data[0].role });

        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
module.exports = { forgotEmailCheckAse, checkRegistrationOtp, verifedAse, loginView, registrationview, checkotp, verifyotp, checkotpview, logincheck, forgotpasswordview, forgotpassword, forgotEmailCheck, verifed };
