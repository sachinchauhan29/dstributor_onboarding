const express = require('express');

const { checkPermission } = require('../../controllers/checkPermission.controller');

const router = express.Router();


router.route('/').get(checkPermission);

module.exports = router;
