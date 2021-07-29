var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
// var logger = require('morgan');

const checkAuth = require('./checkAuth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// const apiPatientsRouter = require('./routes/api/patients')
// const apiDoctorsRouter = require('./routes/api/doctors')
// const apiAppointmentsRouter = require('./routes/api/appointments')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(
//     session({
//       secret: 'secret', // used to sign the cookie
//       resave: false, // update session even w/ no changes
//       saveUninitialized: true, // always create a session
//       cookie: {
//         secure: false, // true: only accept https req's
//         maxAge: 2592000, // time in seconds
//       }
    // })
//   );
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/api/v1/patients' , checkAuth, apiPatientsRouter)
// app.use('/api/v1/doctors' , checkAuth, apiDoctorsRouter)
// app.use('/api/v1/appointments' ,checkAuth, apiAppointmentsRouter)

module.exports = app;
