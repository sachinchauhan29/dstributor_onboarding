const express = require('express');
const upload = require('../../config/multerConfig');
const { prospective_distributorView, addDistriubutorView,addDistriubutor } = require('../../controllers/invite_distributor.controller');
const router = express.Router();


router.route('/').get(prospective_distributorView);
router.route('/addDistributor').get(addDistriubutorView).post(upload.single("images"),addDistriubutor);
module.exports = router;
