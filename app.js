var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
const session = require('express-session');

require('dotenv').config();


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session Setup
app.use(session({
  secret: "dvasydcaskdhayudaspsdhbadh 78q0tep;wobdalstd9asduahssgdfiaus898pydhabsa vuidfa8dtyhasiovd",
  resave: true,
  rolling: true,
  saveUninitialized: false,
  name: "Invoice App Session: uuid1"
}));

//Database Connection
let connection_url = process.env['DB_CONNECTION_URL_' + process.env.APP_EXEC_MODE];
mongoose.connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true } ,(err)=>{
  if(err)
    console.log(err);
  else
    console.log("Connected Successfully");
});

// app.use('/', require('./routes/managers'));
// app.use('/', require('./routes/products'));

//Locals Setup
app.use((req, res, next)=>{
  res.locals.userName = req.session.userName;
  res.locals.email = req.session.email;
  res.locals.sideBarItems = req.session.sideBarItems;
  next();
})

//Routes Imported Here
require('./routes/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
