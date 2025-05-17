const mongoDb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    const result = await mongoDb.getDatabase().db().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    const userId = new ObjectId(req.params.id);
    const result = await mongoDb.getDatabase().db().collection("contacts").find({ _id: userId });
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });
}

const addContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const result = await mongoDb.getDatabase().db().collection("contacts").insertOne({
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    });

    if (result.acknowledged) {
        res.status(200).json({
            _id: result.insertedId 
        });
    } else {
        res.status(500).json(result.error || "Error adding contact!");
    }
    
}

const updateContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const _id = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const result = await mongoDb.getDatabase().db().collection("contacts").replaceOne({ _id }, {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday
    });
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Error updating contact!");
    }

}

const deleteContact = async (req, res) => {
    //#swagger.tags=['Contacts']
    const _id = new ObjectId(req.params.id);
    const result = await mongoDb.getDatabase().db().collection("contacts").deleteOne({ _id });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Error deleting contact!");
    }

}

module.exports = { getAll, getSingle, addContact, updateContact, deleteContact };