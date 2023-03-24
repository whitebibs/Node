const express = require("express");
const esxpressAsyncErrors = require("express-async-errors");
const morgan = require("morgan");
const {
    getAll,
    getOneById,
    create,
    updateById,
    deleteById
} = require("./controllers/planets");
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.SERVER;

const app = express();
app.use(express.json());

app.use(morgan("dev"))

app.get("/api/planets", getAll);

app.get("/api/planets/:id", getOneById);


app.post("/api/planets", create);

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById)

app.listen(port, function () {
    console.log(`server running on port http://localhost:${port}`);
})