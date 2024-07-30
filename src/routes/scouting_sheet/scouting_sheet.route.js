const express = require('express');

const scoutingsheetview = require('../../controllers/scouting_sheet.controller');

const router = express.Router();


router.route('/').get(scoutingsheetview.scoutingsheetview);
router.route('/add_scouti').post(scoutingsheetview.addNewUser);

module.exports = router;
