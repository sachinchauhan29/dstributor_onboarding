const express = require('express');

const approversindox = require('../../controllers/approvers_indox.controllers');

const router = express.Router();


router.route('/').get(approversindox.aprroversindoxView);
router.route('/view').get(approversindox.aprroverViewpage);

router.route('/approvalform/role1').get(approversindox.roleUserView1).post(approversindox.roleUserInsert1);
// router.route('/role2').get(roleUserView2).post(roleUserInsert2);
// router.route('/role3').get(roleUserView3).post(roleUserInsert3);
// router.route('/role4').get(roleUserView4).post(roleUserInsert4);
// router.route('/role5').get(roleUserView5).post(roleUserInsert5);
// router.route('/role6').get(roleUserView6).post(roleUserInsert6);
// router.route('/role7').get(roleUserView7).post(roleUserInsert7);
// router.route('/role8').get(roleUserView8).post(roleUserInsert8);
// router.route('/role9').get(roleUserView9).post(roleUserInsert9);


module.exports = router;
