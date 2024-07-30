const express = require('express');
const { loginRoleView, loginRoleCheck } = require('../../controllers/login_role_user.controller');

const router = express.Router();

router.route('/').get(loginRoleView).post(loginRoleCheck);

module.exports = router;
