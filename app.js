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


var db

mongoose.connect('mongodb://ribhu:pass1234@ds044907.mlab.com:44907/intraspect', (err, database) => {
    if (err) return console.log(err)
  db = database
});


require('./config/passport')(passport);

var index = require('./routes/index');
// var homepage = require()
var history = require('./routes/history');
var analytics = require('./routes/analytics');
var preferences = require('./routes/preferences');
var profile = require('./routes/profile');
var settings = require('./routes/settings');
var homepage = require('./routes/homepage');
var signup = require('./routes/signup');
var privacy = require('./routes/privacypolicy');
var terms = require('./routes/termsofservice');


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
app.use(express.cookieParser('bschmokes'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.session({secret:'bschmokes'}));
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
app.use(function(req,res,next){
    req.db = db;
    next();
});

//Page display routes
app.get('/', index.view);
app.get('/history',history.view);
app.get('/analytics',analytics.view);
app.get('/preferences',preferences.view);
app.get('/profile',profile.view);
app.get('/settings',settings.view);
app.get('/homepage',homepage.view);
app.get('/privacypolicy',privacy.view);
app.get('/termsofservice',terms.view);
app.get('/signup', function(req, res) {
        res.render('signup', { message: req.flash('signupMessage') });
    });
app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

app.post('/addact', function(req,res){
    var newActivity = {name:req.body.newAct};
     mongoose.connect('mongodb://ribhu:pass1234@ds044907.mlab.com:44907/intraspect',function (err, database) {
         if (err)
             throw err
         else
         {
         db = database;
         var collection = db.collection('users');
        // console.log(req.body.newAct);
        collection.update({'local.email':req.user.local.email},
                              {$push: {'local.activities' : newActivity}})
                                .then(function(){
                                    res.redirect('/homepage');
                                })
                                .catch(function() {
                                    console.log('Error');
                                });
         }
     });
});

app.post('/addtag',function(req,res){
    var newTag = req.body.newTag;
    mongoose.connect('mongodb://ribhu:pass1234@ds044907.mlab.com:44907/intraspect',function (err, database) {
         if (err)
             throw err
         else
         {
         db = database;
         var collection = db.collection('users');
        // console.log(req.body.newAct);
        collection.update({'local.email':req.user.local.email},
                              {$push: {'local.tags' : newTag}})
                                .then(function(){
                                    res.redirect('/homepage');
                                })
                                .catch(function() {
                                    console.log('Error');
                                });
         }
     });
});

app.post('/addlog',function(req,res){
    var currActivity = req.body.curAct;
    var score = req.body.score;
    var comment = req.body.reason;
    var retrievedAct;
    mongoose.connect('mongodb://ribhu:pass1234@ds044907.mlab.com:44907/intraspect',function (err, database) {
         if (err)
             throw err
         else
         {
         db = database;
         var collection = db.collection('users');
         collection.find({'local.email':req.user.local.email},
          {'local.activities':{$slice : [currActivity,1]}}).toArray(function(err,act){
            if(err)
                throw err
            else{
                retrievedAct = act[0].local.activities[currActivity].name;
                console.log(retrievedAct);
                collection.update({'local.activities.currActivity.name':retrievedAct},
                              {$push: {'local.activities.log' : {
                                comments: comment,
                                score: score,
                                log_time: Date.now()
                              }}})
                                .then(function(){
                                    res.redirect('/history');
                                })
                                .catch(function() {
                                    //console.log(req.user.local.activities[0].name)
                                    console.log('Error');
                                });
         }
     });
            }
          });
        //   if (retrievedAct.length > 0) { printjson (retrievedAct[0]); }
        //   var fakeRetrievedAct = 'Yoga'
        // console.log(req.body.newAct);
});
// Signup and Login routes
app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/preferences', // redirect to the secure preferences section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/homepage', // redirect to the secure preferences section
        failureRedirect : '/', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
    }));

// route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect : '/preferences',
                failureRedirect : '/'
}));

    app.get('/connect/local', function(req, res) {
            res.render('connect-local.ejs', { message: req.flash('loginMessage') });
        });
        app.post('/connect/local', passport.authenticate('local-signup', {
            successRedirect : '/preferences', // redirect to the secure preferences section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
}));

        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/preferences',
                failureRedirect : '/'
}));

        app.get('/unlink/facebook', function(req, res) {
        var user            = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/preferences');
        });
});

//Running the server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Live on port:  ' + app.get('port'));
});



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// sass bullcrap

// var sass = require('node-sass');
// sass.render({
//   file: canine,
//   [, options..]
// }, function(err, result) { /*...*/ });
// // OR
// var result = sass.renderSync({
//   data: scss_content
//   [, options..]
// });



var sass = require('node-sass');
sass.render({
  file: '/css/canine.scss',
}, function(err, result) { /*...*/ });
// OR
// var result = sass.renderSync({
//   file: '/css/canine.css',
// });
