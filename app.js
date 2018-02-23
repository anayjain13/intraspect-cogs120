/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var methodOverride = require('method-override')

var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/users');


require('./config/passport')(passport);

var index = require('./routes/index');
// var homepage = require()
var history = require('./routes/history');
var analytics = require('./routes/analytics');
var profile = require('./routes/profile');
var settings = require('./routes/settings');
var homepage = require('./routes/homepage');
var signup = require('./routes/signup');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.session());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// required for passport
app.use(session({ 
	secret: 'intraspectisprettyusefultbh' , // session secret
	resave: true,
    	saveUninitialized: true
	})); 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//Page display routes
app.get('/', index.view);
app.get('/history',history.view);
app.get('/analytics',analytics.view);
app.get('/profile',profile.view);
app.get('/settings',settings.view);
app.get('/homepage',homepage.view);
app.get('/signup', function(req, res) {
        res.render('signup', { message: req.flash('signupMessage') });
    });
app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// Signup and Login routes
app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

// route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { 
      scope : ['public_profile', 'email']
    }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

//Running the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}