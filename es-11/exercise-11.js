const express = require("express");
const expressAsyncError = require("express-async-errors");
const morgan = require("morgan");
require("dotenv").config();
app.use(express.json());

const port = process.env.SERVER;

let planets = [
    {
        id: 1,
        name: "Earth",
    },
    {
         id: 2,
        name: "Mars",
    }
];

const app = express();

app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.status(200).json({ msg: "Hello World" });
});

app.listen(port, function () {
    console.log(`server running on port http://localhost:${port}`);
})