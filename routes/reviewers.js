const router = require("express").Router();
const reviewersController = require("../controllers/reviewers");
const { addReviewerReq, updateReviewerReq } = require("../utils/validation/reviewers");
const { checkValidation } = require("../utils/validation/validate");

router.get("/", reviewersController.getAll);

router.get("/:id", reviewersController.getSingle);

router.post("/add", addReviewerReq, checkValidation, reviewersController.addReviewer);

router.put("/update/:id", updateReviewerReq, checkValidation, reviewersController.updateReviewer);

router.delete("/delete/:id", reviewersController.deleteReviewer);


module.exports = router;