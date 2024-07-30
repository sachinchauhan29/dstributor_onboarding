const express = require('express');

const { distributorlist_view } = require('../../controllers/distributor_list.controller');

const router = express.Router();


router.route('/').get(distributorlist_view);

module.exports = router;
