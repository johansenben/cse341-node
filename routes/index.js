const router = require("express").Router();

router.use("/", require("./swagger"));

router.use("/books", require("./books"));
router.use("/reviewers", require("./reviewers"));

module.exports = router;