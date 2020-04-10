var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var template = require('art-template');		//模板引擎
var bodyParser = require('body-parser');
var session = require('express-session');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var compileRouter = require("./routes/compile");
// var usersRouter = require('./routes/users');
// var signupRouter = require('./routes/signup');
// var logoutRouter = require('./routes/logout');

// var ServerConf=require("./ServerConf");
// process.env.PORT=ServerConf.ServicePort;
var app = express();
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.engine('html',require('express-art-template'));
// app.set('views', './public');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({     									
	name:'connect.sid', 														
	cookie:{maxAge:600000},
	secret:'keyboard cat',
	resave:false,
	saveUninitialized:true
}));


app.use('/*',function (req, res, next) {
    var url = req.originalUrl;
    if (url != "/login" && !req.session.user) {
         return res.redirect('/login');
    }
    next();
});
app.use(express.static(path.join(__dirname, 'views')));
app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/compile', compileRouter); 
// app.use('/signup',signupRouter);
// app.use('/logout',logoutRouter);
// app.use('/users', usersRouter);

module.exports = app; 

app.listen(3000,function(){
    console.log('running...');
});