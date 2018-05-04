/*--- APP INIT ---*/

// app requirements
const express = require("express"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    Strategy = require("passport-twitter").Strategy,
    expressSession = require("express-session");

// init app
const app = express();

// set ejs template module
app.set("view engine", "ejs");

// setting up public directory
app.use(express.static(__dirname + "/public"));

// adding body-parser for retrieving post data from forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// setup routes
const twitterRoutes = require("./routes/twitter"),
    indexRoutes = require("./routes/index");

// use sessions, secrest is used to encrypt data
app.use(expressSession({
    secret: "This is my secret password!",
    resave: false,
    saveUninitialized: false
}));

// use passport authentication
app.use(passport.initialize());
app.use(passport.session());

// set passport Twitter strategy
passport.use(new Strategy({
    consumerKey: 'aFl1jCx4pLbVddJGNkpjVMCUj',
    consumerSecret: 'aAdkA86tfRDUhzr2e6tos5QIh1KBakOzU87VURNOiazpJa40Mm',
    callbackURL: 'http://localhost:3000/twitter/return'
}, (token, tokenSecret, profile, callback) => {
    return callback(null, {
        accessToken: token,
        accessSecret: tokenSecret,
        data: profile
    });
}));

// reading, encoding, decoding sessions
passport.serializeUser((user, callback) => { callback(null, user) });
passport.deserializeUser((obj, callback) => { callback(null, obj) });


/*--- ROUTES ---*/
app.use("/", indexRoutes);
app.use("/twitter", twitterRoutes);


/*--- SERVER INIT ---*/
app.listen(3000, () => {
    console.log("Twitter-Client App has started on port 3000!");
});