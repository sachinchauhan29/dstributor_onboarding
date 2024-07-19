const express = require("express");
const session = require('express-session');
const fileUpload = require('express-fileupload');

const path = require('path');
const app = express();

const cookieParser = require('cookie-parser');
const logger = require("morgan");
// const upload = require('././');


const multer = require('multer');
const fs = require('fs');
const adminRoute = require("./src/routes");
const port = process.env.PORT;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); 
  }
});


app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(fileUpload());

// app.use((req, res, next) => {
//     res.locals.alert = req.session.alert || null;
//     next();
// });

app.use((req, res, next) => {
  res.locals.alert = req.session.alert;
  req.session.alert = null; 
  next();
});


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'src/views'));


app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src/public")));

app.use('/public', express.static(__dirname + '/src/public'));


app.use('/', adminRoute);

app.listen(3001, () => {
  console.log(`listening on port 3001`);
});