"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const db = require("../db");
const jwt = require("jsonwebtoken");
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db.one(`SELECT * FROM users WHERE username=$1`, username);
    if (user && user.password === password) {
        const payload = {
            id: user.id,
            username
        };
        const { SECRET = "" } = process.env;
        const token = jwt.sign(payload, SECRET);
        yield db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token]);
        res.status(200).json({ id: user.id, username, token });
    }
    else {
        res.status(400).json({ msg: "Username or password incorrect" });
    }
});
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield db.OneOrNone(`SELECT * FROM users WHERE username=$1`, username);
    if (user) {
        res.status(409).json({ msg: "Username already in use." });
    }
    else {
        const { id } = yield db.one(`INSERT INTO users WHERE (username, password) VALUE ($1, $2) RETURNING id`, [username, password]);
        res.status(201).json({ id, msg: "User created successfully" });
    }
});
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    yield db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user === null || user === void 0 ? void 0 : user.id, null]);
    res.status(200).json({ msg: "Logout successful." });
});
module.exports = { logIn, signUp, logOut };
