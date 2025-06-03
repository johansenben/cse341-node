const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongodb = require("./data/database");
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;


const port = process.env.PORT || 3000;
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_OAUTH_CALLBACK
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, {
        id: profile.id,
        username: profile.username
    });
  }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, PUT, POST, DELETE, OPTIONS"
    );
    next();
});

app.use('/', require("./routes"));

mongodb.initDb((error) => {
    if (error) {
        console.error(error);
        return;
    }
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});

