const express = require('express');

const { completedDetailsView } = require('../../controllers/application_completed.controller');

const router = express.Router();


router.route('/').get(completedDetailsView);

module.exports = router;
