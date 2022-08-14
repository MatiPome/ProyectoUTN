var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




require('dotenv').config();
var session = require('express-session');
var fileUpload = require('express-fileupload');




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var contactusRouter = require('./routes/contactus');
var adminRouter = require('./routes/admin/news')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '12w45qe1qw4q1eq54eq5',
  resave: false,
  saveUninitialized: true 
}));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp'
}));

secured = async (req,res,next) => {
  try {
    console.log(req.session.id_name);
    if (req.session.id_name){
      next();
    }
    else{
      res.redirect('/admin/login')
    }
  }
  catch (error){
    console.log(error)
  }
}


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin/login', loginRouter);
app.use('/contactus', contactusRouter);
app.use('/admin/news',secured, adminRouter);





// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('contact.js', function (req, res) {
  res.sendFile(__dirname + '/models/contact.js')
})

module.exports = app;
