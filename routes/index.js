const router = require("express").Router();

router.use("/", require("./swagger"));

router.use("/contacts", require("./contacts"));

module.exports = router;