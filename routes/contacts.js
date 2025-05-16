const router = require("express").Router();
const contactsController = require("../controllers/contacts");

router.get("/", contactsController.getAll);

router.get("/:id", contactsController.getSingle);

router.post("/add", contactsController.addContact);

router.put("/update", contactsController.updateContact);

router.delete("/delete", contactsController.deleteContact);


module.exports = router;