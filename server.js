const express = require("express");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

app.use('/', require("./routes"))

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})