// controllers/checkPermission.controller.js

const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        const token = req.cookies.token; // or req.session.token

        if (!token || token[requiredPermission] !== '1') {
            return res.redirect('/page404'); // Redirect to a custom 404 page
        }

        next();
    };
};



module.exports = { checkPermission };
