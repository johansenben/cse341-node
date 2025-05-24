const { body, check } = require("express-validator");

const addBookReq = [
    check("title").isString().isLength({min: 1}),
    check("author").isString().isLength({min: 1}),
    check("pageCount").isInt({min: 1}),
    check("seriesName").optional({nullable: true}).isString(),
    check("bookNumInSeries").optional({nullable: true}).isInt({min: 1}),
    check("starRating").isFloat({min: 1, max: 5})
];

const addBooksReq = [
    body().isArray(),
    body("*.title").isString().isLength({min: 1}),
    body("*.author").isString().isLength({min: 1}),
    body("*.pageCount").isInt({min: 1}),
    body("*.seriesName").optional({nullable: true}).isString(),
    body("*.bookNumInSeries").optional({nullable: true}).isInt({min: 1}),
    body("*.starRating").isFloat({min: 1, max: 5})
]

const updateBookReq = [
    ...addBookReq
]

const addReviewReq = [
    check("reviewerName").isString().isLength({min: 1}),
    check("reviewerID").isString().isLength({min: 1}),
    check("review").isString().isLength({min: 1}),
    check("stars").isInt({min: 1, max: 5})
]

const updateReviewReq = [
    ...addReviewReq
]

module.exports = { addBookReq, addBooksReq, updateBookReq, addReviewReq, updateReviewReq };