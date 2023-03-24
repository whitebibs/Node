"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorize = (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (!user || err) {
            res.status(401).json({ msg: "Unathorized." });
        }
        else {
            req.user = user;
            next();
        }
    })(req, res, next);
};
module.exports = authorize;
