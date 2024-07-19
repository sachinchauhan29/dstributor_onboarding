const express = require('express');

const accountroute = require("../routes/account/account.route.js");
const inviteroute = require("./invite_distributor/invite.route.js");
const prospectivebuisnessroute = require("./invite_form/prospective_buisness.route.js");
// const prospectiveadditionalroute = require("./invite_form/prospective_additional.route.js");
const scoutingsheetroute = require("./scouting_sheet/scouting_sheet.route.js");
const opportunityroute = require("../routes/opportunity/opportunity.route.js");
const approversindexroute = require("../routes/approvers/approvers.route.js");
const application_completedroute = require("../routes/application_completed/completed.route.js");
const application_doc_capture_route = require("../routes/application_doc_capture/doc_capture.route.js");
const application_rejected = require("../routes/application_rejected/rejected.route.js");
const application_underreview = require("../routes/application_under_review/under_review.route.js");
const distributor_listroute = require("../routes/distributor_list/distributor_list.route.js");
const role_managment_route = require("../routes/role_management/role_managment.route.js");
const territory_managment_route = require("../routes/territory_management/territory_management.route.js");
const user_managment_route = require("../routes/user_management/user_managament.route.js");
const login_role_route  = require("../routes/login_role/loginRoleUser.route.js");
const welcome_route  = require("../routes/welcome/welcome.route.js");
const userRoleroute  = require("../routes/roleUser/roleUser.route.js");
const thankyouroute  = require("../routes/thanku/thanku.route.js");
const doc_correctionroute  = require("../routes/doc_correction/doc_correction.route.js");
const loginroute = require("../routes/login/login.route.js")
const router = express.Router();

const routes=[
    {
        path: '/',
        route: loginroute
    },
    {
        path: '/dashboard',
        route: accountroute
    },
    {
        path: '/invite',
        route: inviteroute
    },
    {
        path: '/prospective_buisnessform',
        route: prospectivebuisnessroute
    },
    // {
    //     path: '/prospective_additionalform',
    //     route: prospectiveadditionalroute
    // },
    {
        path: '/scoutingsheet',
        route: scoutingsheetroute 
    },
    {
        path: '/opportunity',
        route: opportunityroute 
    },
    {
        path: '/approvers',
        route: approversindexroute 
    },
    {
        path: '/application_completed',
        route: application_completedroute 
    },
    {
        path: '/application_doccpature',
        route: application_doc_capture_route 
    },
    {
        path: '/application_rejected',
        route: application_rejected 
    },
    {
        path: '/application_underreview',
        route: application_underreview 
    },
    {
        path: '/distributor_list',
        route:  distributor_listroute
    },
    {
        path: '/role_managment',
        route:  role_managment_route
    },
    {
        path: '/territory_managment',
        route:  territory_managment_route
    },
    {
        path: '/user_management',
        route:  user_managment_route
    },
    {
        path: '/login_role',
        route:  login_role_route
    },
    {
        path: '/welcome',
        route:  welcome_route
    },
    {
        path: '/userrole',
        route:  userRoleroute
    },
    {
        path: '/thankyou',
        route:  thankyouroute
    },
    {
        path: '/doc_correction',
        route:  doc_correctionroute
    }
]
routes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
