const { validationResult } = require('express-validator')

const checkValidation = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array().map(val => `${val.path} : ${val.msg}`) })
    }
    next();
}

module.exports = { checkValidation };