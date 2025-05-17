const router = require("express").Router();
const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/add", contactsController.addContact);

router.put("/update/:id", contactsController.updateContact);

router.delete("/delete/:id", contactsController.deleteContact);


module.exports = router;