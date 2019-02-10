const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const routes = require('./routes');
const setupPassport = require('./setuppassport');

const app = express();

// connect to database
mongoose.connect(process.env.MONGODB_URI,   { useNewUrlParser: true });
setupPassport();
mongoose.set('useCreateIndex', true);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(session({
  secret: "You will never guess",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port " + (process.env.PORT || 3000));
});
