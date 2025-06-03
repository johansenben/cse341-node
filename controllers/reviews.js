const mongoDb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Reviews']
    try {
        const result = await mongoDb.getDatabase().db().collection("reviews").find();
        result.toArray().then((reviews) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(reviews);
        })
        .catch(error => {
            res.status(500).json(error || "Error getting all reviews!");
            return;
        });
    } catch (error) {
        res.status(500).json(error || "Error getting all reviews!");
    }
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Reviews']
    try {
    const _id = new ObjectId(req.params.id);
    const result = await mongoDb.getDatabase().db().collection("reviews").find({ _id });
    result.toArray().then((reviews) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(reviews[0]);
    })
    .catch(error => {
        res.status(500).json(error || "Error getting a review!");
        return;
    });
    } catch (error) {
        res.status(500).json(error || "Error getting a review!");
    }
}

const addReview = async (req, res) => {
    //#swagger.tags=['Reviews']
    try {
        const { stars, review } = req.body;
        const { id, username} = req.session.passport.user;
        const result = await mongoDb.getDatabase().db().collection("reviews").insertOne({
            review, 
            stars,
            username,
            githubID: id,
            bookID: new ObjectId(req.params.bookID)
        });

        if (result.acknowledged) {
            res.status(200).json({
                _id: result.insertedId 
            });
            return;
        }
        res.status(500).json(result.error || "Error adding review!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error adding review!");
    }
}

const userCreatedReview = async (req, res, next) => {
    try {
        const _id = new ObjectId(req.params.id);
        const githubID = req.session.passport?.user?.id;
        const username = req.session.passport?.user?.username;
        const result = await mongoDb.getDatabase().db().collection("reviews").find({ _id });
        const reviews = await (result.toArray());
        if (reviews.length > 0) {
            const review = reviews[0];
            if (review.username == username && review.githubID == githubID) {
                next();
                return;
            }
        }
    } catch (error) {}
    res.status(500).json("Current user didn't create this review!");
}

const updateReview = async (req, res) => {
    //#swagger.tags=['Reviews']
    try {
        const _id = new ObjectId(req.params.id);
        const { review, stars } = req.body;
        const result = await mongoDb.getDatabase().db().collection("reviews").updateMany({ _id }, 
            {
                $set: {
                    review,
                    stars
                }
            }
        );
        if (result.modifiedCount > 0) {
            res.status(204).send();
            return;
        }
        res.status(500).json(result.error || "Error updating review!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error updating review!");
    }
}

const deleteReview = async (req, res) => {
    //#swagger.tags=['Reviews']
    try {
        const _id = new ObjectId(req.params.id);
        const result = await mongoDb.getDatabase().db().collection("reviews").deleteOne({ _id });
        if (result.deletedCount > 0) {
            res.status(204).send();
            return;
        }
        res.status(500).json(result.error || "Error deleting review!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error deleting review!");
    }
}

module.exports = { getAll, getSingle, addReview, userCreatedReview, updateReview, deleteReview }