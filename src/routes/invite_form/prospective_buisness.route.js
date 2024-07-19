const express = require('express');

const { businessform_view,businessform } = require('../../controllers/prospective_buisness.controller');

const router = express.Router();


router.route('/').get(businessform_view).post(businessform);

module.exports = router;
