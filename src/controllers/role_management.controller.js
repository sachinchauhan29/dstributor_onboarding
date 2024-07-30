const { selectUsers, saveUser, rolemanagmentresult, navbarviewesult, editroleviewviewesult, updaterole, deleteRole } = require("../models/role_management/role_management.model");

const roleManagmentView = async (req, res) => {
    let navbarview = await navbarviewesult(req, res, req.query);
    let roleManagment = await rolemanagmentresult(req, res, req.query);
    //console.log(navbarview, "navbarview");
    res.render('role_management/role_management', { roleManagment: roleManagment, message: req.session.message, success: req.session.success, error: req.session.error, token: navbarview });
    req.session.destroy();
};


const createrole = async (req, res) => {
    let navbarview = await navbarviewesult(req, res, req.query);
    res.render('role_management/createrole', { message: req.session.message, success: req.session.success, error: req.session.error, token: navbarview });
    req.session.destroy();
}


const vieweditrole = async (req, res) => {

    let navbarview = await navbarviewesult(req, res, req.query);
    const emailrole = req.query.role;
    let editroleview = await editroleviewviewesult(req, res, emailrole);
    res.render('role_management/editrole', { role: emailrole, editroleview: editroleview, message: req.session.message, success: req.session.success, token: navbarview });
};

const editrole = async (req, res) => {
    try {
        await updaterole(req.body);

        req.session.success = 'Role updated successfully';
        res.redirect('/role_managment');
    } catch (error) {
        req.session.error = 'Failed to update role';
        res.redirect('/role_managment');
    }
};

const insertrole = async (req, res) => {

    let selectUser = await selectUsers(req.body);
    if (selectUser.length === 0) {
        await saveUser(req.body);
        req.session.success = 'User Role Create successfully';
    } else {
        req.session.message = 'Role Already Exists';
    }
    res.redirect("/role_managment")
}


const deleteview = async (req, res) => {
    try {
        const role = req.query.role;
        //console.log(email, 'email sachin');
        if (!role) {
            req.session.error = 'Role is required';
            return res.redirect('/role_managment');
        }
        await deleteRole(role);
        req.session.success = 'Role deleted successfully';
    } catch (error) {
        req.session.error = 'Failed to delete role';
    }
    res.redirect('/role_management');
};
module.exports = { roleManagmentView, createrole, insertrole, editrole, vieweditrole, deleteview };
