const { param, body, check } = require("express-validator");
const mongoDb = require("../../data/database");
const ObjectId = require("mongodb").ObjectId;

const bookIDExists = async (id) => {
    const result = await mongoDb.getDatabase().db().collection("books").find({ _id: new ObjectId(id) });
    const bookCount = (await (result.toArray())).length;
    return bookCount > 0;
}

const addReviewReq = [
    check("review").isString().isLength({min: 1}),
    check("stars").isFloat({min: 1, max: 5}),
    param("bookID").isString().custom(async (id) => {
        if (!(await bookIDExists(id)))
            return Promise.reject("Book ID doesn't exist!")
    })
];

const updateReviewReq = [
    check("review").isString().isLength({min: 1}),
    check("stars").isFloat({min: 1, max: 5})
]

module.exports = { addReviewReq, updateReviewReq };