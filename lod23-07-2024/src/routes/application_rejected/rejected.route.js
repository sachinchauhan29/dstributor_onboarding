const express = require('express');

const { application_rejected_view } = require('../../controllers/application_rejected.controller');
const router = express.Router();


router.route('/').get(application_rejected_view);


module.exports = router;