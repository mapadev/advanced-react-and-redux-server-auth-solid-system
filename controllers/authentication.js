const jwt = require("jwt-simple");
const User = require("../models/user");

const config = require("../config");

function generateTokenForUser(user) {
    const timestamp = new Date().getTime();

    // JWT convention: sub -subject, iat - issued at time
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
    // At this time user had email & pwd authenticated
    // We need to give them a token.
    // Passport puts user object on req.user so we can use it here
    res.send({ token: generateTokenForUser(req.user) });
};

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(422).send({ error: "You must provide email and password." });
    }

    // See if the user with the given email exists
    User.findOne({ email: email }, (err, existingUser) => {
        if (err) {
            return next(err);
        }

        // If the user with email exist, return an error
        if (existingUser) {
            return res.status(422).send({ error: "Email is in use" });
        }

        // If the user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save(err => {
            if (err) {
                return next(err);
            }

            // Respond to request indicating the user was created
            res.json({ token: generateTokenForUser(user) });
        });
    });
};
