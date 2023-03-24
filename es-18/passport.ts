const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const passportJWT = require("passport-jwt");
const {SECRET} = process.env;
const db = require("./db");


passport.use(
    new passportJWT.Strategy({
        secretOrKey: SECRET, 
        jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    }, async (payload: any, done: any) => {
        const user = db.one(`SELECT * FROM users WHERE id=$1`, payload.id)
        console.log(user);

        try {
            return user ? done(null, user) : done(new Error("User not found."));
        } catch (error) {
            done(error);
        }
    })
)