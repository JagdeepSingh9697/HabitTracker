// require express
const express = require('express');
const port = 8000;
const application = express();

const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');

// require connect-flash
const flash = require('connect-flash');
const flashMiddleware = require('./config/flashMiddleware');

// used for session cookies
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport_local');

const MongoStore = require('connect-mongo');

// layouts for ejs
application.use(expressLayouts);
application.use(bodyParser.urlencoded({extended:false}));

// set up the view engine
application.set('view engine', 'ejs');
application.set('views', './views');
application.use(express.static('./assets')); 

//mongo store is used to store the session cookie
application.use(session({
    name: 'habitTracker',
    secret: "12345",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb+srv://jaggi761:jaggi761@cluster0.bemmqnx.mongodb.net/habit-tracker?retryWrites=true&w=majority',
            autoRemover : 'disabled'
        },
        function(err){
            console.log("Error in the mongo-store");
        }
    ),
}));

// Using passport
application.use(passport.initialize());
application.use(passport.session());
application.use(passport.setAuthenticatedUser);

// flash middleware
application.use(flash());
application.use(flashMiddleware.setFlash);

// use express router
application.use('/', require('./routes'));

// directing the application in the given port
application.listen(port, function(err) {
    if(err) {
        console.log('Error', err);
        return;
    }
    console.log('Server is up and running on port: ', port);

});