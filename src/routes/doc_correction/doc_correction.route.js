const express = require('express');

const {docCorrectionView} = require('../../controllers/doc_correction.controller');
const router = express.Router();


router.route('/').get(docCorrectionView);

module.exports = router;