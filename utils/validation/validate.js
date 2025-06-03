const { validationResult } = require('express-validator')

const checkValidation = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array().map(val => `${val.path} : ${val.msg}`) })
    }
    next();
}

const requireSignIn = async (req, res, next) => {
    const id = req.session.passport?.user?.id;
    const username = req.session.passport?.user?.username;
    if (id && username)
        next();
    else
        res.status(500).json('User needs to sign in to github! Use route: "/oauth/login\"');
}

module.exports = { checkValidation, requireSignIn };