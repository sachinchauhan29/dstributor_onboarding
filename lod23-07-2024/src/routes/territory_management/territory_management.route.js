const express = require('express');

const { territoryManagmentView } = require('../../controllers/territory_managment.controller');

const router = express.Router();


router.route('/').get(territoryManagmentView);

module.exports = router;
