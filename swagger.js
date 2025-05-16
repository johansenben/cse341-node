require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Contacts API",
        description: "Contacts API"
    },
    host: process.env.DEV ? `localhost:${process.env.PORT}` : "cse341-l5zf.onrender.com",
    schemes: process.env.DEV ? [ "http", "https" ] : [ "https" ]
}

const outputFile = "./swagger.json";
const endpointsFiles = [ "./routes/index.js" ];

swaggerAutogen(outputFile, endpointsFiles, doc);