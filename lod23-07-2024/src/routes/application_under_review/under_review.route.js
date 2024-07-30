const express = require('express');

const { underreview_view } = require('../../controllers/application_underreview.controller');

const router = express.Router();


router.route('/').get(underreview_view);

module.exports = router;
