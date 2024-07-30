const express = require('express');

const roleManagmentcontrollers = require('../../controllers/role_management.controller');

const router = express.Router();


router.route('/').get(roleManagmentcontrollers.roleManagmentView);
router.route('/createrole').get(roleManagmentcontrollers.createrole).post(roleManagmentcontrollers.insertrole);
router.route('/editrole').get(roleManagmentcontrollers.vieweditrole).post(roleManagmentcontrollers.editrole);
router.route('/delete').get(roleManagmentcontrollers.deleteview)
module.exports = router;
