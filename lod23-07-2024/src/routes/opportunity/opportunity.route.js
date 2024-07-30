const express = require('express');

const { opportunityView,distributorEnquiryForm_view } = require('../../controllers/opportunity.controller');

const router = express.Router();


router.route('/').get(opportunityView);

router.route('/enquiryform').get(distributorEnquiryForm_view);

module.exports = router;
