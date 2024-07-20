
const { selectUsers, saveUser } = require("../models/scoutingsheet/scoutingsheet.model");

const scoutingsheetview = async (req, res) => {
    res.render('scouting_sheet', { message: req.session.message, success: req.session.success, averagescoremsg: req.session.averagescoremsg, });
    req.session.destroy(); // Destroy session after rendering the view
};

const addNewUser = async (req, res) => {
    console.log("hello.............................................................", req.body);

    let selectUser = await selectUsers(req.body);
    if (req.body.averageScore <= 3) {
        console.log("1.............................................................", req.body.averageScore);
        req.session.averagescoremsg = 'Average Score is not good';
    } else if (selectUser.length === 0) {
        console.log("2.............................................................",);
        await saveUser(req.body);
        req.session.success = 'User added successfully';
    } else {
        console.log("3.............................................................",);
        req.session.message = 'Email Already Exists';
    }
    res.redirect("/scoutingsheet");
};

module.exports = { scoutingsheetview, addNewUser };
