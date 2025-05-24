const { body, check } = require("express-validator");

const addReviewerReq = [
    check("firstName").isString().isLength({min: 1}),
    check("lastName").isString().isLength({min: 1}),
];

const updateReviewerReq = [
    ...addReviewerReq
]

module.exports = { addReviewerReq, updateReviewerReq };