const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongodb = require("./data/database");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept, Z-Key"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, PUT, POST, DELETE, OPTIONS"
    );
    next();
});

app.use('/', require("./routes"));

mongodb.initDb((error) => {
    if (error) {
        console.error(error);
        return;
    }
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});

