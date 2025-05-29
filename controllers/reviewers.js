const mongoDb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Reviewers']
    try {
        const result = await mongoDb.getDatabase().db().collection("reviewers").find();
        result.toArray().then((reviewers) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(reviewers);
        })
        .catch(error => {
            res.status(500).json(error || "Error getting all reviewers!");
            return;
        });
    } catch (error) {
        res.status(500).json(error || "Error getting all reviewers!");
    }
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Reviewers']
    try {
    const _id = new ObjectId(req.params.id);
    const result = await mongoDb.getDatabase().db().collection("reviewers").find({ _id });
    result.toArray().then((reviewers) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(reviewers[0]);
    })
    .catch(error => {
        res.status(500).json(error || "Error getting a reviewer!");
        return;
    });
    } catch (error) {
        res.status(500).json(error || "Error getting a reviewer!");
    }
}

const addReviewer = async (req, res) => {
    //#swagger.tags=['Reviewers']
    try {
        const { firstName, lastName } = req.body;
        const result = await mongoDb.getDatabase().db().collection("reviewers").insertOne({
            firstName,
            lastName
        });

        if (result.acknowledged) {
            res.status(200).json({
                _id: result.insertedId 
            });
            return;
        }
        res.status(500).json(result.error || "Error adding reviewer!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error adding reviewer!");
    }
}

const updateReviewer = async (req, res) => {
    //#swagger.tags=['Reviewers']
    try {
        const _id = new ObjectId(req.params.id);
        const { firstName, lastName } = req.body;
        const result = await mongoDb.getDatabase().db().collection("reviewers").replaceOne({ _id }, 
        {
            firstName,
            lastName
        });
        if (result.modifiedCount > 0) {
            res.status(204).send();
            return;
        }
        res.status(500).json(result.error || "Error updating reviewer!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error updating reviewer!");
    }

}

const deleteReviewer = async (req, res) => {
    //#swagger.tags=['Reviewers']
    try {
        const _id = new ObjectId(req.params.id);
        const result = await mongoDb.getDatabase().db().collection("reviewers").deleteOne({ _id });
        if (result.deletedCount > 0) {
            res.status(204).send();
            return;
        }
        res.status(500).json(result.error || "Error deleting reviewer!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error deleting reviewer!");
    }
}

module.exports = { getAll, getSingle, addReviewer, updateReviewer, deleteReviewer };