const router = require("express").Router();
const passport = require('passport');
require("dotenv").config();
const path = require('path');
const oauthController = require("../controllers/oauth");

router.get("/", 
    //#swagger.ignore=true
    passport.authenticate('github', { scope: [ 'user:email' ], prompt: 'login' }));
router.get("/login", (req,res) => {
    //#swagger.tags=["Oauth"]
    //#swagger.summary="Doesn't work in swagger; Use the search bar in your browser."
    res.sendFile(path.join(__dirname, '../public', 'oauth/login.html'));
});

router.get("/callback", passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    //#swagger.ignore=true
    res.redirect("/api-docs");
});

router.get('/logout', 
    //#swagger.tags=["Oauth"]
    oauthController.logout);




module.exports = router;