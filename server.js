const express = require("express");
require("dotenv").config();
const mongodb = require("./data/database");

const port = process.env.PORT || 3000;
const app = express();

app.use('/', require("./routes"))

mongodb.initDb((error) => {
    if (error) {
        console.error(error);
        return;
    }
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
});

