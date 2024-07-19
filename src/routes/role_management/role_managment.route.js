const express = require('express');

const { roleManagmentView } = require('../../controllers/role_management.controller');

const router = express.Router();


router.route('/').get(roleManagmentView);

module.exports = router;
