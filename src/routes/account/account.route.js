const express = require('express');
const { mainView } = require('../../controllers/main.controller.js');
const router = express.Router();


router.route('/').get(mainView);


module.exports = router;