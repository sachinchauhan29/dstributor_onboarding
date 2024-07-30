const express = require('express');

const { userManagmentView } = require('../../controllers/user_management.controller');

const router = express.Router();


router.route('/').get(userManagmentView);

module.exports = router;
