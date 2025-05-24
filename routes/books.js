const router = require("express").Router();
const booksController = require("../controllers/books");
const { addBookReq, addBooksReq, updateBookReq, addReviewReq } = require("../utils/validation/books");
const { checkValidation } = require("../utils/validation/validate");

router.get("/", booksController.getAll);

router.get("/:id", booksController.getSingle);

router.post("/add", addBookReq, checkValidation, booksController.addBook);
router.post("/add-many", addBooksReq, checkValidation, booksController.addBooks);

router.put("/update/:id", updateBookReq, checkValidation, booksController.updateBook);

router.delete("/delete/:id", booksController.deleteBook);
router.delete("/delete-all", booksController.deleteAllBooks);


router.post("/add-review/:id", addReviewReq, checkValidation, booksController.addReview);

router.delete("/delete-reviews/:id", booksController.deleteReviews)

/**
 * todo
 * -routes:
 *      delete-review
 *      update-review
 *      get-review
 *      get-all-reviews
 * 
 * -move reviews to separate collection
 */

module.exports = router;