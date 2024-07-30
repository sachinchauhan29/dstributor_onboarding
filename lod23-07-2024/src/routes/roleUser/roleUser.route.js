const express = require('express');

const {roleUserView1,roleUserView2,roleUserView3,roleUserView4,roleUserView5,roleUserView6,roleUserView7,roleUserView8,roleUserView9, roleUserInsert1,roleUserInsert2,roleUserInsert3,roleUserInsert4,roleUserInsert5,roleUserInsert6,roleUserInsert7,roleUserInsert8,roleUserInsert9} = require('../../controllers/roleUser.controller');
const router = express.Router();


router.route('/role1').get(roleUserView1).post(roleUserInsert1);
router.route('/role2').get(roleUserView2).post(roleUserInsert2);
router.route('/role3').get(roleUserView3).post(roleUserInsert3);
router.route('/role4').get(roleUserView4).post(roleUserInsert4);
router.route('/role5').get(roleUserView5).post(roleUserInsert5);
router.route('/role6').get(roleUserView6).post(roleUserInsert6);
router.route('/role7').get(roleUserView7).post(roleUserInsert7);
router.route('/role8').get(roleUserView8).post(roleUserInsert8);
router.route('/role9').get(roleUserView9).post(roleUserInsert9);
// router.route('/role10').get(roleUserView10).post(roleUserInsert);


module.exports = router;
