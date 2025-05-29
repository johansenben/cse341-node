const mongoDb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const result = await mongoDb.getDatabase().db().collection("books").find();
        result.toArray().then((books) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(books);
        })
        .catch(error => {
            res.status(500).json(error || "Error getting contacts!");
            return;
        });
    } catch (error) {
        res.status(500).json(error || "Error getting all contacts!");
    }
}

const getSingle = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const _id = new ObjectId(req.params.id);
        const result = await mongoDb.getDatabase().db().collection("books").find({ _id });
        result.toArray().then((books) => {
            if (books.length <= 0) {
                res.status(500).json("Book doesn't exist!");
                return;
            }
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(books[0]);
        })
        .catch(error => {console.log(error || '|')
            res.status(500).json(error || "Error getting a contact!");
            return;
        });
    } catch (error) {
        res.status(500).json(error || "Error getting a contact!");
    }
}

const addBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const { title, author, pageCount, seriesName, bookNumInSeries, starRating } = req.body;
        const result = await mongoDb.getDatabase().db().collection("books").insertOne({
            title, 
            author,
            pageCount,
            seriesName: seriesName ?? "N/A", 
            bookNumInSeries: bookNumInSeries ?? "N/A",
            starRating,
            reviews: []
        });

        if (result.acknowledged) {
            res.status(200).json({
                _id: result.insertedId 
            });
            return;
        }
        res.status(500).json(result.error || "Error adding book!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error adding book!");
    }
}

//for recreating the collection quickly; use rest client, not swagger (swagger autogen doesn't think theres any fields)
const addBooks = async (req, res) => {
    //#swagger.ignore=true
    try {
        const addedIDs = [];
        const books = req.body;
        if (books?.length > 0) {
            for (const book of books) {
                const { title, author, pageCount, seriesName, bookNumInSeries, starRating } = book;
                const result = await mongoDb.getDatabase().db().collection("books").insertOne({
                    title, 
                    author,
                    pageCount,
                    seriesName: seriesName ?? "N/A", 
                    bookNumInSeries: bookNumInSeries ?? "N/A", 
                    starRating,
                    reviews: []
                });

                if (result.acknowledged) {
                    addedIDs.push(result.insertedId);
                    return;
                }
                res.status(500).json(result.error || "Error adding books!");
                return;
            };
            if (addedIDs.length > 0) {
                res.status(200).json(addedIDs);
                return;
            }
            res.status(500).json("Error adding books!");
            return;
        }
    } catch (error) {
        res.status(500).json(error || "Error adding books!");
    }
}

const updateBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const _id = new ObjectId(req.params.id);
        const { title, author, pageCount, seriesName, bookNumInSeries, starRating, reviews } = req.body;
        const result = await mongoDb.getDatabase().db().collection("books").replaceOne({ _id }, 
        {
            title, 
            author,
            pageCount,
            seriesName: seriesName ?? "N/A", 
            bookNumInSeries: bookNumInSeries ?? "N/A", 
            starRating,
            reviews: reviews || []
        });
        if (result.modifiedCount > 0) {
            res.status(204).send();
            return;
        }
        res.status(500).json(result.error || "Error updating book!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error updating book!");
    }

}

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const _id = new ObjectId(req.params.id);
        const result = await mongoDb.getDatabase().db().collection("books").deleteOne({ _id });
        if (result.deletedCount > 0) {
            res.status(204).send();
            return;
        }
        res.status(500).json(result.error || "Error deleting book!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error deleting book!");
    }
}

const deleteAllBooks = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        const _id = new ObjectId(req.params.id);
        const result = await mongoDb.getDatabase().db().collection("books").deleteMany({});
        if (result.deletedCount > 0) {
            res.status(204).send();
            return;
        } 
        res.status(500).json(result.error || "Error deleting books!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error deleting books!");
    }
}


const addReview = async (req, res) => {
    //#swagger.tags=['Books-Review']
    try {
        const _id = new ObjectId(req.params.id);
        const { reviewerName, reviewerID, review, stars } = req.body;
        const result = await mongoDb.getDatabase().db().collection("books").updateOne(
            { _id }, 
            {
                $push: {
                    reviews: { reviewerName, reviewerID, review, stars }
                }
            }
        );
        if (result.modifiedCount > 0) {
            res.status(204).send();
            return;
        } 
        res.status(500).json(result.error || "Error adding review!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error adding review!");
    }
}

const deleteReviews = async (req, res) => {
    //#swagger.tags=['Books-Review']
    try {
        const _id = new ObjectId(req.params.id);
        const result = await mongoDb.getDatabase().db().collection("books").updateOne(
            { _id }, 
            {
                $set: {
                    reviews: []
                }
            }
        );
        if (result.modifiedCount > 0) {
            res.status(204).send();
            return;
        } 
        res.status(500).json(result.error || "Error deleting reviews!");
        return;
    } catch (error) {
        res.status(500).json(error || "Error deleting reviews!");
    }
}

module.exports = { getAll, getSingle, addBook, addBooks, updateBook, addReview, deleteBook, deleteAllBooks, deleteReviews };