const mongoDb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Reviewers']
    const result = await mongoDb.getDatabase().db().collection("reviewers").find();
    result.toArray().then((reviewers) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(reviewers);
    });
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Reviewers']
    const _id = new ObjectId(req.params.id);
    const result = await mongoDb.getDatabase().db().collection("reviewers").find({ _id });
    result.toArray().then((reviewers) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(reviewers[0]);
    });
}

const addReviewer = async (req, res) => {
    //#swagger.tags=['Reviewers']
    const { firstName, lastName } = req.body;
    const result = await mongoDb.getDatabase().db().collection("reviewers").insertOne({
        firstName,
        lastName
    });

    if (result.acknowledged) {
        res.status(200).json({
            _id: result.insertedId 
        });
    } else {
        res.status(500).json(result.error || "Error adding reviewer!");
    }
}

const updateReviewer = async (req, res) => {
    //#swagger.tags=['Reviewers']
    const _id = new ObjectId(req.params.id);
    const { firstName, lastName } = req.body;
    const result = await mongoDb.getDatabase().db().collection("reviewers").replaceOne({ _id }, 
    {
        firstName,
        lastName
    });
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Error updating reviewer!");
    }

}

const deleteReviewer = async (req, res) => {
    //#swagger.tags=['Reviewers']
    const _id = new ObjectId(req.params.id);
    const result = await mongoDb.getDatabase().db().collection("reviewers").deleteOne({ _id });
    if (result.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || "Error deleting reviewer!");
    }

}

module.exports = { getAll, getSingle, addReviewer, updateReviewer, deleteReviewer };