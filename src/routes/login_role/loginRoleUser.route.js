const express = require('express');
const { loginRoleView, loginRoleCheck ,forgotpasswordview,forgotpassword} = require('../../controllers/login_role_user.controller');

const router = express.Router();

router.route('/').get(loginRoleView).post(loginRoleCheck);
router.route('/forgot_password_role').get(forgotpasswordview).post(forgotpassword);

module.exports = router;
