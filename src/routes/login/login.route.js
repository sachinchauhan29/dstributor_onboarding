const express = require('express');

const { loginView,registrationview,checkotp,verifyotp ,checkotpview,logincheck,forgotpasswordview,forgotpassword,forgotEmailCheck,verifed} = require('../../controllers/login.controller');
const router = express.Router();


router.route('/').get(loginView).post(logincheck);
router.route('/registration').get(registrationview);
router.route('/checkotp').get(checkotpview).post(checkotp);
router.route('/forgot_password').get(forgotpasswordview).post(forgotpassword);
router.route('/forgot_email_check').post(forgotEmailCheck);
router.route('/verify').get(checkotpview).post(verifyotp);
router.route('/verifed').post(verifed);


module.exports = router;
