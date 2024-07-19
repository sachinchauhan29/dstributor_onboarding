const express = require('express');

const { scoutingsheetview } = require('../../controllers/scouting_sheet.controller');

const router = express.Router();


router.route('/').get(scoutingsheetview);

module.exports = router;
