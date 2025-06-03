const router = require("express").Router();
const reviewsController = require("../controllers/reviews");
const { checkValidation, requireSignIn } = require("../utils/validation/validate");
const { addReviewReq, updateReviewReq } = require("../utils/validation/reviews");

router.get("/", reviewsController.getAll);
router.get("/:id", reviewsController.getSingle);

router.post("/add/:bookID", requireSignIn, addReviewReq, checkValidation, reviewsController.addReview)

router.put("/update/:id", requireSignIn, reviewsController.userCreatedReview, updateReviewReq, checkValidation, reviewsController.updateReview);

router.delete("/delete/:id", requireSignIn, reviewsController.userCreatedReview, reviewsController.deleteReview);

module.exports = router;