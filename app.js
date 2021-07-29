const http = require("http");
var express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require ('./config/config.json');
// var logger = require('morgan');

const app = express();
const server = http.createServer(app)

const checkAuth = require('./checkAuth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/Users');
const apiUsersRouter = require('./routes/api/users')
const apiRecipesRouter = require('./routes/api/recipes')
const apiFavoritesRouter = require('./routes/api/favorites')



// app.use(logger('dev'));
app.use(express.static('./public'))
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
app.use('/api/v1/users' , checkAuth, apiUsersRouter)
app.use('/api/v1/recipes' , checkAuth, apiRecipesRouter)
app.use('/api/v1/favorites' , checkAuth, apiFavoritesRouter)

server.listen(3000, '127.0.0.1', () => {
    console.log('Server Listening on http://127.0.0.1:3000')
    
})
