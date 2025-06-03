const router = require("express").Router();

router.use("/", require("./swagger"));

router.use("/books", require("./books"));
router.use("/reviews", require("./reviews"));
router.use("/oauth", require("./oauth"));
//router.use("/users", require("./users"));

module.exports = router;