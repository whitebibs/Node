"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const esxpressAsyncErrors = require("express-async-errors");
const morgan = require("morgan");
const { getAll, getOneById, create, updateById, deleteById, createImage } = require("./controllers/planets");
const dotenv = require("dotenv");
const multer_1 = __importDefault(require("multer"));
const { logIn, signUp } = require("./controllers/users");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage });
dotenv.config();
const port = process.env.SERVER;
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.get("/api/planets", getAll);
app.get("/api/planets/:id", getOneById);
app.post("/api/planets", create);
app.put("/api/planets/:id", updateById);
app.delete("/api/planets/:id", deleteById);
app.post("/api/planets/:id/image", upload.single("image"), createImage);
app.post("/api/users/login", logIn);
app.post("/api/users/signup", signUp);
app.listen(port, function () {
    console.log(`server running on port http://localhost:${port}`);
});
