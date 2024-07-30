const express = require('express');

const { doc_CaptureDetailsView } = require('../../controllers/application_doc_capture.controller');

const router = express.Router();


router.route('/').get(doc_CaptureDetailsView);

module.exports = router;
