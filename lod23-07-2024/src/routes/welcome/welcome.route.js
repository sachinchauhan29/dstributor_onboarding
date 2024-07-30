const express = require('express');

const { welcomeView } = require('../../controllers/welcome.controller');

const router = express.Router();


router.route('/').get(welcomeView);

module.exports = router;
