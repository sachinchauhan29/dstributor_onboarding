const express = require('express');

const { aprroversindoxView,aprroverViewpage } = require('../../controllers/approvers_indox.controllers');

const router = express.Router();


router.route('/').get(aprroversindoxView);
router.route('/view').get(aprroverViewpage);

module.exports = router;
