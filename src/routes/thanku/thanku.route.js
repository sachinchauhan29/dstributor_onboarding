const express = require('express');

const {thankuView} = require('../../controllers/thanku.controller');
const router = express.Router();


router.route('/').get(thankuView);

module.exports = router;
