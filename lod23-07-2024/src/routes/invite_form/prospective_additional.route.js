const express = require('express');

const {additionalform_view } = require('../../controllers/prospective_additional_details.controller');

const router = express.Router();


router.route('/').get(additionalform_view);

module.exports = router;
